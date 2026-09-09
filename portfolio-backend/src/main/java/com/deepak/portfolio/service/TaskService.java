package com.deepak.portfolio.service;

import com.deepak.portfolio.dto.request.TaskRequest;
import com.deepak.portfolio.dto.response.TaskResponse;
import com.deepak.portfolio.entity.Task;
import com.deepak.portfolio.exception.ResourceNotFoundException;
import com.deepak.portfolio.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Transactional(readOnly = true)
    public List<TaskResponse> getAllTasks() {

        return taskRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public TaskResponse getTaskById(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found with id: " + id)
                );

        return toResponse(task);
    }

    @Transactional
    public TaskResponse createTask(TaskRequest request) {

        Task task = new Task(
                request.title(),
                request.completed(),
                request.dueDate(),
                request.displayOrder()
        );

        return toResponse(taskRepository.save(task));
    }

    @Transactional
    public TaskResponse updateTask(Long id, TaskRequest request) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found with id: " + id)
                );

        task.setTitle(request.title());
        task.setCompleted(request.completed());
        task.setDueDate(request.dueDate());
        task.setDisplayOrder(request.displayOrder());

        return toResponse(taskRepository.save(task));
    }

    @Transactional
    public void deleteTask(Long id) {

        if (!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Task not found with id: " + id);
        }

        taskRepository.deleteById(id);
    }

    private TaskResponse toResponse(Task task) {

        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getCompleted(),
                task.getDueDate(),
                task.getDisplayOrder()
        );
    }
}