package com.project.todolist.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.mongodb.client.result.UpdateResult;
import com.project.todolist.model.Task;
import com.project.todolist.repository.TaskRepositoryCustom;

@Repository
public class TaskRepositoryImpl implements TaskRepositoryCustom {
	
	@Autowired
	MongoTemplate mongoTemplate;

	@Override
	public List<Task> findTaskByProjectId(String projectId) {
		Query query = new Query(Criteria.where("projectId").is(projectId));
		
		return (List<Task>) mongoTemplate.find(query, Task.class);
	}

	@Override
	public long updateChecked(String id, boolean isFinished) {
		Query query = new Query(Criteria.where("id").is(id));
		Update update = new Update();
		update.set("isFinished", isFinished);
		
		UpdateResult result = mongoTemplate.updateFirst(query, update, Task.class);
		
		if(result != null) {
			return result.getModifiedCount();
		} else {
			return 0;
		}
	}

}
