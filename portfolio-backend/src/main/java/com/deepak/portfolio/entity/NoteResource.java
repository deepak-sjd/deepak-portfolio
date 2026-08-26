package com.deepak.portfolio.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "note_resources")
public class NoteResource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "note_id", nullable = false)
    private Note note;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ResourceType type;

    /** Human-readable label shown in the UI, e.g. "Lecture Slides" or "Full Playlist". */
    @Column(nullable = false, length = 150)
    private String label;

    /**
     * For uploaded files (PDF/DOCX/IMAGE): the public path the file is served from,
     * e.g. /files/notes/1699999999-slides.pdf
     * For YOUTUBE/WEBSITE: the external URL itself.
     */
    @Column(nullable = false, length = 1000)
    private String url;

    /** Original uploaded file name, null for external links. */
    @Column(length = 255)
    private String fileName;

    /** File size in bytes, null for external links. */
    private Long fileSize;

    @Column(nullable = false)
    private Integer sortOrder;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    protected NoteResource() {
        // Required by JPA
    }

    public NoteResource(
            Note note,
            ResourceType type,
            String label,
            String url,
            String fileName,
            Long fileSize,
            Integer sortOrder
    ) {
        this.note = note;
        this.type = type;
        this.label = label;
        this.url = url;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.sortOrder = sortOrder;
        this.createdAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public Note getNote() {
        return note;
    }

    public ResourceType getType() {
        return type;
    }

    public String getLabel() {
        return label;
    }

    public String getUrl() {
        return url;
    }

    public String getFileName() {
        return fileName;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }
}
