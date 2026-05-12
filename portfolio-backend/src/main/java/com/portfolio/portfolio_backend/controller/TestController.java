package com.portfolio.portfolio_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test-backend")
    public String home() {
        return "Backend working 🚀";
    }
}