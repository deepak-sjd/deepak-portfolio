package com.deepak.portfolio.entity;

/**
 * Type of resource attached to a Note.
 * PDF / DOCX / IMAGE -> uploaded files served from disk.
 * YOUTUBE / WEBSITE -> external links.
 */
public enum ResourceType {
    PDF,
    DOCX,
    IMAGE,
    YOUTUBE,
    WEBSITE,
    OTHER
}
