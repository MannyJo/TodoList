package com.project.todolist.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.project.todolist.model.Project;

public interface ProjectRepository extends MongoRepository<Project, Object> {}