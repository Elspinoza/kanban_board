package com.kanban.taskmanager.mapper;

import com.kanban.taskmanager.domain.entity.User;
import com.kanban.taskmanager.dto.user.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);
    User toEntity(UserDto userDto);
}
