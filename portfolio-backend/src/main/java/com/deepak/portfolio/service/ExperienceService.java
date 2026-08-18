package com.deepak.portfolio.service;

import com.deepak.portfolio.dto.request.ExperienceRequest;
import com.deepak.portfolio.dto.response.ExperienceResponse;
import com.deepak.portfolio.entity.Experience;
import com.deepak.portfolio.exception.ResourceNotFoundException;
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

    // ============================================================
    // CREATE
    // ============================================================

    @Transactional
    public ExperienceResponse createExperience(ExperienceRequest request) {

        Experience experience = new Experience(
                request.company(),
                request.role(),
                request.employmentType(),
                request.location(),
                request.startDate(),
                request.endDate(),
                request.current(),
                request.description(),
                request.displayOrder(),
                request.cgpa()
        );

        Experience savedExperience = experienceRepository.save(experience);

        return toResponse(savedExperience);
    }

    // ============================================================
    // READ ALL
    // ============================================================

    @Transactional(readOnly = true)
    public List<ExperienceResponse> getAllExperiences() {

        return experienceRepository
                .findAllByOrderByDisplayOrderAscStartDateDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // ============================================================
    // READ BY ID
    // ============================================================

    @Transactional(readOnly = true)
    public ExperienceResponse getExperienceById(Long id) {

        Experience experience = findExperienceById(id);

        return toResponse(experience);
    }

    // ============================================================
    // UPDATE
    // ============================================================

    @Transactional
    public ExperienceResponse updateExperience(
            Long id,
            ExperienceRequest request
    ) {

        Experience experience = findExperienceById(id);

        experience.setCompany(request.company());
        experience.setRole(request.role());
        experience.setEmploymentType(request.employmentType());
        experience.setLocation(request.location());
        experience.setStartDate(request.startDate());
        experience.setEndDate(request.endDate());
        experience.setCurrent(request.current());
        experience.setDescription(request.description());
        experience.setDisplayOrder(request.displayOrder());
        experience.setCgpa(request.cgpa());

        Experience updatedExperience = experienceRepository.save(experience);

        return toResponse(updatedExperience);
    }

    // ============================================================
    // DELETE
    // ============================================================

    @Transactional
    public void deleteExperience(Long id) {

        Experience experience = findExperienceById(id);

        experienceRepository.delete(experience);
    }

    // ============================================================
    // FIND ENTITY
    // ============================================================

    private Experience findExperienceById(Long id) {

        return experienceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Experience not found with id: " + id
                        )
                );
    }

    // ============================================================
    // ENTITY → RESPONSE DTO
    // ============================================================

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
                experience.getDisplayOrder(),
                experience.getCgpa()
        );
    }
}