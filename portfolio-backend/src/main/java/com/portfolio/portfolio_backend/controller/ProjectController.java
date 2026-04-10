// package com.portfolio.portfolio_backend.controller;

// import com.portfolio.portfolio_backend.model.Project;
// import com.portfolio.portfolio_backend.repository.ProjectRepository;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;
// import org.springframework.http.ResponseEntity;
// import org.springframework.http.HttpStatus;

// import java.nio.file.*;
// import java.io.File;
// import java.util.List;
// import java.util.Optional;

// @RestController
// @RequestMapping("/api/projects")
// @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
// public class ProjectController {

//     private final ProjectRepository repo;

//     public ProjectController(ProjectRepository repo) {
//         this.repo = repo;
//     }

//     // GET ALL PROJECTS
//     @GetMapping
//     public ResponseEntity<List<Project>> getProjects() {
//         try {
//             List<Project> projects = repo.findAll();
//             return ResponseEntity.ok(projects);
//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//         }
//     }

//     // GET PROJECT BY ID
//     @GetMapping("/{id}")
//     public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
//         Optional<Project> project = repo.findById(id);
//         return project.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//     }

//     // UPLOAD PROJECT (IMAGE + VIDEO)
//     @PostMapping("/upload")
//     public ResponseEntity<?> uploadProject(
//             @RequestParam("title") String title,
//             @RequestParam("description") String description,
//             @RequestParam(value = "image", required = false) MultipartFile image,
//             @RequestParam(value = "video", required = false) MultipartFile video,
//             @RequestParam("githubLink") String githubLink
//     ) {
//         try {
//             String uploadDir = System.getProperty("user.dir") + "/uploads/";
//             File dir = new File(uploadDir);
//             if (!dir.exists()) dir.mkdir();

//             String imageUrl = null;
//             String videoUrl = null;

//             // SAVE IMAGE
//             if (image != null && !image.isEmpty()) {
//                 String imageName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
//                 Path imagePath = Paths.get(uploadDir, imageName);
//                 Files.write(imagePath, image.getBytes());
//                 imageUrl = "http://localhost:8080/uploads/" + imageName;
//             }

//             // SAVE VIDEO
//             if (video != null && !video.isEmpty()) {
//                 String videoName = System.currentTimeMillis() + "_" + video.getOriginalFilename();
//                 Path videoPath = Paths.get(uploadDir, videoName);
//                 Files.write(videoPath, video.getBytes());
//                 videoUrl = "http://localhost:8080/uploads/" + videoName;
//             }

//             Project project = new Project();
//             project.setTitle(title);
//             project.setDescription(description);
//             project.setGithubLink(githubLink);
//             project.setImageUrl(imageUrl);
//             project.setVideoUrl(videoUrl);

//             Project savedProject = repo.save(project);
//             return ResponseEntity.ok(savedProject);

//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                     .body("Error uploading project: " + e.getMessage());
//         }
//     }

//     // UPDATE PROJECT
//     @PutMapping("/{id}")
//     public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody Project projectDetails) {
//         try {
//             Optional<Project> existingProjectOpt = repo.findById(id);
            
//             if (existingProjectOpt.isPresent()) {
//                 Project existingProject = existingProjectOpt.get();
                
//                 existingProject.setTitle(projectDetails.getTitle());
//                 existingProject.setDescription(projectDetails.getDescription());
//                 existingProject.setGithubLink(projectDetails.getGithubLink());
                
//                 if (projectDetails.getImageUrl() != null) {
//                     existingProject.setImageUrl(projectDetails.getImageUrl());
//                 }
                
//                 if (projectDetails.getVideoUrl() != null) {
//                     existingProject.setVideoUrl(projectDetails.getVideoUrl());
//                 }
                
//                 Project updatedProject = repo.save(existingProject);
//                 return ResponseEntity.ok(updatedProject);
//             } else {
//                 return ResponseEntity.notFound().build();
//             }
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                     .body("Error updating project: " + e.getMessage());
//         }
//     }

//     // DELETE PROJECT - FIXED VERSION
//     @DeleteMapping("/{id}")
//     public ResponseEntity<?> deleteProject(@PathVariable Long id) {
//         System.out.println("=== DELETE REQUEST RECEIVED ===");
//         System.out.println("Project ID to delete: " + id);
        
//         try {
//             // Check if project exists
//             Optional<Project> projectOptional = repo.findById(id);
            
//             if (!projectOptional.isPresent()) {
//                 System.out.println("Project not found with ID: " + id);
//                 return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                         .body("{\"error\": \"Project not found with id: " + id + "\"}");
//             }
            
//             Project project = projectOptional.get();
//             System.out.println("Found project: " + project.getTitle());
            
//             // Delete associated image file if exists
//             if (project.getImageUrl() != null) {
//                 try {
//                     String imageFileName = project.getImageUrl().substring(project.getImageUrl().lastIndexOf("/") + 1);
//                     Path imagePath = Paths.get(System.getProperty("user.dir") + "/uploads/", imageFileName);
//                     Files.deleteIfExists(imagePath);
//                     System.out.println("Deleted image file: " + imageFileName);
//                 } catch (Exception e) {
//                     System.out.println("Could not delete image file: " + e.getMessage());
//                 }
//             }
            
//             // Delete associated video file if exists
//             if (project.getVideoUrl() != null) {
//                 try {
//                     String videoFileName = project.getVideoUrl().substring(project.getVideoUrl().lastIndexOf("/") + 1);
//                     Path videoPath = Paths.get(System.getProperty("user.dir") + "/uploads/", videoFileName);
//                     Files.deleteIfExists(videoPath);
//                     System.out.println("Deleted video file: " + videoFileName);
//                 } catch (Exception e) {
//                     System.out.println("Could not delete video file: " + e.getMessage());
//                 }
//             }
            
//             // Delete from database
//             repo.deleteById(id);
//             System.out.println("Project deleted from database successfully");
            
//             return ResponseEntity.ok()
//                     .body("{\"message\": \"Project deleted successfully\", \"id\": " + id + "}");
            
//         } catch (Exception e) {
//             System.err.println("Error deleting project: " + e.getMessage());
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                     .body("{\"error\": \"Failed to delete project: " + e.getMessage() + "\"}");
//         }
//     }
// }