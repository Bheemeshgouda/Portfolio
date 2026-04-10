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
import java.util.Optional;

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

    // ✅ GET ALL SKILLS
    @GetMapping
    public ResponseEntity<List<Skill>> getSkills() {
        return ResponseEntity.ok(repo.findAll());
    }

    // ✅ ADD SKILL (CLOUDINARY)
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

    // ✅ DELETE SKILL (FIXED)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSkill(@PathVariable Long id) {
        try {

            if (!repo.existsById(id)) {
                return ResponseEntity.ok("Skill already deleted or not found");
            }

            repo.deleteById(id);

            return ResponseEntity.ok("Skill deleted successfully");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Delete failed");
        }
    }

    // ✅ UPDATE SKILL
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSkill(
            @PathVariable Long id,
            @RequestBody Skill updatedSkill
    ) {
        try {

            Optional<Skill> existingSkill = repo.findById(id);

            if (existingSkill.isPresent()) {
                Skill skill = existingSkill.get();

                skill.setName(updatedSkill.getName());

                if (updatedSkill.getImageUrl() != null) {
                    skill.setImageUrl(updatedSkill.getImageUrl());
                }

                return ResponseEntity.ok(repo.save(skill));
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Skill not found");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Update failed");
        }
    }
}