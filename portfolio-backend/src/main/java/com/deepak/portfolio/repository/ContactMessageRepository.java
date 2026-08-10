package com.deepak.portfolio.repository;

import com.deepak.portfolio.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository
        extends JpaRepository<ContactMessage, Long> {
}