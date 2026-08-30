package com.deepak.portfolio.dto.response;

import java.time.Instant;
import java.util.List;

public record NoteResponse(
        Long id,
        String title,
        String category,
        String summary,
        String content,
        String slug,
        boolean published,
        Integer displayOrder,
        Instant createdAt,
        Instant updatedAt,
        List<NoteResourceResponse> resources,

        /** Null if this is a top-level Field. */
        String parentSlug,
        String parentTitle,

        /** Direct children of this node. */
        List<NoteSummaryResponse> children
) {
}