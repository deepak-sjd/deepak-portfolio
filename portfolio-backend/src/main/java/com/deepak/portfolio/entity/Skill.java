package com.deepak.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(nullable = false)
    private Integer displayOrder;

    /**
     * Short, admin-editable blurb shown on the public Skills section.
     * Optional — the frontend falls back to a generic line if this is blank.
     */
    @Column(length = 300)
    private String description;

    /**
     * Required by JPA.
     */
    protected Skill() {
    }

    public Skill(
            String name,
            String category,
            Integer displayOrder,
            String description
    ) {
        this.name = name;
        this.category = category;
        this.displayOrder = displayOrder;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public String getDescription() {
        return description;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}