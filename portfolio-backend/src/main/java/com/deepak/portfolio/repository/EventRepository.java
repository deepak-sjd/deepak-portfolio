package com.deepak.portfolio.repository;

import com.deepak.portfolio.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findAllByOrderByEventDateAscStartTimeAsc();
}