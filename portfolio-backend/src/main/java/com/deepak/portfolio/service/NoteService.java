package com.deepak.portfolio.service;

import com.deepak.portfolio.dto.request.NoteRequest;
import com.deepak.portfolio.dto.response.NoteResponse;
import com.deepak.portfolio.entity.Note;
import com.deepak.portfolio.exception.ResourceNotFoundException;
import com.deepak.portfolio.repository.NoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @Transactional(readOnly = true)
    public List<NoteResponse> getPublishedNotes() {

        return noteRepository
                .findByPublishedTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public NoteResponse getPublishedNoteBySlug(String slug) {

        Note note = noteRepository
                .findBySlugAndPublishedTrue(slug)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Published note not found with slug: " + slug
                        )
                );

        return toResponse(note);
    }

    @Transactional
    public NoteResponse createNote(NoteRequest request) {

        Note note = new Note(
                request.title(),
                request.category(),
                request.summary(),
                request.content(),
                request.slug(),
                request.published(),
                request.displayOrder()
        );

        Note savedNote = noteRepository.save(note);

        return toResponse(savedNote);
    }

    @Transactional
    public NoteResponse updateNote(Long id, NoteRequest request) {

        Note note = noteRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Note not found with id: " + id
                        )
                );

        note.setTitle(request.title());
        note.setCategory(request.category());
        note.setSummary(request.summary());
        note.setContent(request.content());
        note.setSlug(request.slug());
        note.setPublished(request.published());
        note.setDisplayOrder(request.displayOrder());

        return toResponse(note);
    }

    @Transactional
    public void deleteNote(Long id) {

        Note note = noteRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Note not found with id: " + id
                        )
                );

        noteRepository.delete(note);
    }

    private NoteResponse toResponse(Note note) {

        return new NoteResponse(
                note.getId(),
                note.getTitle(),
                note.getCategory(),
                note.getSummary(),
                note.getContent(),
                note.getSlug(),
                note.isPublished(),
                note.getDisplayOrder(),
                note.getCreatedAt(),
                note.getUpdatedAt()
        );
    }
}