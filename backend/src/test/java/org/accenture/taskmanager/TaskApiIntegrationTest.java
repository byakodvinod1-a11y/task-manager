package org.accenture.taskmanager;

import org.accenture.taskmanager.model.Task;
import org.accenture.taskmanager.model.TaskStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TaskApiIntegrationTest {

    @Autowired
    TestRestTemplate rest;

    @Test
    void canCreateAndFetchTask() {
        Task t = new Task("Integration", "desc", TaskStatus.TODO, null);

        ResponseEntity<Task> created = rest.postForEntity("/api/tasks", t, Task.class);
        assertThat(created.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(created.getBody()).isNotNull();
        assertThat(created.getBody().getId()).isNotNull();

        Long id = created.getBody().getId();
        ResponseEntity<Task> fetched = rest.getForEntity("/api/tasks/" + id, Task.class);

        assertThat(fetched.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(fetched.getBody()).isNotNull();
        assertThat(fetched.getBody().getTitle()).isEqualTo("Integration");
    }

    @Test
    void canFetchAll_update_andDeleteTask() {
        // create
        Task t = new Task("Integration2", "desc", TaskStatus.TODO, null);
        Task created = rest.postForEntity("/api/tasks", t, Task.class).getBody();
        assertThat(created).isNotNull();
        assertThat(created.getId()).isNotNull();

        Long id = created.getId();

        // fetch all
        ResponseEntity<Task[]> all = rest.getForEntity("/api/tasks", Task[].class);
        assertThat(all.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(all.getBody()).isNotNull();
        assertThat(java.util.Arrays.stream(all.getBody()).anyMatch(x -> x.getId().equals(id))).isTrue();

        // update
        Task updatePayload = new Task("Integration2-updated", "desc2", TaskStatus.DONE, null);
        HttpEntity<Task> req = new HttpEntity<>(updatePayload);
        ResponseEntity<Task> updated = rest.exchange("/api/tasks/" + id, HttpMethod.PUT, req, Task.class);

        assertThat(updated.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(updated.getBody()).isNotNull();
        assertThat(updated.getBody().getTitle()).isEqualTo("Integration2-updated");
        assertThat(updated.getBody().getStatus()).isEqualTo(TaskStatus.DONE);

        // delete
        ResponseEntity<Void> deleted = rest.exchange("/api/tasks/" + id, HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);
        assertThat(deleted.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);

        // confirm gone
        ResponseEntity<String> afterDelete = rest.getForEntity("/api/tasks/" + id, String.class);
        assertThat(afterDelete.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

}
