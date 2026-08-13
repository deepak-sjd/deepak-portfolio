package com.deepak.portfolio.repository;

import com.deepak.portfolio.entity.About;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AboutRepository extends JpaRepository<About, Long> {
}