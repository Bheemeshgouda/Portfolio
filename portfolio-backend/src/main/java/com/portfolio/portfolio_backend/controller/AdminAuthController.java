package com.portfolio.portfolio_backend.controller;

import com.portfolio.portfolio_backend.model.AdminUser;
import com.portfolio.portfolio_backend.repository.AdminUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/auth")
@CrossOrigin(origins = "*")
public class AdminAuthController {

    private final AdminUserRepository adminUserRepository;

    public AdminAuthController(AdminUserRepository adminUserRepository) {
        this.adminUserRepository = adminUserRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> body) {
        String name = trim(body.get("name"));
        String email = trim(body.get("email")).toLowerCase();
        String password = trim(body.get("password"));

        if (name.isEmpty() || email.isEmpty() || password.isEmpty()) {
            return ResponseEntity.badRequest().body("Name, email, and password are required");
        }
        if (password.length() < 6) {
            return ResponseEntity.badRequest().body("Password must be at least 6 characters");
        }
        if (adminUserRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body("Admin email already exists");
        }

        AdminUser user = new AdminUser();
        user.setName(name);
        user.setEmail(email);
        user.setPasswordHash(hash(password));
        AdminUser saved = adminUserRepository.save(user);

        return ResponseEntity.ok(Map.of(
                "id", saved.getId(),
                "name", saved.getName(),
                "email", saved.getEmail(),
                "phone", saved.getPhone() == null ? "" : saved.getPhone(),
                "token", UUID.randomUUID().toString()
        ));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> body) {
        String email = trim(body.get("email")).toLowerCase();
        String password = trim(body.get("password"));

        if (email.isEmpty() || password.isEmpty()) {
            return ResponseEntity.badRequest().body("Email and password are required");
        }

        return adminUserRepository.findByEmail(email)
                .map(user -> {
                    if (!user.getPasswordHash().equals(hash(password))) {
                        return ResponseEntity.status(401).body("Invalid email or password");
                    }
                    return ResponseEntity.ok(Map.of(
                            "id", user.getId(),
                            "name", user.getName(),
                            "email", user.getEmail(),
                            "phone", user.getPhone() == null ? "" : user.getPhone(),
                            "token", UUID.randomUUID().toString()
                    ));
                })
                .orElseGet(() -> ResponseEntity.status(401).body("Invalid email or password"));
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id) {
        return adminUserRepository.findById(id)
                .map(user -> ResponseEntity.ok(Map.of(
                        "id", user.getId(),
                        "name", user.getName(),
                        "email", user.getEmail(),
                        "phone", user.getPhone() == null ? "" : user.getPhone()
                )))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return adminUserRepository.findById(id)
                .map(user -> {
                    String name = trim(body.get("name"));
                    String email = trim(body.get("email")).toLowerCase();
                    String phone = trim(body.get("phone"));

                    if (name.isEmpty() || email.isEmpty()) {
                        return ResponseEntity.badRequest().body("Name and email are required");
                    }

                    if (adminUserRepository.existsByEmail(email) && !email.equals(user.getEmail())) {
                        return ResponseEntity.badRequest().body("Email already in use");
                    }

                    user.setName(name);
                    user.setEmail(email);
                    user.setPhone(phone);
                    AdminUser saved = adminUserRepository.save(user);

                    return ResponseEntity.ok(Map.of(
                            "id", saved.getId(),
                            "name", saved.getName(),
                            "email", saved.getEmail(),
                            "phone", saved.getPhone() == null ? "" : saved.getPhone()
                    ));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    private static String trim(String value) {
        return value == null ? "" : value.trim();
    }

    private static String hash(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] bytes = digest.digest(value.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : bytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("Password hashing failed", e);
        }
    }
}
