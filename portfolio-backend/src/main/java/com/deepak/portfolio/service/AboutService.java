package com.deepak.portfolio.service;

import com.deepak.portfolio.dto.request.AboutRequest;
import com.deepak.portfolio.dto.response.AboutResponse;
import com.deepak.portfolio.entity.About;
import com.deepak.portfolio.exception.ResourceNotFoundException;
import com.deepak.portfolio.repository.AboutRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AboutService {

    private final AboutRepository aboutRepository;

    public AboutService(AboutRepository aboutRepository) {
        this.aboutRepository = aboutRepository;
    }

    @Transactional(readOnly = true)
    public AboutResponse getAbout() {

        About about = aboutRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "About information not found"
                        )
                );

        return toResponse(about);
    }

    @Transactional
    public AboutResponse createAbout(AboutRequest request) {

        About about = new About(
                request.headline(),
                request.summary(),
                request.description(),
                request.currentRole(),
                request.location(),
                request.specialization(),
                request.availableForFreelance()
        );

        About savedAbout = aboutRepository.save(about);

        return toResponse(savedAbout);
    }

    @Transactional
    public AboutResponse updateAbout(
            Long id,
            AboutRequest request
    ) {

        About about = aboutRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "About information not found with id: " + id
                        )
                );

        about.setHeadline(request.headline());
        about.setSummary(request.summary());
        about.setDescription(request.description());
        about.setCurrentRole(request.currentRole());
        about.setLocation(request.location());
        about.setSpecialization(request.specialization());
        about.setAvailableForFreelance(
                request.availableForFreelance()
        );

        return toResponse(about);
    }

    private AboutResponse toResponse(About about) {

        return new AboutResponse(
                about.getId(),
                about.getHeadline(),
                about.getSummary(),
                about.getDescription(),
                about.getCurrentRole(),
                about.getLocation(),
                about.getSpecialization(),
                about.isAvailableForFreelance(),
                about.getCreatedAt(),
                about.getUpdatedAt()
        );
    }
}