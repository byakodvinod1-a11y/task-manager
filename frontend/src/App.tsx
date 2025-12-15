import { useEffect, useState } from "react";
import "./App.css";
import type { Task, TaskStatus } from "./types";

import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Task | null>(null);
  const [sortBy, setSortBy] = useState<"none" | "status" | "dueDate">("none");

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch (e: any) {
      setError(e.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreateOrUpdate = async (task: Task) => {
    try {
      setError(null);
      if (editing && editing.id != null) {
        const updated = await updateTask(editing.id, { ...editing, ...task });
        setTasks((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t))
        );
      } else {
        const created = await createTask(task);
        setTasks((prev) => [...prev, created]);
      }
      setEditing(null);
    } catch (e: any) {
      setError(e.message || "Operation failed");
    }
  };

  const handleDelete = async (task: Task) => {
    if (!task.id) return;
    if (!confirm(`Delete task "${task.title}"?`)) return;
    try {
      setError(null);
      await deleteTask(task.id);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    } catch (e: any) {
      setError(e.message || "Failed to delete task");
    }
  };

  const handleStatusChange = async (task: Task, status: TaskStatus) => {
    if (!task.id) return;
    try {
      const updated = await updateTask(task.id, { ...task, status });
      setTasks((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
    } catch (e: any) {
      setError(e.message || "Failed to update status");
    }
  };

  const sortedTasks = (() => {
    const copy = [...tasks];
    if (sortBy === "status") {
      const order: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];
      copy.sort(
        (a, b) => order.indexOf(a.status) - order.indexOf(b.status)
      );
    } else if (sortBy === "dueDate") {
        copy.sort((a, b) => {
          const da = a.dueDate ? new Date(a.dueDate) : null;
          const db = b.dueDate ? new Date(b.dueDate) : null;

          if (!da && !db) return 0;
          if (!da) return 1;
          if (!db) return -1;

          return da.getTime() - db.getTime(); // <-- proper numeric comparison
        });
      }

    return copy;
  })();

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
              onChange={(e) => setSortBy(e.target.value as any)}
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

export default App;
