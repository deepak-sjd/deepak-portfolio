package com.deepak.portfolio.controller;

import com.deepak.portfolio.dto.request.ExperienceRequest;
import com.deepak.portfolio.dto.response.ExperienceResponse;
import com.deepak.portfolio.service.ExperienceService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/experiences")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    // ============================================================
    // CREATE
    // ============================================================

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExperienceResponse createExperience(
            @Valid @RequestBody ExperienceRequest request
    ) {
        return experienceService.createExperience(request);
    }

    // ============================================================
    // READ ALL
    // ============================================================

    @GetMapping
    public List<ExperienceResponse> getAllExperiences() {
        return experienceService.getAllExperiences();
    }

    // ============================================================
    // READ BY ID
    // ============================================================

    @GetMapping("/{id}")
    public ExperienceResponse getExperienceById(
            @PathVariable Long id
    ) {
        return experienceService.getExperienceById(id);
    }

    // ============================================================
    // UPDATE
    // ============================================================

    @PutMapping("/{id}")
    public ExperienceResponse updateExperience(
            @PathVariable Long id,
            @Valid @RequestBody ExperienceRequest request
    ) {
        return experienceService.updateExperience(id, request);
    }

    // ============================================================
    // DELETE
    // ============================================================

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExperience(
            @PathVariable Long id
    ) {
        experienceService.deleteExperience(id);
    }
}