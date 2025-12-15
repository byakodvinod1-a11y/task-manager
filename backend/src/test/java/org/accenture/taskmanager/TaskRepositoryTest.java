package org.accenture.taskmanager;

import org.accenture.taskmanager.model.Task;
import org.accenture.taskmanager.model.TaskStatus;
import org.accenture.taskmanager.repository.TaskRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class TaskRepositoryTest {

    @Autowired
    TaskRepository repo;

    @Test
    void shouldSaveAndFindTask() {
        Task t = new Task("Test task", "desc", TaskStatus.TODO, null);
        Task saved = repo.save(t);
        Assertions.assertThat(saved.getId()).isNotNull();

        Task found = repo.findById(saved.getId()).orElseThrow();
        Assertions.assertThat(found.getTitle()).isEqualTo("Test task");
    }
}
