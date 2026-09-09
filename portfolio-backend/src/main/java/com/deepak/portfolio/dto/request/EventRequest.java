package com.deepak.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;

public record EventRequest(

        @NotBlank(message = "Title is required")
        @Size(max = 150, message = "Title must not exceed 150 characters")
        String title,

        @NotNull(message = "Event date is required")
        LocalDate eventDate,

        LocalTime startTime,

        LocalTime endTime,

        @Size(max = 150, message = "Location must not exceed 150 characters")
        String location,

        @Size(max = 300, message = "Description must not exceed 300 characters")
        String description
) {
}