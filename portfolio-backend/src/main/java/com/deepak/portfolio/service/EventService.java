package com.deepak.portfolio.service;

import com.deepak.portfolio.dto.request.EventRequest;
import com.deepak.portfolio.dto.response.EventResponse;
import com.deepak.portfolio.entity.Event;
import com.deepak.portfolio.exception.ResourceNotFoundException;
import com.deepak.portfolio.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Transactional(readOnly = true)
    public List<EventResponse> getAllEvents() {

        return eventRepository.findAllByOrderByEventDateAscStartTimeAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public EventResponse getEventById(Long id) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Event not found with id: " + id)
                );

        return toResponse(event);
    }

    @Transactional
    public EventResponse createEvent(EventRequest request) {

        Event event = new Event(
                request.title(),
                request.eventDate(),
                request.startTime(),
                request.endTime(),
                request.location(),
                request.description()
        );

        return toResponse(eventRepository.save(event));
    }

    @Transactional
    public EventResponse updateEvent(Long id, EventRequest request) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Event not found with id: " + id)
                );

        event.setTitle(request.title());
        event.setEventDate(request.eventDate());
        event.setStartTime(request.startTime());
        event.setEndTime(request.endTime());
        event.setLocation(request.location());
        event.setDescription(request.description());

        return toResponse(eventRepository.save(event));
    }

    @Transactional
    public void deleteEvent(Long id) {

        if (!eventRepository.existsById(id)) {
            throw new ResourceNotFoundException("Event not found with id: " + id);
        }

        eventRepository.deleteById(id);
    }

    private EventResponse toResponse(Event event) {

        return new EventResponse(
                event.getId(),
                event.getTitle(),
                event.getEventDate(),
                event.getStartTime(),
                event.getEndTime(),
                event.getLocation(),
                event.getDescription()
        );
    }
}