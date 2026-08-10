package com.deepak.portfolio.dto.response;

public record ProjectResponse(
        Long id,
        String title,
        String description,
        String technologies,
        String githubUrl,
        String liveUrl,
        String imageUrl,
        boolean featured
) {
}