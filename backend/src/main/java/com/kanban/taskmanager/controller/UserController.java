package com.kanban.taskmanager.controller;

import com.kanban.taskmanager.domain.entity.User;
import com.kanban.taskmanager.dto.user.UserSummaryDto;
import com.kanban.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<UserSummaryDto>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll().stream()
                .map(u -> new UserSummaryDto(u.getId(), u.getFirstName(), u.getLastName(), u.getEmail(), u.getRole().name()))
                .collect(Collectors.toList()));
    }
}
