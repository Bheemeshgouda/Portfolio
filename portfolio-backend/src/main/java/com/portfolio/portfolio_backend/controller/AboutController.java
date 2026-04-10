// package com.portfolio.portfolio_backend.controller;

// import com.portfolio.portfolio_backend.model.About;
// import com.portfolio.portfolio_backend.repository.AboutRepository;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// import java.nio.file.Files;
// import java.nio.file.Path;
// import java.nio.file.Paths;
// import java.util.List;

// @RestController
// @RequestMapping("/api/about")
// @CrossOrigin(origins = "http://localhost:5173")
// public class AboutController {

//     private final AboutRepository aboutRepository;
//     private final Path uploadDir = Paths.get(System.getProperty("user.dir"), "uploads", "about");

//     public AboutController(AboutRepository aboutRepository) {
//         this.aboutRepository = aboutRepository;
//     }

//     @GetMapping
//     public ResponseEntity<List<About>> getAbout() {
//         return ResponseEntity.ok(aboutRepository.findAll());
//     }

//     @PostMapping("/upload")
//     public ResponseEntity<?> uploadAbout(
//             @RequestParam("name") String name,
//             @RequestParam("title") String title,
//             @RequestParam("description") String description,
//             @RequestParam("image") MultipartFile image,
//             @RequestParam(value = "resume", required = false) MultipartFile resume
//     ) {
//         try {
//             if (image == null || image.isEmpty()) {
//                 return ResponseEntity.badRequest().body("Image is required");
//             }

//             Files.createDirectories(uploadDir);

//             String imageFileName = System.currentTimeMillis() + "_" + Paths.get(image.getOriginalFilename()).getFileName().toString();
//             Path imagePath = uploadDir.resolve(imageFileName);
//             Files.write(imagePath, image.getBytes());

//             String imageUrl = "http://localhost:8080/uploads/about/" + imageFileName;

//             About about = new About();
//             about.setName(name);
//             about.setTitle(title);
//             about.setDescription(description);
//             about.setImageUrl(imageUrl);

//             if (resume != null && !resume.isEmpty()) {
//                 String resumeFileName = System.currentTimeMillis() + "_" + Paths.get(resume.getOriginalFilename()).getFileName().toString();
//                 Path resumePath = uploadDir.resolve(resumeFileName);
//                 Files.write(resumePath, resume.getBytes());
//                 about.setResumeUrl("http://localhost:8080/uploads/about/" + resumeFileName);
//             }

//             About saved = aboutRepository.save(about);
//             return ResponseEntity.ok(saved);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.internalServerError().body("Upload failed: " + e.getMessage());
//         }
//     }
// }