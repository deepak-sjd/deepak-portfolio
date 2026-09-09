
package com.deepak.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record TaskRequest(

        @NotBlank(message = "Title is required")
        @Size(max = 200, message = "Title must not exceed 200 characters")
        String title,

        @NotNull(message = "Completed flag is required")
        Boolean completed,

        LocalDate dueDate,

        @NotNull(message = "Display order is required")
        Integer displayOrder
) {
}