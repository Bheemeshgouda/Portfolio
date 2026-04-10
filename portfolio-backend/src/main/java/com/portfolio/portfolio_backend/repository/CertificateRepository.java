package com.portfolio.portfolio_backend.repository;

import com.portfolio.portfolio_backend.model.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {
}