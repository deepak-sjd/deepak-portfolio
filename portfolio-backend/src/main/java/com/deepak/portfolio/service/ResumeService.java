package com.deepak.portfolio.service;

import com.deepak.portfolio.dto.request.ResumeRequest;
import com.deepak.portfolio.dto.response.ResumeResponse;
import com.deepak.portfolio.entity.Resume;
import com.deepak.portfolio.exception.ResourceNotFoundException;
import com.deepak.portfolio.repository.ResumeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;

    public ResumeService(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    @Transactional(readOnly = true)
    public ResumeResponse getActiveResume() {

        Resume resume = resumeRepository.findByActiveTrue()
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Active resume not found"
                        )
                );

        return toResponse(resume);
    }

    @Transactional
    public ResumeResponse createResume(ResumeRequest request) {

        if (request.active()) {
            resumeRepository.findByActiveTrue()
                    .ifPresent(existing -> {
                        existing.setActive(false);
                        resumeRepository.save(existing);
                    });
        }

        Resume resume = new Resume(
                request.title(),
                request.fileUrl(),
                request.version(),
                request.active()
        );

        Resume savedResume = resumeRepository.save(resume);

        return toResponse(savedResume);
    }

    @Transactional
    public ResumeResponse updateResume(
            Long id,
            ResumeRequest request
    ) {

        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Resume not found with id: " + id
                        )
                );

        if (request.active()) {
            resumeRepository.findByActiveTrue()
                    .filter(existing -> !existing.getId().equals(id))
                    .ifPresent(existing -> {
                        existing.setActive(false);
                        resumeRepository.save(existing);
                    });
        }

        resume.setTitle(request.title());
        resume.setFileUrl(request.fileUrl());
        resume.setVersion(request.version());
        resume.setActive(request.active());

        return toResponse(resume);
    }

    private ResumeResponse toResponse(Resume resume) {

        return new ResumeResponse(
                resume.getId(),
                resume.getTitle(),
                resume.getFileUrl(),
                resume.getVersion(),
                resume.isActive(),
                resume.getCreatedAt(),
                resume.getUpdatedAt()
        );
    }
}