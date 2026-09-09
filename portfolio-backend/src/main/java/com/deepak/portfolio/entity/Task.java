package com.deepak.portfolio.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false)
    private Boolean completed = false;

    private LocalDate dueDate;

    @Column(nullable = false)
    private Integer displayOrder = 0;

    protected Task() {
    }

    public Task(String title, Boolean completed, LocalDate dueDate, Integer displayOrder) {
        this.title = title;
        this.completed = completed != null ? completed : false;
        this.dueDate = dueDate;
        this.displayOrder = displayOrder != null ? displayOrder : 0;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}