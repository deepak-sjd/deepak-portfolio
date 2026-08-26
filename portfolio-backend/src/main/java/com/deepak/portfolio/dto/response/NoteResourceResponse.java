package com.deepak.portfolio.dto.response;

import com.deepak.portfolio.entity.ResourceType;

import java.time.Instant;

public record NoteResourceResponse(
        Long id,
        ResourceType type,
        String label,
        String url,
        String fileName,
        Long fileSize,
        Integer sortOrder,
        Instant createdAt
) {
}
