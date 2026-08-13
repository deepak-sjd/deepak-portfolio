package com.deepak.portfolio.controller;

import com.deepak.portfolio.dto.request.ServiceRequest;
import com.deepak.portfolio.dto.response.ServiceResponse;
import com.deepak.portfolio.service.ServiceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/services")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping
    public ResponseEntity<List<ServiceResponse>> getActiveServices() {
        return ResponseEntity.ok(
                serviceService.getActiveServices()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResponse> getServiceById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                serviceService.getServiceById(id)
        );
    }

    @PostMapping
    public ResponseEntity<ServiceResponse> createService(
            @Valid @RequestBody ServiceRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(serviceService.createService(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceResponse> updateService(
            @PathVariable Long id,
            @Valid @RequestBody ServiceRequest request
    ) {
        return ResponseEntity.ok(
                serviceService.updateService(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(
            @PathVariable Long id
    ) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}