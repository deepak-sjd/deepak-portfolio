package com.deepak.portfolio.service;

import com.deepak.portfolio.dto.response.ExperienceResponse;
import com.deepak.portfolio.entity.Experience;
import com.deepak.portfolio.repository.ExperienceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    @Transactional(readOnly = true)
    public List<ExperienceResponse> getAllExperiences() {

        return experienceRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private ExperienceResponse toResponse(Experience experience) {

        return new ExperienceResponse(
                experience.getId(),
                experience.getCompany(),
                experience.getRole(),
                experience.getEmploymentType(),
                experience.getLocation(),
                experience.getStartDate(),
                experience.getEndDate(),
                experience.isCurrent(),
                experience.getDescription(),
                experience.getDisplayOrder()
        );
    }
}