package com.portfolio.portfolio_backend.controller;

import com.portfolio.portfolio_backend.model.Skill;
import com.portfolio.portfolio_backend.repository.SkillRepository;
import com.portfolio.portfolio_backend.service.CloudinaryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillsController {

    private final SkillRepository repo;

    @Autowired
    private CloudinaryService cloudinaryService;

    public SkillsController(SkillRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public ResponseEntity<List<Skill>> getSkills() {
        return ResponseEntity.ok(repo.findAll());
    }

    @PostMapping("/upload")
    public ResponseEntity<?> addSkill(
            @RequestParam("name") String name,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {

            String imageUrl = null;

            if (image != null && !image.isEmpty()) {
                imageUrl = cloudinaryService.uploadFile(image);
            }

            Skill skill = new Skill();
            skill.setName(name);
            skill.setImageUrl(imageUrl);

            return ResponseEntity.status(HttpStatus.CREATED).body(repo.save(skill));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Upload failed");
        }
    }
}