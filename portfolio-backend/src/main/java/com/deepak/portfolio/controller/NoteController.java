package com.deepak.portfolio.controller;

import com.deepak.portfolio.dto.request.NoteRequest;
import com.deepak.portfolio.dto.request.NoteResourceLinkRequest;
import com.deepak.portfolio.dto.response.NoteResourceResponse;
import com.deepak.portfolio.dto.response.NoteResponse;
import com.deepak.portfolio.dto.response.NoteSummaryResponse;
import com.deepak.portfolio.entity.ResourceType;
import com.deepak.portfolio.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    // ============================================================
    // PUBLIC — TREE NAVIGATION
    // ============================================================

    /** Top-level Field cards (Generative AI, Backend, etc.) for the main Notes page. */
    @GetMapping
    public List<NoteSummaryResponse> getRootNotes() {
        return noteService.getRootNotes();
    }

    /**
     * A single node's detail — includes its own content/resources plus its
     * direct children. If children is non-empty, the frontend shows a grid
     * to drill down further; if empty, it's a leaf and shows content+resources.
     */
    @GetMapping("/{slug}")
    public NoteResponse getPublishedNoteBySlug(@PathVariable String slug) {
        return noteService.getPublishedNoteBySlug(slug);
    }

    // ============================================================
    // CREATE / UPDATE / DELETE NOTE
    // (Wire these behind admin authentication before going live.)
    // ============================================================

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public NoteResponse createNote(@Valid @RequestBody NoteRequest request) {
        return noteService.createNote(request);
    }

    @PutMapping("/{id}")
    public NoteResponse updateNote(@PathVariable Long id, @Valid @RequestBody NoteRequest request) {
        return noteService.updateNote(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
    }

    // ============================================================
    // NOTE RESOURCES — file uploads (PDF / DOCX / IMAGE)
    // ============================================================

    @PostMapping(value = "/{noteId}/resources/upload", consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.CREATED)
    public NoteResourceResponse uploadResource(
            @PathVariable Long noteId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("type") ResourceType type,
            @RequestParam("label") String label
    ) {
        return noteService.uploadFileResource(noteId, file, type, label);
    }

    // ============================================================
    // NOTE RESOURCES — external links (YouTube / website)
    // ============================================================

    @PostMapping("/{noteId}/resources/link")
    @ResponseStatus(HttpStatus.CREATED)
    public NoteResourceResponse addLinkResource(
            @PathVariable Long noteId,
            @Valid @RequestBody NoteResourceLinkRequest request
    ) {
        return noteService.addLinkResource(noteId, request);
    }

    // ============================================================
    // NOTE RESOURCES — delete
    // ============================================================

    @DeleteMapping("/{noteId}/resources/{resourceId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteResource(@PathVariable Long noteId, @PathVariable Long resourceId) {
        noteService.deleteResource(noteId, resourceId);
    }
}
