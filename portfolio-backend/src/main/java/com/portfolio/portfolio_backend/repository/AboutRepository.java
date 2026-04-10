package com.portfolio.portfolio_backend.repository;

import com.portfolio.portfolio_backend.model.About;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AboutRepository extends JpaRepository<About, Long> {
}