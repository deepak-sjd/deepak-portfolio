package com.deepak.portfolio.dto.response;

import java.time.Instant;

public record AboutResponse(
        Long id,
        String headline,
        String summary,
        String description,
        String currentRole,
        String location,
        String specialization,
        boolean availableForFreelance,
        Instant createdAt,
        Instant updatedAt
) {
}