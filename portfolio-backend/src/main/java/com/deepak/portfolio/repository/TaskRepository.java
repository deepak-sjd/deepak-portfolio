package com.deepak.portfolio.repository;

import com.deepak.portfolio.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByOrderByDisplayOrderAsc();
}