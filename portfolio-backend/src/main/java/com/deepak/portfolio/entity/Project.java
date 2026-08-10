package com.deepak.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(nullable = false, length = 1000)
    private String technologies;

    @Column(length = 500)
    private String githubUrl;

    @Column(length = 500)
    private String liveUrl;

    @Column(length = 500)
    private String imageUrl;

    @Column(nullable = false)
    private boolean featured;

    protected Project() {
        // Required by JPA
    }

    public Project(
            String title,
            String description,
            String technologies,
            String githubUrl,
            String liveUrl,
            String imageUrl,
            boolean featured
    ) {
        this.title = title;
        this.description = description;
        this.technologies = technologies;
        this.githubUrl = githubUrl;
        this.liveUrl = liveUrl;
        this.imageUrl = imageUrl;
        this.featured = featured;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getTechnologies() {
        return technologies;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public String getLiveUrl() {
        return liveUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTechnologies(String technologies) {
        this.technologies = technologies;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public void setLiveUrl(String liveUrl) {
        this.liveUrl = liveUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }
}
