package com.deepak.portfolio.service;

import com.deepak.portfolio.dto.request.ProjectRequest;
import com.deepak.portfolio.dto.response.PageResponse;
import com.deepak.portfolio.dto.response.ProjectResponse;
import com.deepak.portfolio.entity.Project;
import com.deepak.portfolio.exception.ResourceNotFoundException;
import com.deepak.portfolio.repository.ProjectRepository;
import com.deepak.portfolio.repository.ServiceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ServiceRepository serviceRepository;

    public ProjectService(ProjectRepository projectRepository, ServiceRepository serviceRepository) {
        this.projectRepository = projectRepository;
        this.serviceRepository = serviceRepository;
    }

    // ============================================================
    // CREATE
    // ============================================================

    @Transactional
    public ProjectResponse createProject(ProjectRequest request) {

        Project project = new Project(
                request.title(),
                request.description(),
                request.technologies(),
                request.githubUrl(),
                request.liveUrl(),
                request.imageUrl(),
                request.featured(),
                request.displayOrder()
        );
        project.setVideoUrl(request.videoUrl());

        Project savedProject = projectRepository.save(project);

        return toResponse(savedProject);
    }

    // ============================================================
    // READ ALL
    // ============================================================

    @Transactional(readOnly = true)
    public PageResponse<ProjectResponse> getAllProjects(
            Boolean featured,
            Pageable pageable
    ) {

        Page<Project> projectPage;

        if (featured == null) {
            projectPage = projectRepository.findAll(pageable);
        } else {
            projectPage = projectRepository.findByFeatured(
                    featured,
                    pageable
            );
        }

        List<ProjectResponse> projects = projectPage.getContent()
                .stream()
                .map(this::toResponse)
                .toList();

        return new PageResponse<>(
                projects,
                projectPage.getNumber(),
                projectPage.getSize(),
                projectPage.getTotalElements(),
                projectPage.getTotalPages(),
                projectPage.isFirst(),
                projectPage.isLast()
        );
    }

    // ============================================================
    // READ BY ID
    // ============================================================

    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Project not found with id: " + id
                        )
                );

        return toResponse(project);
    }

    // ============================================================
    // UPDATE
    // ============================================================

    @Transactional
    public ProjectResponse updateProject(
            Long id,
            ProjectRequest request
    ) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Project not found with id: " + id
                        )
                );

        project.setTitle(request.title());
        project.setDescription(request.description());
        project.setTechnologies(request.technologies());
        project.setGithubUrl(request.githubUrl());
        project.setLiveUrl(request.liveUrl());
        project.setImageUrl(request.imageUrl());
        project.setVideoUrl(request.videoUrl());
        project.setFeatured(request.featured());
        project.setDisplayOrder(request.displayOrder());

        Project updatedProject = projectRepository.save(project);

        return toResponse(updatedProject);
    }

    // ============================================================
    // DELETE
    // ============================================================

    @Transactional
    public void deleteProject(Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Project not found with id: " + id
                        )
                );

        // Clean up any Service -> Project links first, so we never leave a
        // dangling service_projects row behind (see
        // ServiceRepository.removeProjectFromAllServices for why that
        // matters).
        serviceRepository.removeProjectFromAllServices(id);

        projectRepository.delete(project);
    }

    // ============================================================
    // ENTITY → RESPONSE DTO
    // ============================================================

    ProjectResponse toResponse(Project project) {

        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getTechnologies(),
                project.getGithubUrl(),
                project.getLiveUrl(),
                project.getImageUrl(),
                project.getVideoUrl(),
                project.isFeatured(),
                project.getDisplayOrder()
        );
    }
}