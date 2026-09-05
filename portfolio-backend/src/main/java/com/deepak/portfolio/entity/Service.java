package com.deepak.portfolio.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

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

    /**
     * Projects that showcase this service in practice — lets a Service card
     * link straight through to real proof-of-work (GitHub/live demo/video)
     * instead of just describing the skill in prose. Unidirectional: Project
     * doesn't need to know which services point at it, so there's no risk
     * of circular JSON serialization.
     */
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "service_projects",
            joinColumns = @JoinColumn(name = "service_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    @OrderColumn(name = "display_order")
    private List<Project> relatedProjects = new ArrayList<>();

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

    public List<Project> getRelatedProjects() {
        return relatedProjects;
    }

    public void setRelatedProjects(List<Project> relatedProjects) {
        this.relatedProjects = relatedProjects;
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