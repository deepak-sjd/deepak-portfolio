package com.deepak.portfolio.controller;

import com.deepak.portfolio.dto.request.ResumeRequest;
import com.deepak.portfolio.dto.response.ResumeResponse;
import com.deepak.portfolio.service.ResumeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping
    public ResumeResponse getActiveResume() {
        return resumeService.getActiveResume();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResumeResponse createResume(
            @Valid @RequestBody ResumeRequest request
    ) {
        return resumeService.createResume(request);
    }

    @PutMapping("/{id}")
    public ResumeResponse updateResume(
            @PathVariable Long id,
            @Valid @RequestBody ResumeRequest request
    ) {
        return resumeService.updateResume(id, request);
    }
}