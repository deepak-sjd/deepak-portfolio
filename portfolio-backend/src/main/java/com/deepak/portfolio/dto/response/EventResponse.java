package com.deepak.portfolio.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

public record EventResponse(
        Long id,
        String title,
        LocalDate eventDate,
        LocalTime startTime,
        LocalTime endTime,
        String location,
        String description
) {
}