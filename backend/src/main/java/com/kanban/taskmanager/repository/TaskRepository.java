package com.kanban.taskmanager.repository;

import com.kanban.taskmanager.domain.entity.Task;
import com.kanban.taskmanager.domain.enums.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // Pour afficher toutes les tâches d'un board Kanban spécifiques à un utilisateur ou projet
    List<Task> findByAssigneeId(Long assigneeId);
    
    // Fetch filter paginé
    @Query("SELECT t FROM Task t WHERE " +
           "(:status IS NULL OR t.status = :status) AND " +
           "(:assigneeId IS NULL OR t.assignee.id = :assigneeId) AND " +
           "(:search IS NULL OR LOWER(CAST(t.title AS String)) LIKE LOWER(CONCAT('%', CAST(:search AS String), '%')) OR LOWER(CAST(t.description AS String)) LIKE LOWER(CONCAT('%', CAST(:search AS String), '%')))")
    Page<Task> findTasksWithFilters(@Param("status") TaskStatus status, 
                                    @Param("assigneeId") Long assigneeId, 
                                    @Param("search") String search, 
                                    Pageable pageable);
}
