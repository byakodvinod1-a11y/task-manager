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

  @Autowired TestRestTemplate rest;

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
}
