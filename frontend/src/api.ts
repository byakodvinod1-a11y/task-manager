import type { Task } from "./types";

/**
 * Keep the API base URL configurable for deployments.
 * For local dev, it falls back to Spring Boot default.
 */
const BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:8080";

/** API endpoints */
const TASKS_URL = `${BASE_URL}/api/tasks`;

/**
 * Small helper: read JSON safely (some error responses may not be JSON).
 */
async function safeJson<T>(res: Response): Promise<T | null> {
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(TASKS_URL);

  if (!res.ok) {
    throw new Error("Failed to load tasks");
  }

  return res.json();
}

export async function createTask(task: Task): Promise<Task> {
  /**
   * For POST we must not send an id (backend should generate it).
   * Also normalize empty dueDate => undefined (not empty string).
   */
  const payload: Omit<Task, "id"> = {
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate ? task.dueDate : undefined,
  };

  const res = await fetch(TASKS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await safeJson<{ message?: string }>(res);
    throw new Error(data?.message || "Failed to create task");
  }

  return res.json();
}

export async function updateTask(id: number, task: Task): Promise<Task> {
  /**
   * PUT updates an existing task.
   * We keep payload explicit to avoid accidentally sending unexpected fields.
   */
  const payload: Task = {
    id,
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate ? task.dueDate : undefined,
  };

  const res = await fetch(`${TASKS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await safeJson<{ message?: string }>(res);
    throw new Error(data?.message || "Failed to update task");
  }

  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${TASKS_URL}/${id}`, { method: "DELETE" });

  if (!res.ok) {
    throw new Error("Failed to delete task");
  }
}
