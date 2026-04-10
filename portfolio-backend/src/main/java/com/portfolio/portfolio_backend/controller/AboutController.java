package com.portfolio.portfolio_backend.controller;

import com.portfolio.portfolio_backend.model.About;
import com.portfolio.portfolio_backend.repository.AboutRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/about")
@CrossOrigin(origins = "*")
public class AboutController {

    private static final String BASE_URL = "https://portfolio-production-9608.up.railway.app";
    private final AboutRepository aboutRepository;
    private final Path uploadDir = Paths.get(System.getProperty("user.dir"), "uploads", "about");

    public AboutController(AboutRepository aboutRepository) {
        this.aboutRepository = aboutRepository;
    }

    @GetMapping
    public ResponseEntity<List<About>> getAbout() {
        List<About> aboutList = aboutRepository.findAll();
        for (About about : aboutList) {
            normalizeAbout(about);
        }
        return ResponseEntity.ok(aboutList);
    }

    private About normalizeAbout(About about) {
        if (about == null) return null;
        about.setImageUrl(normalizeUrl(about.getImageUrl()));
        about.setResumeUrl(normalizeUrl(about.getResumeUrl()));
        return about;
    }

    private String normalizeUrl(String url) {
        return url != null ? url.replaceFirst("^https?://[^/]+", BASE_URL) : null;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadAbout(
            @RequestParam("name") String name,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image,
            @RequestParam(value = "resume", required = false) MultipartFile resume
    ) {
        try {
            if (image == null || image.isEmpty()) {
                return ResponseEntity.badRequest().body("Image is required");
            }

            Files.createDirectories(uploadDir);

            String imageFileName = System.currentTimeMillis() + "_" + Paths.get(image.getOriginalFilename()).getFileName().toString();
            Path imagePath = uploadDir.resolve(imageFileName);
            Files.write(imagePath, image.getBytes());

            String imageUrl = "https://portfolio-production-9608.up.railway.app/uploads/about/" + imageFileName;

            About about = new About();
            about.setName(name);
            about.setTitle(title);
            about.setDescription(description);
            about.setImageUrl(imageUrl);

            if (resume != null && !resume.isEmpty()) {
                String resumeFileName = System.currentTimeMillis() + "_" + Paths.get(resume.getOriginalFilename()).getFileName().toString();
                Path resumePath = uploadDir.resolve(resumeFileName);
                Files.write(resumePath, resume.getBytes());
                about.setResumeUrl("https://portfolio-production-9608.up.railway.app/uploads/about/" + resumeFileName);
            }

            About saved = aboutRepository.save(about);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Upload failed: " + e.getMessage());
        }
    }
}