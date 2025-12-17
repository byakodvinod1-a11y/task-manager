package org.accenture.taskmanager;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.accenture.taskmanager.controller.TaskController;
import org.accenture.taskmanager.exception.TaskNotFoundException;
import org.accenture.taskmanager.model.Task;
import org.accenture.taskmanager.model.TaskStatus;
import org.accenture.taskmanager.service.TaskService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = TaskController.class)
class TaskControllerTest {

  @Autowired MockMvc mvc;
  @Autowired ObjectMapper om;

  @MockBean TaskService service;

  @Test
  void getAll_returns200_andArray() throws Exception {
    when(service.findAll()).thenReturn(List.of());

    mvc.perform(get("/api/tasks"))
            .andExpect(status().isOk())
            .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
  }

  @Test
  void create_returns200_or201_andValidates() throws Exception {
    Task invalid = new Task(null, "desc", TaskStatus.TODO, null);

    mvc.perform(post("/api/tasks")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsString(invalid)))
            .andExpect(status().isBadRequest());
  }

  @Test
  void getById_returns404_whenMissing() throws Exception {
    when(service.findById(123L)).thenThrow(new TaskNotFoundException(123L));

    mvc.perform(get("/api/tasks/123"))
            .andExpect(status().isNotFound());
  }

  @Test
  void delete_returns204() throws Exception {
    doNothing().when(service).delete(5L);

    mvc.perform(delete("/api/tasks/5"))
            .andExpect(status().isNoContent());

    verify(service).delete(5L);
  }
}
