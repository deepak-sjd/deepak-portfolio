package com.deepak.portfolio.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "services")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, unique = true, length = 150)
    private String slug;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String technologies;

    @Column(length = 100)
    private String icon;

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;

    @Column(nullable = false)
    private boolean active;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected Service() {
    }

    public Service(
            String title,
            String slug,
            String category,
            String description,
            String technologies,
            String icon,
            Integer displayOrder,
            boolean active
    ) {
        this.title = title;
        this.slug = slug;
        this.category = category;
        this.description = description;
        this.technologies = technologies;
        this.icon = icon;
        this.displayOrder = displayOrder;
        this.active = active;
    }

    @PrePersist
    protected void onCreate() {
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSlug() {
        return slug;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public String getTechnologies() {
        return technologies;
    }

    public String getIcon() {
        return icon;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public boolean isActive() {
        return active;
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

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTechnologies(String technologies) {
        this.technologies = technologies;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}