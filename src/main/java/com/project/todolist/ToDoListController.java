package com.project.todolist;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.project.todolist.model.Project;
import com.project.todolist.model.Task;
import com.project.todolist.repository.ProjectRepository;
import com.project.todolist.repository.TaskRepository;

@RestController
public class ToDoListController {
	
	@Autowired
	ProjectRepository projectRepository;
	
	@Autowired
	TaskRepository taskRepository;
	
	@RequestMapping("/project")
	public List<Project> project() {
		return (List<Project>) projectRepository.findAll();
	}
	
	@RequestMapping(value="/project/create", method=RequestMethod.POST)
	public Project createProject(@RequestBody Project project) {
		return projectRepository.save(project);
	}
	
	@RequestMapping(value="/project/delete/{id}", method=RequestMethod.DELETE)
	public void deleteProject(@PathVariable String id) {
		projectRepository.deleteById(id);
	}
	
	@RequestMapping("/task/{projectId}")
	public List<Task> task(@PathVariable String projectId){
		return (List<Task>) taskRepository.findTaskByProjectId(projectId);
	}

	@RequestMapping(value="/task/create", method=RequestMethod.POST)
	public Task createTask(@RequestBody Task task) {
		return taskRepository.save(task);
	}

	@RequestMapping(value="/task/update", method=RequestMethod.PUT)
	public long updateTask(@RequestBody Task task) {
		return taskRepository.updateChecked(task.getId(), task.getIsFinished());
	}

}
