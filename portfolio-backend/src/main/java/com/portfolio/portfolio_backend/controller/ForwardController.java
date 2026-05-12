package com.portfolio.portfolio_backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ForwardController {

    @GetMapping(value = { "/", "/about", "/projects", "/skills", "/certificates", "/contact", "/admin/**" })
    public String forward() {
        return "forward:/index.html";
    }
}
