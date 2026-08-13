package com.deepak.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ResumeRequest(

        @NotBlank(message = "Title is required")
        String title,

        @NotBlank(message = "File URL is required")
        String fileUrl,

        @NotBlank(message = "Version is required")
        String version,

        boolean active
) {
}