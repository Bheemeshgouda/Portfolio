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

    @GetMapping
    public ResponseEntity<List<Certificate>> getCertificates() {
        return ResponseEntity.ok(repo.findAll());
    }

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
}