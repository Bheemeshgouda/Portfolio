package com.portfolio.portfolio_backend.controller;

import com.portfolio.portfolio_backend.model.Certificate;
import com.portfolio.portfolio_backend.repository.CertificateRepository;
import com.portfolio.portfolio_backend.service.CloudinaryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = "*")
public class CertificateController {

    private final CertificateRepository repo;

    @Autowired
    private CloudinaryService cloudinaryService;

    public CertificateController(CertificateRepository repo) {
        this.repo = repo;
    }

    // ✅ GET ALL CERTIFICATES
    @GetMapping
    public ResponseEntity<List<Certificate>> getCertificates() {
        return ResponseEntity.ok(repo.findAll());
    }

    // ✅ ADD CERTIFICATE (CLOUDINARY)
    @PostMapping("/upload")
    public ResponseEntity<?> uploadCertificate(
            @RequestParam("name") String name,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {

            String imageUrl = null;

            if (image != null && !image.isEmpty()) {
                imageUrl = cloudinaryService.uploadFile(image);
            }

            Certificate certificate = new Certificate();
            certificate.setName(name);
            certificate.setImageUrl(imageUrl);

            return ResponseEntity.status(HttpStatus.CREATED).body(repo.save(certificate));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Upload failed");
        }
    }

    // ✅ DELETE CERTIFICATE (FIXED)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCertificate(@PathVariable Long id) {
        try {

            if (!repo.existsById(id)) {
                return ResponseEntity.ok("Certificate already deleted or not found");
            }

            repo.deleteById(id);

            return ResponseEntity.ok("Certificate deleted successfully");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Delete failed");
        }
    }

    // ✅ UPDATE CERTIFICATE
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCertificate(
            @PathVariable Long id,
            @RequestBody Certificate updatedCertificate
    ) {
        try {

            Optional<Certificate> existing = repo.findById(id);

            if (existing.isPresent()) {
                Certificate cert = existing.get();

                cert.setName(updatedCertificate.getName());

                if (updatedCertificate.getImageUrl() != null) {
                    cert.setImageUrl(updatedCertificate.getImageUrl());
                }

                return ResponseEntity.ok(repo.save(cert));
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Certificate not found");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Update failed");
        }
    }
}