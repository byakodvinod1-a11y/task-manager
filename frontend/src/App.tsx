import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

import type { Task, TaskStatus } from "./types";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api";

/**
 * Sort options kept as a strict union (avoids `as any`).
 */
type SortBy = "none" | "status" | "dueDate";

export default function App() {
  // Data
  const [tasks, setTasks] = useState<Task[]>([]);

  // UI state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Editing state
  const [editing, setEditing] = useState<Task | null>(null);

  // Sorting state
  const [sortBy, setSortBy] = useState<SortBy>("none");

  /**
   * Load tasks from backend.
   * useCallback avoids re-creating the function unnecessarily.
   */
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to load tasks";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Initial fetch (component mount).
   */
  useEffect(() => {
    void load();
  }, [load]);

  /**
   * Create or update based on `editing`.
   * TaskForm already trims/normalizes values; we still guard here.
   */
  const handleCreateOrUpdate = async (task: Task) => {
    try {
      setError(null);

      if (editing?.id != null) {
        // Update existing task
        const updated = await updateTask(editing.id, { ...editing, ...task });
        setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      } else {
        // Create new task
        const created = await createTask(task);
        setTasks((prev) => [...prev, created]);
      }

      // Reset edit mode after success
      setEditing(null);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Operation failed";
      setError(message);
    }
  };

  /**
   * Delete flow with confirmation.
   */
  const handleDelete = async (task: Task) => {
    if (!task.id) return;

    const ok = window.confirm(`Delete task "${task.title}"?`);
    if (!ok) return;

    try {
      setError(null);
      await deleteTask(task.id);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to delete task";
      setError(message);
    }
  };

  /**
   * Inline status update from TaskList.
   */
  const handleStatusChange = async (task: Task, status: TaskStatus) => {
    if (!task.id) return;

    try {
      setError(null);
      const updated = await updateTask(task.id, { ...task, status });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update status";
      setError(message);
    }
  };

  /**
   * Sorting logic: memoized to avoid re-sorting on every render.
   */
  const sortedTasks = useMemo(() => {
    const copy = [...tasks];

    if (sortBy === "status") {
      const order: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];
      copy.sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));
      return copy;
    }

    if (sortBy === "dueDate") {
      copy.sort((a, b) => {
        // dueDate is yyyy-MM-dd or undefined
        const da = a.dueDate ? new Date(a.dueDate) : null;
        const db = b.dueDate ? new Date(b.dueDate) : null;

        if (!da && !db) return 0;
        if (!da) return 1;  // tasks without due date go to bottom
        if (!db) return -1;

        return da.getTime() - db.getTime();
      });
      return copy;
    }

    return copy;
  }, [tasks, sortBy]);

  /**
   * Keep select handling typed (no `as any`).
   */
  const handleSortChange = (value: string) => {
    const allowed: SortBy[] = ["none", "status", "dueDate"];
    setSortBy(allowed.includes(value as SortBy) ? (value as SortBy) : "none");
  };

  return (
    <div className="page-container">
      <div className="App">
        <header>
          <h1>Task Manager</h1>
        </header>

        {error && <div className="error-banner">{error}</div>}

        <div className="layout">
          <div className="left">
            <TaskForm
              initial={editing}
              onSubmit={handleCreateOrUpdate}
              onCancel={() => setEditing(null)}
            />
          </div>

          <div className="right">
            <div className="toolbar">
              <span>Sort by: </span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="none">None</option>
                <option value="status">Status</option>
                <option value="dueDate">Due date</option>
              </select>

              <button onClick={load} disabled={loading}>
                Refresh
              </button>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <TaskList
                tasks={sortedTasks}
                onEdit={(t) => setEditing(t)}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
