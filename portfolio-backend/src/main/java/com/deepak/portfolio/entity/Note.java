package com.deepak.portfolio.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(nullable = false, length = 500)
    private String summary;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false, length = 100)
    private String slug;

    @Column(nullable = false)
    private boolean published;

    @Column(nullable = false)
    private Integer displayOrder;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    protected Note() {
        // Required by JPA
    }

    public Note(
            String title,
            String category,
            String summary,
            String content,
            String slug,
            boolean published,
            Integer displayOrder
    ) {
        this.title = title;
        this.category = category;
        this.summary = summary;
        this.content = content;
        this.slug = slug;
        this.published = published;
        this.displayOrder = displayOrder;
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCategory() {
        return category;
    }

    public String getSummary() {
        return summary;
    }

    public String getContent() {
        return content;
    }

    public String getSlug() {
        return slug;
    }

    public boolean isPublished() {
        return published;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}