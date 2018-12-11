package com.project.todolist.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.project.todolist.model.Task;

@Repository
public interface TaskRepository extends MongoRepository<Task, Object>, TaskRepositoryCustom {}
