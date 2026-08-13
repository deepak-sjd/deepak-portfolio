package com.deepak.portfolio.dto.response;

import java.time.Instant;

public record NoteResponse(
        Long id,
        String title,
        String category,
        String summary,
        String content,
        String slug,
        boolean published,
        Integer displayOrder,
        Instant createdAt,
        Instant updatedAt
) {
}