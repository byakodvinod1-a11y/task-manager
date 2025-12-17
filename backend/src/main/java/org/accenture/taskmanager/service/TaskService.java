package org.accenture.taskmanager.service;

import org.accenture.taskmanager.model.Task;
import org.accenture.taskmanager.repository.TaskRepository;
import org.accenture.taskmanager.exception.TaskNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

  private final TaskRepository repository;

  public TaskService(TaskRepository repository) {
    this.repository = repository;
  }

  public List<Task> findAll() {
    return repository.findAll();
  }

  public Task findById(Long id) {
    return repository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
  }

  public Task create(Task task) {
    // keep it simple for now; business rules can grow here
    return repository.save(task);
  }

  public Task update(Long id, Task updated) {
    Task existing = findById(id);
    existing.setTitle(updated.getTitle());
    existing.setDescription(updated.getDescription());
    existing.setStatus(updated.getStatus());
    existing.setDueDate(updated.getDueDate());
    return repository.save(existing);
  }

  public void delete(Long id) {
    if (!repository.existsById(id)) throw new TaskNotFoundException(id);
    repository.deleteById(id);
  }
}
