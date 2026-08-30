package com.deepak.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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

        /** Optional: "folder" nodes that only group children can leave this blank. */
        String content,

        @NotBlank(message = "Slug is required")
        @Size(max = 100, message = "Slug must not exceed 100 characters")
        @Pattern(
                regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$",
                message = "Slug must be lowercase, alphanumeric, and hyphen-separated (e.g. 'my-note-title')"
        )
        String slug,

        @NotNull(message = "Published status is required")
        Boolean published,

        @NotNull(message = "Display order is required")
        Integer displayOrder,

        /** Optional: slug of the parent node to nest this note under. Omit/null for a top-level Field. */
        String parentSlug
) {
}
