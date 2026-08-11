package com.deepak.portfolio.repository;

import com.deepak.portfolio.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findAllByOrderByDisplayOrderAsc();
}