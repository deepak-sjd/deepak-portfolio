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
}package com.deepak.portfolio.service;

import com.deepak.portfolio.dto.request.NoteRequest;
import com.deepak.portfolio.dto.request.NoteResourceLinkRequest;
import com.deepak.portfolio.dto.response.NoteResourceResponse;
import com.deepak.portfolio.dto.response.NoteResponse;
import com.deepak.portfolio.entity.Note;
import com.deepak.portfolio.entity.NoteResource;
import com.deepak.portfolio.entity.ResourceType;
import com.deepak.portfolio.exception.DuplicateSlugException;
import com.deepak.portfolio.exception.FileStorageException;
import com.deepak.portfolio.exception.ResourceNotFoundException;
import com.deepak.portfolio.repository.NoteRepository;
import com.deepak.portfolio.repository.NoteResourceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@Service
public class NoteService {

    private static final String UPLOAD_SUBDIRECTORY = "notes";
    private static final Set<ResourceType> UPLOADABLE_TYPES = Set.of(
            ResourceType.PDF, ResourceType.DOCX, ResourceType.IMAGE
    );
    private static final Set<ResourceType> LINK_TYPES = Set.of(
            ResourceType.YOUTUBE, ResourceType.WEBSITE, ResourceType.OTHER
    );

    private final NoteRepository noteRepository;
    private final NoteResourceRepository noteResourceRepository;
    private final FileStorageService fileStorageService;

    public NoteService(
            NoteRepository noteRepository,
            NoteResourceRepository noteResourceRepository,
            FileStorageService fileStorageService
    ) {
        this.noteRepository = noteRepository;
        this.noteResourceRepository = noteResourceRepository;
        this.fileStorageService = fileStorageService;
    }

    // ============================================================
    // NOTES
    // ============================================================

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
                        new ResourceNotFoundException("Published note not found with slug: " + slug)
                );
        return toResponse(note);
    }

    @Transactional
    public NoteResponse createNote(NoteRequest request) {
        if (noteRepository.existsBySlug(request.slug())) {
            throw new DuplicateSlugException(request.slug());
        }

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
        Note note = findNoteOrThrow(id);

        if (!note.getSlug().equals(request.slug()) && noteRepository.existsBySlug(request.slug())) {
            throw new DuplicateSlugException(request.slug());
        }

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
        Note note = findNoteOrThrow(id);

        // Clean up any files on disk before the DB rows disappear via cascade.
        note.getResources().stream()
                .filter(r -> UPLOADABLE_TYPES.contains(r.getType()))
                .forEach(r -> fileStorageService.delete(UPLOAD_SUBDIRECTORY, r.getFileName()));

        noteRepository.delete(note);
    }

    // ============================================================
    // RESOURCES (files: PDF/DOCX/IMAGE)
    // ============================================================

    @Transactional
    public NoteResourceResponse uploadFileResource(
            Long noteId, MultipartFile file, ResourceType type, String label
    ) {
        if (!UPLOADABLE_TYPES.contains(type)) {
            throw new FileStorageException(
                    "Type must be one of " + UPLOADABLE_TYPES + " for file uploads"
            );
        }

        Note note = findNoteOrThrow(noteId);

        FileStorageService.StoredFile stored = fileStorageService.store(file, UPLOAD_SUBDIRECTORY);

        NoteResource resource = new NoteResource(
                note,
                type,
                label,
                stored.publicUrl(),
                stored.storedFileName(),
                stored.sizeInBytes(),
                nextSortOrder(note)
        );

        note.addResource(resource);
        NoteResource saved = noteResourceRepository.save(resource);

        return toResourceResponse(saved);
    }

    // ============================================================
    // RESOURCES (links: YouTube / website)
    // ============================================================

    @Transactional
    public NoteResourceResponse addLinkResource(Long noteId, NoteResourceLinkRequest request) {
        if (!LINK_TYPES.contains(request.type())) {
            throw new FileStorageException(
                    "Type must be one of " + LINK_TYPES + " for link resources"
            );
        }

        Note note = findNoteOrThrow(noteId);

        NoteResource resource = new NoteResource(
                note,
                request.type(),
                request.label(),
                request.url(),
                null,
                null,
                nextSortOrder(note)
        );

        note.addResource(resource);
        NoteResource saved = noteResourceRepository.save(resource);

        return toResourceResponse(saved);
    }

    @Transactional
    public void deleteResource(Long noteId, Long resourceId) {
        Note note = findNoteOrThrow(noteId);

        NoteResource resource = note.getResources().stream()
                .filter(r -> r.getId().equals(resourceId))
                .findFirst()
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resource not found with id: " + resourceId)
                );

        if (UPLOADABLE_TYPES.contains(resource.getType())) {
            fileStorageService.delete(UPLOAD_SUBDIRECTORY, resource.getFileName());
        }

        note.removeResource(resource);
        noteResourceRepository.delete(resource);
    }

    // ============================================================
    // HELPERS
    // ============================================================

    private Note findNoteOrThrow(Long id) {
        return noteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: " + id));
    }

    private int nextSortOrder(Note note) {
        return note.getResources().size();
    }

    private NoteResponse toResponse(Note note) {
        List<NoteResourceResponse> resources = note.getResources().stream()
                .map(this::toResourceResponse)
                .toList();

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
                note.getUpdatedAt(),
                resources
        );
    }

    private NoteResourceResponse toResourceResponse(NoteResource resource) {
        return new NoteResourceResponse(
                resource.getId(),
                resource.getType(),
                resource.getLabel(),
                resource.getUrl(),
                resource.getFileName(),
                resource.getFileSize(),
                resource.getSortOrder(),
                resource.getCreatedAt()
        );
    }
}
