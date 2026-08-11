package com.deepak.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record ExperienceRequest(

        @NotBlank(message = "Company is required")
        @Size(max = 150, message = "Company must not exceed 150 characters")
        String company,

        @NotBlank(message = "Role is required")
        @Size(max = 150, message = "Role must not exceed 150 characters")
        String role,

        @NotBlank(message = "Employment type is required")
        @Size(max = 100, message = "Employment type must not exceed 100 characters")
        String employmentType,

        @NotBlank(message = "Location is required")
        @Size(max = 150, message = "Location must not exceed 150 characters")
        String location,

        @NotNull(message = "Start date is required")
        LocalDate startDate,

        LocalDate endDate,

        boolean current,

        @NotBlank(message = "Description is required")
        @Size(max = 5000, message = "Description must not exceed 5000 characters")
        String description,

        @NotNull(message = "Display order is required")
        @PositiveOrZero(message = "Display order must be zero or greater")
        Integer displayOrder

) {
}