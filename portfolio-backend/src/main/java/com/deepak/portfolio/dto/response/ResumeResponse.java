package com.deepak.portfolio.dto.response;

import java.time.Instant;

public record ResumeResponse(
        Long id,
        String title,
        String fileUrl,
        String version,
        boolean active,
        Instant createdAt,
        Instant updatedAt
) {
}