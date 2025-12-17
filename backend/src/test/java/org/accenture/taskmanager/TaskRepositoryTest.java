package org.accenture.taskmanager;

import org.accenture.taskmanager.model.Task;
import org.accenture.taskmanager.model.TaskStatus;
import org.accenture.taskmanager.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class TaskRepositoryTest {

    @Autowired
    TaskRepository repo;

    @Test
    void shouldSaveAndFindTask() {
        Task t = new Task("Test task", "desc", TaskStatus.TODO, null);
        Task saved = repo.save(t);

        assertThat(saved.getId()).isNotNull();

        Task found = repo.findById(saved.getId()).orElseThrow();
        assertThat(found.getTitle()).isEqualTo("Test task");
    }
}
