package com.deepak.portfolio.service;

import com.deepak.portfolio.dto.request.ServiceRequest;
import com.deepak.portfolio.dto.response.ServiceResponse;
import com.deepak.portfolio.exception.ResourceNotFoundException;
import com.deepak.portfolio.repository.ServiceRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @Transactional(readOnly = true)
    public List<ServiceResponse> getActiveServices() {

        return serviceRepository.findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
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

    private ServiceResponse toResponse(
            com.deepak.portfolio.entity.Service service
    ) {

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
                service.getUpdatedAt()
        );
    }
}