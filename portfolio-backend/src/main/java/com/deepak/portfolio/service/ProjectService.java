package com.deepak.portfolio.service;

import com.deepak.portfolio.dto.request.ProjectRequest;
import com.deepak.portfolio.dto.response.PageResponse;
import com.deepak.portfolio.dto.response.ProjectResponse;
import com.deepak.portfolio.entity.Project;
import com.deepak.portfolio.exception.ResourceNotFoundException;
import com.deepak.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
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
                request.featured()
        );

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
        project.setFeatured(request.featured());

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

        projectRepository.delete(project);
    }

    // ============================================================
    // ENTITY → RESPONSE DTO
    // ============================================================

    private ProjectResponse toResponse(Project project) {

        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getTechnologies(),
                project.getGithubUrl(),
                project.getLiveUrl(),
                project.getImageUrl(),
                project.isFeatured()
        );
    }
}