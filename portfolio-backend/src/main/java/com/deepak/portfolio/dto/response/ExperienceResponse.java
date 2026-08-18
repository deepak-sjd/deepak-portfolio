package com.deepak.portfolio.dto.response;

import java.time.LocalDate;

public record ExperienceResponse(

        Long id,
        String company,
        String role,
        String employmentType,
        String location,
        LocalDate startDate,
        LocalDate endDate,
        boolean current,
        String description,
        Integer displayOrder,
        String cgpa

) {
}