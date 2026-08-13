package com.deepak.portfolio.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "resumes")
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 500)
    private String fileUrl;

    @Column(nullable = false, length = 50)
    private String version;

    @Column(nullable = false)
    private boolean active;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    protected Resume() {
    }

    public Resume(
            String title,
            String fileUrl,
            String version,
            boolean active
    ) {
        this.title = title;
        this.fileUrl = fileUrl;
        this.version = version;
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

    public String getFileUrl() {
        return fileUrl;
    }

    public String getVersion() {
        return version;
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

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}