package com.portfolio.portfolio_backend.controller;

import com.portfolio.portfolio_backend.model.Project;
import com.portfolio.portfolio_backend.repository.ProjectRepository;
import com.portfolio.portfolio_backend.service.CloudinaryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    private final ProjectRepository repo;

    @Autowired
    private CloudinaryService cloudinaryService;

    public ProjectController(ProjectRepository repo) {
        this.repo = repo;
    }

    // ✅ GET ALL
    @GetMapping
    public ResponseEntity<List<Project>> getProjects() {
        return ResponseEntity.ok(repo.findAll());
    }

    // ✅ GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Optional<Project> project = repo.findById(id);
        return project.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ UPLOAD PROJECT (FIXED)
    @PostMapping("/upload")
    public ResponseEntity<?> uploadProject(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "video", required = false) MultipartFile video,
            @RequestParam("githubLink") String githubLink
    ) {
        try {

            String imageUrl = null;
            String videoUrl = null;

            // 🔥 Upload to Cloudinary
            if (image != null && !image.isEmpty()) {
                imageUrl = cloudinaryService.uploadFile(image);
            }

            if (video != null && !video.isEmpty()) {
                videoUrl = cloudinaryService.uploadFile(video);
            }

            Project project = new Project();
            project.setTitle(title);
            project.setDescription(description);
            project.setGithubLink(githubLink);
            project.setImageUrl(imageUrl);
            project.setVideoUrl(videoUrl);

            return ResponseEntity.ok(repo.save(project));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Upload failed: " + e.getMessage());
        }
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody Project details) {

        Optional<Project> existing = repo.findById(id);

        if (existing.isPresent()) {
            Project project = existing.get();

            project.setTitle(details.getTitle());
            project.setDescription(details.getDescription());
            project.setGithubLink(details.getGithubLink());

            if (details.getImageUrl() != null) {
                project.setImageUrl(details.getImageUrl());
            }

            if (details.getVideoUrl() != null) {
                project.setVideoUrl(details.getVideoUrl());
            }

            return ResponseEntity.ok(repo.save(project));
        }

        return ResponseEntity.notFound().build();
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {

        if (!repo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Project not found");
        }

        repo.deleteById(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}