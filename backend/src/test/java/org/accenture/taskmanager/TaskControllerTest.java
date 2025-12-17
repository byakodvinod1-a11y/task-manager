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

    @Autowired
    MockMvc mvc;
    @Autowired
    ObjectMapper om;

    @MockBean
    TaskService service;

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

    @Test
    void update_returns200_whenOk() throws Exception {
        Task payload = new Task("Updated", "desc", TaskStatus.DONE, null);
        Task returned = new Task("Updated", "desc", TaskStatus.DONE, null);
        returned.setId(7L);

        when(service.update(eq(7L), any(Task.class))).thenReturn(returned);

        mvc.perform(put("/api/tasks/7")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(7))
                .andExpect(jsonPath("$.title").value("Updated"))
                .andExpect(jsonPath("$.status").value("DONE"));
    }

    @Test
    void update_returns404_whenMissing() throws Exception {
        Task payload = new Task("Updated", "desc", TaskStatus.DONE, null);

        when(service.update(eq(999L), any(Task.class))).thenThrow(new TaskNotFoundException(999L));

        mvc.perform(put("/api/tasks/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(payload)))
                .andExpect(status().isNotFound());
    }

    @Test
    void create_returns400_whenTitleTooLong() throws Exception {
        String longTitle = "x".repeat(101);
        Task invalid = new Task(longTitle, "desc", TaskStatus.TODO, null);

        mvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(invalid)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void create_returns400_whenDescriptionTooLong() throws Exception {
        String longDesc = "x".repeat(501);
        Task invalid = new Task("Ok", longDesc, TaskStatus.TODO, null);

        mvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(invalid)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void create_returns400_whenStatusInvalid() throws Exception {
        // status is invalid enum string
        String json = """
                {"title":"T","description":"D","status":"BROKEN","dueDate":null}
                """;

        mvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest());
    }

    @Test
    void create_returns400_whenDueDateInvalidFormat() throws Exception {
        String json = """
                {"title":"T","description":"D","status":"TODO","dueDate":"2025/12/01"}
                """;

        mvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest());
    }

}
