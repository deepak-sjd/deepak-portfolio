package com.deepak.portfolio.service;

import com.deepak.portfolio.dto.request.ContactMessageRequest;
import com.deepak.portfolio.dto.response.ContactMessageResponse;
import com.deepak.portfolio.entity.ContactMessage;
import com.deepak.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageService(
            ContactMessageRepository contactMessageRepository
    ) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @Transactional
    public ContactMessageResponse createMessage(ContactMessageRequest request) {

        ContactMessage contactMessage = new ContactMessage(
                request.name(),
                request.email(),
                request.subject(),
                request.message()
        );

        ContactMessage savedMessage =
                contactMessageRepository.save(contactMessage);

        return new ContactMessageResponse(
                savedMessage.getId(),
                savedMessage.getName(),
                savedMessage.getSubject(),
                savedMessage.getMessage(),
                savedMessage.getCreatedAt()
        );
    }
}