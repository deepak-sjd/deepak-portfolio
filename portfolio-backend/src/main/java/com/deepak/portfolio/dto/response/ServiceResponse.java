package com.deepak.portfolio.dto.response;

import java.time.Instant;
import java.util.List;

public record ServiceResponse(
        Long id,
        String title,
        String slug,
        String category,
        String description,
        String technologies,
        String icon,
        Integer displayOrder,
        boolean active,
        Instant createdAt,
        Instant updatedAt,
        List<ProjectResponse> relatedProjects
) {
}