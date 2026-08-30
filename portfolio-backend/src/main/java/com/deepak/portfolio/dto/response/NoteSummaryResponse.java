package com.deepak.portfolio.dto.response;

public record NoteSummaryResponse(
        Long id,
        String title,
        String slug,
        String summary,
        Integer displayOrder,
        boolean hasChildren,
        int resourceCount
) {
}
