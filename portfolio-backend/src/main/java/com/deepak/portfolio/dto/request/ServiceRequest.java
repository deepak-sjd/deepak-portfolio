package com.deepak.portfolio.dto.request;

import jakarta.validation.constraints.*;

public record ServiceRequest(

        @NotBlank(message = "Title is required")
        @Size(max = 150, message = "Title must not exceed 150 characters")
        String title,

        @NotBlank(message = "Slug is required")
        @Size(max = 150, message = "Slug must not exceed 150 characters")
        String slug,

        @NotBlank(message = "Category is required")
        @Size(max = 100, message = "Category must not exceed 100 characters")
        String category,

        @NotBlank(message = "Description is required")
        String description,

        @NotBlank(message = "Technologies are required")
        String technologies,

        @Size(max = 100, message = "Icon must not exceed 100 characters")
        String icon,

        @NotNull(message = "Display order is required")
        @Min(value = 0, message = "Display order cannot be negative")
        Integer displayOrder,

        boolean active
) {
}