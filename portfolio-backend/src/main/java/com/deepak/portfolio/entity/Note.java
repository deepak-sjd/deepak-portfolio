package com.deepak.portfolio.entity;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Entity
@Table(name = "notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    /**
     * Legacy top-level grouping label (e.g. "Generative AI"). Kept for backward
     * compatibility and quick display; the real hierarchy now lives in `parent`.
     */
    @Column(nullable = false, length = 100)
    private String category;

    @Column(nullable = false, length = 500)
    private String summary;

    /** Nullable: pure "folder" nodes (Fields, Topics that only group children) may have no body content. */
    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false, length = 100, unique = true)
    private String slug;

    @Column(nullable = false)
    private boolean published;

    @Column(nullable = false)
    private Integer displayOrder;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    /**
     * Self-referencing parent. Null = top-level "Field" (e.g. Generative AI, Backend).
     * A node with a parent but that also has children is a "Topic" (e.g. RAG, LLM).
     * A node with a parent and no children is a leaf "Subtopic" (e.g. Chunking, Tokens & Tokenization).
     * The tree can nest to any depth — the UI decides how to render each level.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Note parent;

    @OneToMany(mappedBy = "note", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<NoteResource> resources = new ArrayList<>();

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
            Integer displayOrder,
            Note parent
    ) {
        this.title = title;
        this.category = category;
        this.summary = summary;
        this.content = content;
        this.slug = slug;
        this.published = published;
        this.displayOrder = displayOrder;
        this.parent = parent;
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

    public Note getParent() {
        return parent;
    }

    public List<NoteResource> getResources() {
        return resources.stream()
                .sorted(Comparator.comparing(NoteResource::getSortOrder))
                .toList();
    }

    public void addResource(NoteResource resource) {
        resources.add(resource);
    }

    public void removeResource(NoteResource resource) {
        resources.remove(resource);
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

    public void setParent(Note parent) {
        this.parent = parent;
    }
}
