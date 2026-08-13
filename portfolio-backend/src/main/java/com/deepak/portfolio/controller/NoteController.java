package com.deepak.portfolio.controller;

import com.deepak.portfolio.dto.request.NoteRequest;
import com.deepak.portfolio.dto.response.NoteResponse;
import com.deepak.portfolio.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    // ============================================================
    // PUBLIC NOTES
    // ============================================================

    @GetMapping
    public List<NoteResponse> getPublishedNotes() {
        return noteService.getPublishedNotes();
    }

    // ============================================================
    // PUBLIC NOTE BY SLUG
    // ============================================================

    @GetMapping("/{slug}")
    public NoteResponse getPublishedNoteBySlug(
            @PathVariable String slug
    ) {
        return noteService.getPublishedNoteBySlug(slug);
    }

    // ============================================================
    // CREATE NOTE
    // ============================================================

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public NoteResponse createNote(
            @Valid @RequestBody NoteRequest request
    ) {
        return noteService.createNote(request);
    }

    // ============================================================
    // UPDATE NOTE
    // ============================================================

    @PutMapping("/{id}")
    public NoteResponse updateNote(
            @PathVariable Long id,
            @Valid @RequestBody NoteRequest request
    ) {
        return noteService.updateNote(id, request);
    }

    // ============================================================
    // DELETE NOTE
    // ============================================================

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNote(
            @PathVariable Long id
    ) {
        noteService.deleteNote(id);
    }
}