package com.project.todolist.repository;

import java.util.List;

import com.project.todolist.model.Task;

public interface TaskRepositoryCustom {
	List<Task> findTaskByProjectId(String projectId);
	long updateChecked(String id, boolean isFinished);
}
