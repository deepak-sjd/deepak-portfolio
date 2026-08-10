package com.deepak.portfolio.controller;

import com.deepak.portfolio.dto.request.ContactMessageRequest;
import com.deepak.portfolio.dto.response.ContactMessageResponse;
import com.deepak.portfolio.service.ContactMessageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/contact")
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    public ContactMessageController(
            ContactMessageService contactMessageService
    ) {
        this.contactMessageService = contactMessageService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContactMessageResponse createMessage(
            @Valid @RequestBody ContactMessageRequest request
    ) {
        return contactMessageService.createMessage(request);
    }
}