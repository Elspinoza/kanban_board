package com.kanban.taskmanager.dto.task;

import com.kanban.taskmanager.domain.enums.TaskPriority;
import com.kanban.taskmanager.domain.enums.TaskStatus;
import com.kanban.taskmanager.dto.user.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class TaskDtos {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TaskDto {
        private Long id;
        private String title;
        private String description;
        private TaskStatus status;
        private TaskPriority priority;
        private LocalDateTime deadline;
        private UserDto assignee;
        private UserDto creator;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TaskCreateRequest {
        @NotBlank
        private String title;
        private String description;
        private TaskPriority priority;
        private String deadline;
        private TaskStatus status;
        private Long assigneeId;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TaskUpdateRequest {
        private String title;
        private String description;
        private TaskStatus status;
        private TaskPriority priority;
        private String deadline;
        private Long assigneeId;
    }
}
