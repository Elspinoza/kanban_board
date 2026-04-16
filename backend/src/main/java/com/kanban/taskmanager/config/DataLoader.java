package com.kanban.taskmanager.config;

import com.kanban.taskmanager.domain.entity.Task;
import com.kanban.taskmanager.domain.entity.User;
import com.kanban.taskmanager.domain.enums.Role;
import com.kanban.taskmanager.domain.enums.TaskPriority;
import com.kanban.taskmanager.domain.enums.TaskStatus;
import com.kanban.taskmanager.repository.TaskRepository;
import com.kanban.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            String defaultPassword = passwordEncoder.encode("password123");

            User admin = User.builder()
                    .firstName("Super")
                    .lastName("Admin")
                    .email("admin@kanban.com")
                    .password(defaultPassword)
                    .role(Role.ADMIN)
                    .build();

            User productOwner = User.builder()
                    .firstName("Anna")
                    .lastName("Owner")
                    .email("po@kanban.com")
                    .password(defaultPassword)
                    .role(Role.PRODUCT_OWNER)
                    .build();

            User scrumMaster = User.builder()
                    .firstName("Scrum")
                    .lastName("Master")
                    .email("sm@kanban.com")
                    .password(defaultPassword)
                    .role(Role.SCRUM_MASTER)
                    .build();

            User developer1 = User.builder()
                    .firstName("John")
                    .lastName("Doe")
                    .email("dev1@kanban.com")
                    .password(defaultPassword)
                    .role(Role.DEVELOPER)
                    .build();

            userRepository.save(admin);
            userRepository.save(productOwner);
            userRepository.save(scrumMaster);
            userRepository.save(developer1);

            Task task1 = Task.builder()
                    .title("Setup Backend Architecture")
                    .description("Initialize Spring Boot project with PostgreSQL and JWT")
                    .status(TaskStatus.DONE)
                    .priority(TaskPriority.HIGH)
                    .deadline(LocalDateTime.now().plusDays(1))
                    .creator(admin)
                    .assignee(developer1)
                    .build();

            Task task2 = Task.builder()
                    .title("Create Kanban Dashboard Frontend")
                    .description("Develop Drag and Drop UI in Angular")
                    .status(TaskStatus.IN_PROGRESS)
                    .priority(TaskPriority.URGENT)
                    .deadline(LocalDateTime.now().plusDays(3))
                    .creator(productOwner)
                    .assignee(developer1)
                    .build();

            Task task3 = Task.builder()
                    .title("Refine Backlog and Stories")
                    .description("Write user stories for next sprint")
                    .status(TaskStatus.TODO)
                    .priority(TaskPriority.MEDIUM)
                    .deadline(LocalDateTime.now().plusDays(5))
                    .creator(productOwner)
                    .assignee(productOwner)
                    .build();

            taskRepository.save(task1);
            taskRepository.save(task2);
            taskRepository.save(task3);

            System.out.println("✅ Data initialized successfully! Users: admin@kanban.com, po@kanban.com, sm@kanban.com, dev1@kanban.com (pw: password123)");
        }
    }
}
