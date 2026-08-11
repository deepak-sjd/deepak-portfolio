package com.deepak.portfolio.controller;

import com.deepak.portfolio.dto.request.ContactMessageRequest;
import com.deepak.portfolio.dto.response.ContactMessageResponse;
import com.deepak.portfolio.service.ContactMessageService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contact")
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    public ContactMessageController(
            ContactMessageService contactMessageService
    ) {
        this.contactMessageService = contactMessageService;
    }

    // ============================================================
    // CREATE
    // ============================================================

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContactMessageResponse createMessage(
            @Valid @RequestBody ContactMessageRequest request
    ) {
        return contactMessageService.createMessage(request);
    }

    // ============================================================
    // READ ALL
    // ============================================================

    @GetMapping
    public List<ContactMessageResponse> getAllMessages() {
        return contactMessageService.getAllMessages();
    }

    // ============================================================
    // READ BY ID
    // ============================================================

    @GetMapping("/{id}")
    public ContactMessageResponse getMessageById(
            @PathVariable Long id
    ) {
        return contactMessageService.getMessageById(id);
    }

    // ============================================================
    // DELETE
    // ============================================================

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMessage(
            @PathVariable Long id
    ) {
        contactMessageService.deleteMessage(id);
    }
}