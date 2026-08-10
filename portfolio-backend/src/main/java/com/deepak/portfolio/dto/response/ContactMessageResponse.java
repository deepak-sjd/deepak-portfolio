package com.deepak.portfolio.dto.response;

import java.time.Instant;

public record ContactMessageResponse(
        Long id,
        String name,
        String subject,
        String message,
        Instant createdAt
) {
}