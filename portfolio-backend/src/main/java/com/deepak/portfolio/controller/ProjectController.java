package com.deepak.portfolio.controller;

import com.deepak.portfolio.dto.request.ProjectRequest;
import com.deepak.portfolio.dto.response.PageResponse;
import com.deepak.portfolio.dto.response.ProjectResponse;
import com.deepak.portfolio.service.ProjectService;
import com.deepak.portfolio.service.FileStorageService;

import jakarta.validation.Valid;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final FileStorageService fileStorageService;

    public ProjectController(ProjectService projectService, FileStorageService fileStorageService) {
        this.projectService = projectService;
        this.fileStorageService = fileStorageService;
    }

    // ============================================================
    // CREATE
    // ============================================================

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProjectResponse createProject(
            @Valid @RequestBody ProjectRequest request
    ) {
        return projectService.createProject(request);
    }

    // ============================================================
    // READ ALL
    // ============================================================

    @GetMapping
    public PageResponse<ProjectResponse> getAllProjects(
            @RequestParam(required = false) Boolean featured,
            @PageableDefault(
                    size = 10,
                    page = 0,
                    sort = "displayOrder",
                    direction = Sort.Direction.ASC
            )
            Pageable pageable
    ) {
        return projectService.getAllProjects(featured, pageable);
    }

    // ============================================================
    // READ BY ID
    // ============================================================

    @GetMapping("/{id}")
    public ProjectResponse getProjectById(
            @PathVariable Long id
    ) {
        return projectService.getProjectById(id);
    }

    // ============================================================
    // UPDATE
    // ============================================================

    @PutMapping("/{id}")
    public ProjectResponse updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequest request
    ) {
        return projectService.updateProject(id, request);
    }

    // ============================================================
    // UPLOAD IMAGE
    // ============================================================

    @PostMapping(value = "/{id}/image", consumes = "multipart/form-data")
    public ProjectResponse uploadProjectImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) {
        return projectService.updateProjectImage(id, file);
    }

    // ============================================================
    // DELETE
    // ============================================================

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProject(
            @PathVariable Long id
    ) {
        projectService.deleteProject(id);
    }
}