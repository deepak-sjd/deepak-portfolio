package com.deepak.portfolio.service;

import com.deepak.portfolio.dto.request.SkillRequest;
import com.deepak.portfolio.dto.response.SkillResponse;
import com.deepak.portfolio.entity.Skill;
import com.deepak.portfolio.exception.ResourceNotFoundException;
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

    @Transactional(readOnly = true)
    public SkillResponse getSkillById(Long id) {

        Skill skill = skillRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Skill not found with id: " + id)
                );

        return toResponse(skill);
    }

    @Transactional
    public SkillResponse createSkill(SkillRequest request) {

        Skill skill = new Skill(
                request.name(),
                request.category(),
                request.displayOrder()
        );

        return toResponse(skillRepository.save(skill));
    }

    @Transactional
    public SkillResponse updateSkill(Long id, SkillRequest request) {

        Skill skill = skillRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Skill not found with id: " + id)
                );

        skill.setName(request.name());
        skill.setCategory(request.category());
        skill.setDisplayOrder(request.displayOrder());

        return toResponse(skillRepository.save(skill));
    }

    @Transactional
    public void deleteSkill(Long id) {

        if (!skillRepository.existsById(id)) {
            throw new ResourceNotFoundException("Skill not found with id: " + id);
        }

        skillRepository.deleteById(id);
    }

    private SkillResponse toResponse(Skill skill) {

        return new SkillResponse(
                skill.getId(),
                skill.getName(),
                skill.getCategory(),
                skill.getDisplayOrder()
        );
    }
}