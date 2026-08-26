package com.deepak.portfolio.repository;

import com.deepak.portfolio.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByPublishedTrueOrderByDisplayOrderAsc();

    Optional<Note> findBySlugAndPublishedTrue(String slug);

    boolean existsBySlug(String slug);
}
