package org.accenture.taskmanager;

import org.accenture.taskmanager.exception.TaskNotFoundException;
import org.accenture.taskmanager.model.Task;
import org.accenture.taskmanager.model.TaskStatus;
import org.accenture.taskmanager.repository.TaskRepository;
import org.accenture.taskmanager.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

class TaskServiceTest {

  private TaskRepository repo;
  private TaskService service;

  @BeforeEach
  void setup() {
    // Use Mockito for pure unit tests
    repo = org.mockito.Mockito.mock(TaskRepository.class);
    service = new TaskService(repo);
  }

  @Test
  void findById_throws_whenMissing() {
    org.mockito.Mockito.when(repo.findById(99L))
        .thenReturn(java.util.Optional.empty());

    assertThatThrownBy(() -> service.findById(99L))
        .isInstanceOf(TaskNotFoundException.class)
        .hasMessageContaining("99");
  }

  @Test
  void create_savesTask() {
    Task input = new Task("T1", "D", TaskStatus.TODO, null);
    Task saved = new Task("T1", "D", TaskStatus.TODO, null);
    saved.setId(1L);

    org.mockito.Mockito.when(repo.save(org.mockito.Mockito.any(Task.class)))
        .thenReturn(saved);

    Task result = service.create(input);

    assertThat(result.getId()).isEqualTo(1L);
    org.mockito.Mockito.verify(repo).save(org.mockito.Mockito.any(Task.class));
  }
}
