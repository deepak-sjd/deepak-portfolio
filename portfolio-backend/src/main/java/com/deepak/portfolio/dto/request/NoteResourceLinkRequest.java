package com.deepak.portfolio.dto.request;

import com.deepak.portfolio.entity.ResourceType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

/**
 * Used to attach an external link resource (YOUTUBE or WEBSITE) to a note.
 * File resources (PDF/DOCX/IMAGE) go through the multipart upload endpoint instead.
 */
public record NoteResourceLinkRequest(

        @NotNull(message = "Resource type is required")
        ResourceType type,

        @NotBlank(message = "Label is required")
        @Size(max = 150, message = "Label must not exceed 150 characters")
        String label,

        @NotBlank(message = "URL is required")
        @URL(message = "Must be a valid URL")
        @Size(max = 1000, message = "URL must not exceed 1000 characters")
        String url
) {
}
