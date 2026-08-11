package com.deepak.portfolio.dto.response;

public record SkillResponse(
        Long id,
        String name,
        String category,
        Integer proficiency,
        Integer displayOrder
) {
}