package com.deepak.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record NoteRequest(

        @NotBlank(message = "Title is required")
        @Size(max = 200, message = "Title must not exceed 200 characters")
        String title,

        @NotBlank(message = "Category is required")
        @Size(max = 100, message = "Category must not exceed 100 characters")
        String category,

        @NotBlank(message = "Summary is required")
        @Size(max = 500, message = "Summary must not exceed 500 characters")
        String summary,

        @NotBlank(message = "Content is required")
        String content,

        @NotBlank(message = "Slug is required")
        @Size(max = 100, message = "Slug must not exceed 100 characters")
        String slug,

        @NotNull(message = "Published status is required")
        Boolean published,

        @NotNull(message = "Display order is required")
        Integer displayOrder
) {
}