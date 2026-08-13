package com.deepak.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AboutRequest(

        @NotBlank(message = "Headline is required")
        @Size(max = 150, message = "Headline must not exceed 150 characters")
        String headline,

        @NotBlank(message = "Summary is required")
        @Size(max = 500, message = "Summary must not exceed 500 characters")
        String summary,

        @NotBlank(message = "Description is required")
        String description,

        @NotBlank(message = "Current role is required")
        @Size(max = 150, message = "Current role must not exceed 150 characters")
        String currentRole,

        @NotBlank(message = "Location is required")
        @Size(max = 150, message = "Location must not exceed 150 characters")
        String location,

        @NotBlank(message = "Specialization is required")
        @Size(max = 150, message = "Specialization must not exceed 150 characters")
        String specialization,

        @NotNull(message = "Freelance availability is required")
        Boolean availableForFreelance
) {
}