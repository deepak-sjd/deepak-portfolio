package com.deepak.portfolio.repository;

import com.deepak.portfolio.entity.NoteResource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteResourceRepository extends JpaRepository<NoteResource, Long> {
}
