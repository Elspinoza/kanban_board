package com.kanban.taskmanager.service;

import com.kanban.taskmanager.domain.entity.Task;
import com.kanban.taskmanager.domain.entity.User;
import com.kanban.taskmanager.domain.enums.Role;
import com.kanban.taskmanager.domain.enums.TaskStatus;
import com.kanban.taskmanager.dto.task.TaskDtos.TaskCreateRequest;
import com.kanban.taskmanager.dto.task.TaskDtos.TaskDto;
import com.kanban.taskmanager.dto.task.TaskDtos.TaskUpdateRequest;
import com.kanban.taskmanager.mapper.TaskMapper;
import com.kanban.taskmanager.repository.TaskRepository;
import com.kanban.taskmanager.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final TaskMapper taskMapper;

    @Transactional
    public TaskDto createTask(TaskCreateRequest request, String currentUserEmail) {
        User creator = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new EntityNotFoundException("Creator not found"));

        User assignee = null;
        if (request.getAssigneeId() != null) {
            assignee = userRepository.findById(request.getAssigneeId())
                    .orElseThrow(() -> new EntityNotFoundException("Assignee not found"));
        }

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus() != null ? request.getStatus() : TaskStatus.TODO)
                .priority(request.getPriority())
                .deadline(parseDeadline(request.getDeadline()))
                .assignee(assignee)
                .creator(creator)
                .build();

        return taskMapper.toDto(taskRepository.save(task));
    }

    @Transactional
    public TaskDto updateTask(Long id, TaskUpdateRequest request, String currentUserEmail) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));

        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Only ADMIN, SCRUM_MASTER, PRODUCT_OWNER or the creator/assignee can edit a task
        // Generic simplification for the logic:
        boolean canEdit = currentUser.getRole() == Role.ADMIN || 
                          currentUser.getRole() == Role.SCRUM_MASTER ||
                          currentUser.getRole() == Role.PRODUCT_OWNER ||
                          task.getCreator().getId().equals(currentUser.getId()) ||
                          (task.getAssignee() != null && task.getAssignee().getId().equals(currentUser.getId()));
                          
        if (!canEdit) {
            throw new AccessDeniedException("You do not have permission to edit this task");
        }

        if (request.getTitle() != null) task.setTitle(request.getTitle());
        if (request.getDescription() != null) task.setDescription(request.getDescription());
        if (request.getStatus() != null) task.setStatus(request.getStatus());
        if (request.getPriority() != null) task.setPriority(request.getPriority());
        if (request.getDeadline() != null) task.setDeadline(parseDeadline(request.getDeadline()));

        if (request.getAssigneeId() != null) {
            User assignee = userRepository.findById(request.getAssigneeId())
                    .orElseThrow(() -> new EntityNotFoundException("Assignee not found"));
            task.setAssignee(assignee);
        }

        return taskMapper.toDto(taskRepository.save(task));
    }

    public Page<TaskDto> getTasks(TaskStatus status, Long assigneeId, String search, Pageable pageable) {
        return taskRepository.findTasksWithFilters(status, assigneeId, search, pageable)
                .map(taskMapper::toDto);
    }

    @Transactional
    public void deleteTask(Long id, String currentUserEmail) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));

        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (currentUser.getRole() != Role.ADMIN && currentUser.getRole() != Role.PRODUCT_OWNER && currentUser.getRole() != Role.SCRUM_MASTER) {
            if (!task.getCreator().getId().equals(currentUser.getId())) {
                throw new AccessDeniedException("Only Admins, PMs, Scrum Masters, or the creator can delete tasks");
            }
        }

        taskRepository.delete(task);
    }
    private LocalDateTime parseDeadline(String deadline) {
        if (deadline == null || deadline.isBlank()) return null;
        try {
            if (deadline.contains("T")) {
                return LocalDateTime.parse(deadline);
            } else {
                return LocalDate.parse(deadline).atTime(LocalTime.MAX);
            }
        } catch (DateTimeParseException e) {
            return null;
        }
    }
}
