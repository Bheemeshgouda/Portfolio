package com.portfolio.portfolio_backend.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                
                "cloud_name", "dgblaadal",
                "api_key", "-xbQD2ETmeZXzxnz2AKt-Qtb2uI",
                "api_secret", "137973933839161"
        ));
    }
}


