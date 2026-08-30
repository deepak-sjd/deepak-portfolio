package com.deepak.portfolio.repository;

import com.deepak.portfolio.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {

    /** Top-level Field nodes (Generative AI, Backend, etc.) shown on the main Notes page. */
    List<Note> findByParentIsNullAndPublishedTrueOrderByDisplayOrderAsc();

    /** Direct children of a given node (Topics under a Field, or Subtopics under a Topic). */
    List<Note> findByParent_SlugAndPublishedTrueOrderByDisplayOrderAsc(String parentSlug);

    /** Used to check if a node has any children at all (published or not) for the hasChildren flag. */
    boolean existsByParent_Slug(String parentSlug);

    Optional<Note> findBySlugAndPublishedTrue(String slug);

    /** Used when resolving parentSlug on create/update — doesn't require the parent to be published. */
    Optional<Note> findBySlug(String slug);

    boolean existsBySlug(String slug);

    int countByParent_Slug(String parentSlug);
}
