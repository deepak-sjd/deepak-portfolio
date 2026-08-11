package com.deepak.portfolio.service;

import com.deepak.portfolio.dto.response.SkillResponse;
import com.deepak.portfolio.entity.Skill;
import com.deepak.portfolio.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Transactional(readOnly = true)
    public List<SkillResponse> getAllSkills() {

        return skillRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private SkillResponse toResponse(Skill skill) {

        return new SkillResponse(
                skill.getId(),
                skill.getName(),
                skill.getCategory(),
                skill.getProficiency(),
                skill.getDisplayOrder()
        );
    }
}