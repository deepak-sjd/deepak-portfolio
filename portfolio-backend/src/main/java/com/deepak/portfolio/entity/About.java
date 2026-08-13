package com.deepak.portfolio.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "about")
public class About {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String headline;

    @Column(nullable = false, length = 500)
    private String summary;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "role",nullable = false, length = 150)
    private String currentRole;

    @Column(nullable = false, length = 150)
    private String location;

    @Column(nullable = false, length = 150)
    private String specialization;

    @Column(nullable = false)
    private boolean availableForFreelance;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    protected About() {
        // Required by JPA
    }

    public About(
            String headline,
            String summary,
            String description,
            String currentRole,
            String location,
            String specialization,
            boolean availableForFreelance
    ) {
        this.headline = headline;
        this.summary = summary;
        this.description = description;
        this.currentRole = currentRole;
        this.location = location;
        this.specialization = specialization;
        this.availableForFreelance = availableForFreelance;
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

    public String getHeadline() {
        return headline;
    }

    public String getSummary() {
        return summary;
    }

    public String getDescription() {
        return description;
    }

    public String getCurrentRole() {
        return currentRole;
    }

    public String getLocation() {
        return location;
    }

    public String getSpecialization() {
        return specialization;
    }

    public boolean isAvailableForFreelance() {
        return availableForFreelance;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCurrentRole(String currentRole) {
        this.currentRole = currentRole;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public void setAvailableForFreelance(boolean availableForFreelance) {
        this.availableForFreelance = availableForFreelance;
    }
}