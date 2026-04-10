// package com.portfolio.portfolio_backend.controller;

// import com.portfolio.portfolio_backend.model.Certificate;
// import com.portfolio.portfolio_backend.repository.CertificateRepository;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;
// import org.springframework.http.ResponseEntity;
// import org.springframework.http.HttpStatus;

// import java.nio.file.*;
// import java.io.File;
// import java.util.List;
// import java.util.Optional;
// import java.util.HashMap;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/certificates")
// @CrossOrigin(origins = "http://localhost:3000")
// public class CertificateController {

//     private final CertificateRepository repo;
//     private final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/certificates/";

//     public CertificateController(CertificateRepository repo) {
//         this.repo = repo;
//     }

//     // GET ALL CERTIFICATES
//     @GetMapping
//     public ResponseEntity<List<Certificate>> getCertificates() {
//         try {
//             List<Certificate> certificates = repo.findAll();
//             System.out.println("📋 Retrieved " + certificates.size() + " certificates");
//             return ResponseEntity.ok(certificates);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//         }
//     }

//     // GET CERTIFICATE BY ID
//     @GetMapping("/{id}")
//     public ResponseEntity<Certificate> getCertificateById(@PathVariable Long id) {
//         Optional<Certificate> certificate = repo.findById(id);
//         return certificate.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//     }

//     // ADD NEW CERTIFICATE
//     @PostMapping("/upload")
//     public ResponseEntity<?> uploadCertificate(
//             @RequestParam("name") String name,
//             @RequestParam(value = "image", required = false) MultipartFile image
//     ) {
//         try {
//             System.out.println("📝 Received certificate: " + name);
//             System.out.println("📸 Image: " + (image != null ? image.getOriginalFilename() : "No image"));

//             if (name == null || name.trim().isEmpty()) {
//                 return ResponseEntity.badRequest()
//                         .body(createErrorResponse("Certificate name cannot be empty"));
//             }

//             File dir = new File(UPLOAD_DIR);
//             if (!dir.exists()) {
//                 dir.mkdirs();
//                 System.out.println("✅ Created upload directory: " + UPLOAD_DIR);
//             }

//             String imageUrl = null;

//             // SAVE IMAGE
//             if (image != null && !image.isEmpty()) {
//                 String imageName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
//                 Path imagePath = Paths.get(UPLOAD_DIR, imageName);
//                 Files.write(imagePath, image.getBytes());
//                 imageUrl = "http://localhost:8080/uploads/certificates/" + imageName;
//                 System.out.println("✅ Image saved: " + imageName);
//             } else {
//                 System.out.println("⚠️ No image provided");
//             }

//             Certificate certificate = new Certificate();
//             certificate.setName(name.trim());
//             certificate.setImageUrl(imageUrl);

//             Certificate savedCertificate = repo.save(certificate);
//             System.out.println("✅ Certificate saved to database with ID: " + savedCertificate.getId());

//             return ResponseEntity.status(HttpStatus.CREATED).body(savedCertificate);

//         } catch (Exception e) {
//             System.err.println("❌ Error: " + e.getMessage());
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                     .body(createErrorResponse(e.getMessage()));
//         }
//     }

//     // UPDATE CERTIFICATE
//     @PutMapping("/{id}")
//     public ResponseEntity<?> updateCertificate(@PathVariable Long id, @RequestBody Certificate certificateDetails) {
//         try {
//             Optional<Certificate> existingCertOpt = repo.findById(id);
            
//             if (existingCertOpt.isPresent()) {
//                 Certificate existingCert = existingCertOpt.get();
//                 existingCert.setName(certificateDetails.getName());
                
//                 if (certificateDetails.getImageUrl() != null) {
//                     existingCert.setImageUrl(certificateDetails.getImageUrl());
//                 }
                
//                 Certificate updatedCert = repo.save(existingCert);
//                 System.out.println("✅ Certificate updated: " + id);
//                 return ResponseEntity.ok(updatedCert);
//             } else {
//                 return ResponseEntity.notFound().build();
//             }
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                     .body(createErrorResponse("Error updating certificate: " + e.getMessage()));
//         }
//     }

//     // DELETE CERTIFICATE
//     @DeleteMapping("/{id}")
//     public ResponseEntity<?> deleteCertificate(@PathVariable Long id) {
//         System.out.println("🗑️ DELETE CERTIFICATE REQUEST RECEIVED - ID: " + id);
        
//         try {
//             Optional<Certificate> certificateOptional = repo.findById(id);
            
//             if (!certificateOptional.isPresent()) {
//                 return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                         .body(createErrorResponse("Certificate not found with id: " + id));
//             }
            
//             Certificate certificate = certificateOptional.get();
            
//             // Delete associated image file
//             if (certificate.getImageUrl() != null && !certificate.getImageUrl().isEmpty()) {
//                 try {
//                     String imageFileName = certificate.getImageUrl().substring(certificate.getImageUrl().lastIndexOf("/") + 1);
//                     Path imagePath = Paths.get(UPLOAD_DIR, imageFileName);
//                     Files.deleteIfExists(imagePath);
//                     System.out.println("✅ Image deleted: " + imageFileName);
//                 } catch (Exception e) {
//                     System.out.println("⚠️ Could not delete image: " + e.getMessage());
//                 }
//             }
            
//             repo.deleteById(id);
//             System.out.println("✅ Certificate deleted successfully");
            
//             return ResponseEntity.ok(createSuccessResponse("Certificate deleted successfully", id));
            
//         } catch (Exception e) {
//             System.err.println("❌ Error deleting certificate: " + e.getMessage());
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                     .body(createErrorResponse("Failed to delete certificate: " + e.getMessage()));
//         }
//     }

//     private Map<String, Object> createErrorResponse(String message) {
//         Map<String, Object> response = new HashMap<>();
//         response.put("error", message);
//         return response;
//     }

//     private Map<String, Object> createSuccessResponse(String message, Long id) {
//         Map<String, Object> response = new HashMap<>();
//         response.put("message", message);
//         response.put("id", id);
//         return response;
//     }
// }