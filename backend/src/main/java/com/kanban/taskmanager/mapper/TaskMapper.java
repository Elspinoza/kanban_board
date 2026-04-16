package com.kanban.taskmanager.mapper;

import com.kanban.taskmanager.domain.entity.Task;
import com.kanban.taskmanager.dto.task.TaskDtos.TaskDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface TaskMapper {

    @Mapping(target = "assignee", source = "assignee")
    @Mapping(target = "creator", source = "creator")
    TaskDto toDto(Task task);

}
