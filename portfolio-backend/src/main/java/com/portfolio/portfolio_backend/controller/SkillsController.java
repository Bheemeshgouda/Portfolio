package com.portfolio.portfolio_backend.controller;

import com.portfolio.portfolio_backend.model.Skill;
import com.portfolio.portfolio_backend.repository.SkillRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.nio.file.*;
import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SkillsController {

    private final SkillRepository repo;
    private final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/skills/";

    public SkillsController(SkillRepository repo) {
        this.repo = repo;
    }

    // GET ALL SKILLS
    @GetMapping
    public ResponseEntity<List<Skill>> getSkills() {
        try {
            List<Skill> skills = repo.findAll();
            return ResponseEntity.ok(skills);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // GET SKILL BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable Long id) {
        Optional<Skill> skill = repo.findById(id);
        return skill.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ADD NEW SKILL
    @PostMapping("/upload")
    public ResponseEntity<?> addSkill(
            @RequestParam("name") String name,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {
            System.out.println("📝 Received skill: " + name);
            System.out.println("📸 Image: " + (image != null ? image.getOriginalFilename() : "No image"));

            if (name == null || name.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(createErrorResponse("Skill name cannot be empty"));
            }

            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) {
                dir.mkdirs();
                System.out.println("✅ Created upload directory: " + UPLOAD_DIR);
            }

            String imageUrl = null;

            // SAVE IMAGE
            if (image != null && !image.isEmpty()) {
                String imageName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                Path imagePath = Paths.get(UPLOAD_DIR, imageName);
                Files.write(imagePath, image.getBytes());
                imageUrl = "http://localhost:8080/uploads/skills/" + imageName;
                System.out.println("✅ Image saved: " + imageName);
            } else {
                System.out.println("⚠️ No image provided");
            }

            Skill skill = new Skill();
            skill.setName(name.trim());
            skill.setImageUrl(imageUrl);

            Skill savedSkill = repo.save(skill);
            System.out.println("✅ Skill saved to database with ID: " + savedSkill.getId());

            return ResponseEntity.status(HttpStatus.CREATED).body(savedSkill);

        } catch (Exception e) {
            System.err.println("❌ Error: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // UPDATE SKILL
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSkill(@PathVariable Long id, @RequestBody Skill skillDetails) {
        try {
            Optional<Skill> existingSkillOpt = repo.findById(id);
            
            if (existingSkillOpt.isPresent()) {
                Skill existingSkill = existingSkillOpt.get();
                existingSkill.setName(skillDetails.getName());
                
                if (skillDetails.getImageUrl() != null) {
                    existingSkill.setImageUrl(skillDetails.getImageUrl());
                }
                
                Skill updatedSkill = repo.save(existingSkill);
                return ResponseEntity.ok(updatedSkill);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Error updating skill: " + e.getMessage()));
        }
    }

    // DELETE SKILL
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSkill(@PathVariable Long id) {
        System.out.println("🗑️ DELETE SKILL REQUEST RECEIVED - ID: " + id);
        
        try {
            Optional<Skill> skillOptional = repo.findById(id);
            
            if (!skillOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(createErrorResponse("Skill not found with id: " + id));
            }
            
            Skill skill = skillOptional.get();
            
            // Delete associated image file
            if (skill.getImageUrl() != null && !skill.getImageUrl().isEmpty()) {
                try {
                    String imageFileName = skill.getImageUrl().substring(skill.getImageUrl().lastIndexOf("/") + 1);
                    Path imagePath = Paths.get(UPLOAD_DIR, imageFileName);
                    Files.deleteIfExists(imagePath);
                    System.out.println("✅ Image deleted: " + imageFileName);
                } catch (Exception e) {
                    System.out.println("⚠️ Could not delete image: " + e.getMessage());
                }
            }
            
            repo.deleteById(id);
            System.out.println("✅ Skill deleted successfully");
            
            return ResponseEntity.ok(createSuccessResponse("Skill deleted successfully", id));
            
        } catch (Exception e) {
            System.err.println("❌ Error deleting skill: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to delete skill: " + e.getMessage()));
        }
    }

    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("error", message);
        return response;
    }

    private Map<String, Object> createSuccessResponse(String message, Long id) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", message);
        response.put("id", id);
        return response;
    }
}