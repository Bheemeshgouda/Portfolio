package com.portfolio.portfolio_backend.controller;

import com.portfolio.portfolio_backend.model.About;
import com.portfolio.portfolio_backend.repository.AboutRepository;
import com.portfolio.portfolio_backend.service.CloudinaryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/about")
@CrossOrigin(origins = "*")
public class AboutController {

    private final AboutRepository aboutRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    public AboutController(AboutRepository aboutRepository) {
        this.aboutRepository = aboutRepository;
    }

    @GetMapping
    public ResponseEntity<List<About>> getAbout() {
        return ResponseEntity.ok(aboutRepository.findAll());
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

            String imageUrl = null;
            String resumeUrl = null;

            if (image != null && !image.isEmpty()) {
                imageUrl = cloudinaryService.uploadFile(image);
            }

            if (resume != null && !resume.isEmpty()) {
                resumeUrl = cloudinaryService.uploadFile(resume);
            }

            About about = new About();
            about.setName(name);
            about.setTitle(title);
            about.setDescription(description);
            about.setImageUrl(imageUrl);
            about.setResumeUrl(resumeUrl);

            return ResponseEntity.ok(aboutRepository.save(about));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Upload failed");
        }
    }
}