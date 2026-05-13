package com.portfolio.portfolio_backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    @Value("${CLOUDINARY_CLOUD_NAME:}")
    private String cloudName;

    public String uploadFile(MultipartFile file) {
        try {
            if (cloudName == null || cloudName.isBlank()) {
                return saveFileLocally(file);
            }

            var uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.emptyMap());

            return uploadResult.get("secure_url").toString();

        } catch (Exception e) {
            e.printStackTrace();
            if (cloudName == null || cloudName.isBlank()) {
                try {
                    return saveFileLocally(file);
                } catch (IOException ioException) {
                    throw new RuntimeException("Local file save failed: " + ioException.getMessage(), ioException);
                }
            }
            throw new RuntimeException("Cloudinary upload failed: " + e.getMessage(), e);
        }
    }

    private String saveFileLocally(MultipartFile file) throws IOException {
        Path uploadDir = Paths.get(System.getProperty("user.dir"), "uploads");
        Files.createDirectories(uploadDir);

        String originalName = file.getOriginalFilename();
        String extension = "";
        if (originalName != null && originalName.contains(".")) {
            extension = originalName.substring(originalName.lastIndexOf('.'));
        }
        String filename = UUID.randomUUID() + extension;
        Path targetPath = uploadDir.resolve(filename);
        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        return "/uploads/" + filename;
    }
}