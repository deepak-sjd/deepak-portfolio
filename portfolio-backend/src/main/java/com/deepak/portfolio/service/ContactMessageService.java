package com.deepak.portfolio.service;

import com.deepak.portfolio.dto.request.ContactMessageRequest;
import com.deepak.portfolio.dto.response.ContactMessageResponse;
import com.deepak.portfolio.entity.ContactMessage;
import com.deepak.portfolio.exception.ResourceNotFoundException;
import com.deepak.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageService(
            ContactMessageRepository contactMessageRepository
    ) {
        this.contactMessageRepository = contactMessageRepository;
    }

    // ============================================================
    // CREATE
    // ============================================================

    @Transactional
    public ContactMessageResponse createMessage(
            ContactMessageRequest request
    ) {

        ContactMessage contactMessage = new ContactMessage(
                request.name(),
                request.email(),
                request.subject(),
                request.message()
        );

        ContactMessage savedMessage =
                contactMessageRepository.save(contactMessage);

        return toResponse(savedMessage);
    }

    // ============================================================
    // READ ALL
    // ============================================================

    @Transactional(readOnly = true)
    public List<ContactMessageResponse> getAllMessages() {

        return contactMessageRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // ============================================================
    // READ BY ID
    // ============================================================

    @Transactional(readOnly = true)
    public ContactMessageResponse getMessageById(Long id) {

        ContactMessage contactMessage =
                contactMessageRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Contact message not found with id: " + id
                                )
                        );

        return toResponse(contactMessage);
    }

    // ============================================================
    // DELETE
    // ============================================================

    @Transactional
    public void deleteMessage(Long id) {

        ContactMessage contactMessage =
                contactMessageRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Contact message not found with id: " + id
                                )
                        );

        contactMessageRepository.delete(contactMessage);
    }

    // ============================================================
    // ENTITY → RESPONSE DTO
    // ============================================================

    private ContactMessageResponse toResponse(
            ContactMessage contactMessage
    ) {

        return new ContactMessageResponse(
                contactMessage.getId(),
                contactMessage.getName(),
                contactMessage.getSubject(),
                contactMessage.getMessage(),
                contactMessage.getCreatedAt()
        );
    }
}