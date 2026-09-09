package com.deepak.portfolio.dto.response;

import java.time.LocalDate;

public record TaskResponse(
        Long id,
        String title,
        Boolean completed,
        LocalDate dueDate,
        Integer displayOrder
) {
}