package com.portfolio.portfolio_backend.repository;

import com.portfolio.portfolio_backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    long countByIsReadFalse();
    List<Message> findAllByOrderByCreatedAtDesc();
}
