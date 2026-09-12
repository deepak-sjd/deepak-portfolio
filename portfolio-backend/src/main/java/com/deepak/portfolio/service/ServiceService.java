package com.deepak.portfolio.service;

import com.deepak.portfolio.dto.request.ServiceRequest;
import com.deepak.portfolio.dto.response.ProjectResponse;
import com.deepak.portfolio.dto.response.ServiceResponse;
import com.deepak.portfolio.entity.Project;
import com.deepak.portfolio.exception.ResourceNotFoundException;
import com.deepak.portfolio.repository.ProjectRepository;
import com.deepak.portfolio.repository.ServiceRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@org.springframework.stereotype.Service
public class ServiceService {

    private final ServiceRepository serviceRepository;
    private final ProjectRepository projectRepository;
    private final ProjectService projectService;

    public ServiceService(
            ServiceRepository serviceRepository,
            ProjectRepository projectRepository,
            ProjectService projectService
    ) {
        this.serviceRepository = serviceRepository;
        this.projectRepository = projectRepository;
        this.projectService = projectService;
    }

    @Transactional(readOnly = true)
    public List<ServiceResponse> getActiveServices() {

        return serviceRepository.findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    /** Admin-only: every service regardless of active status, so a deactivated service can still be found and edited. */
    @Transactional(readOnly = true)
    public List<ServiceResponse> getAllServicesForAdmin() {

        return serviceRepository.findAll()
                .stream()
                .sorted((a, b) -> a.getDisplayOrder().compareTo(b.getDisplayOrder()))
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ServiceResponse getServiceById(Long id) {

        com.deepak.portfolio.entity.Service service =
                serviceRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Service not found with id: " + id
                                )
                        );

        return toResponse(service);
    }

    @Transactional
    public ServiceResponse createService(ServiceRequest request) {

        if (serviceRepository.existsBySlug(request.slug())) {
            throw new IllegalArgumentException(
                    "Service with slug already exists: " + request.slug()
            );
        }

        com.deepak.portfolio.entity.Service service =
                new com.deepak.portfolio.entity.Service(
                        request.title(),
                        request.slug(),
                        request.category(),
                        request.description(),
                        request.technologies(),
                        request.icon(),
                        request.displayOrder(),
                        request.active()
                );
        service.setRelatedProjects(resolveProjects(request.relatedProjectIds()));

        return toResponse(serviceRepository.save(service));
    }

    @Transactional
    public ServiceResponse updateService(
            Long id,
            ServiceRequest request
    ) {

        com.deepak.portfolio.entity.Service service =
                serviceRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Service not found with id: " + id
                                )
                        );

        serviceRepository.findBySlug(request.slug())
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new IllegalArgumentException(
                            "Service with slug already exists: "
                                    + request.slug()
                    );
                });

        service.setTitle(request.title());
        service.setSlug(request.slug());
        service.setCategory(request.category());
        service.setDescription(request.description());
        service.setTechnologies(request.technologies());
        service.setIcon(request.icon());
        service.setDisplayOrder(request.displayOrder());
        service.setActive(request.active());
        service.setRelatedProjects(resolveProjects(request.relatedProjectIds()));

        return toResponse(serviceRepository.save(service));
    }

    @Transactional
    public void deleteService(Long id) {

        if (!serviceRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Service not found with id: " + id
            );
        }

        serviceRepository.deleteById(id);
    }

    /** Turns a list of Project IDs from the request into actual Project entities. Null/empty -> no linked projects. */
    private List<Project> resolveProjects(List<Long> projectIds) {
        if (projectIds == null || projectIds.isEmpty()) {
            return Collections.emptyList();
        }
        return projectRepository.findAllById(projectIds);
    }

    private ServiceResponse toResponse(
            com.deepak.portfolio.entity.Service service
    ) {

        List<ProjectResponse> relatedProjects = service.getRelatedProjects()
                .stream()
                .filter(Objects::nonNull)
                .map(projectService::toResponse)
                .toList();

        return new ServiceResponse(
                service.getId(),
                service.getTitle(),
                service.getSlug(),
                service.getCategory(),
                service.getDescription(),
                service.getTechnologies(),
                service.getIcon(),
                service.getDisplayOrder(),
                service.isActive(),
                service.getCreatedAt(),
                service.getUpdatedAt(),
                relatedProjects
        );
    }
}