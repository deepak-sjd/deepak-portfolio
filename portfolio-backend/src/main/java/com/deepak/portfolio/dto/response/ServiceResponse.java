package com.deepak.portfolio.dto.response;

import java.time.Instant;

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
        Instant updatedAt
) {
}