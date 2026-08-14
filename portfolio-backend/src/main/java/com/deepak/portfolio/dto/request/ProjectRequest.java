package com.deepak.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProjectRequest(

        @NotBlank(message = "Title is required")
        @Size(max = 150, message = "Title must not exceed 150 characters")
        String title,

        @NotBlank(message = "Description is required")
        @Size(max = 2000, message = "Description must not exceed 2000 characters")
        String description,

        @NotBlank(message = "Technologies are required")
        @Size(max = 1000, message = "Technologies must not exceed 1000 characters")
        String technologies,

        @Size(max = 500, message = "GitHub URL must not exceed 500 characters")
        String githubUrl,

        @Size(max = 500, message = "Live URL must not exceed 500 characters")
        String liveUrl,

        @Size(max = 500, message = "Image URL must not exceed 500 characters")
        String imageUrl,

        boolean featured,

        Integer displayOrder
) {
}