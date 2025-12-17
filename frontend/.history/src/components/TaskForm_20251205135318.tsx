import React, { useState, useEffect } from "react";
import type { Task, TaskStatus } from "../types";


interface TaskFormProps {
  initial?: Task | null;
  onSubmit: (task: Task) => void;
  onCancel?: () => void;
}

const statusOptions: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

const emptyTask: Task = {
  title: "",
  description: "",
  status: "TODO",
  dueDate: "",
};

export const TaskForm: React.FC<TaskFormProps> = ({ initial, onSubmit, onCancel }) => {
  const [task, setTask] = useState<Task>(emptyTask);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initial) {
      setTask({
        ...initial,
        dueDate: initial.dueDate ?? "",
      });
    } else {
      setTask(emptyTask);
    }
  }, [initial]);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!task.title.trim()) e.title = "Title is required";
    if (task.title.length > 100) e.title = "Max 100 characters";
    if (task.description && task.description.length > 500)
      e.description = "Max 500 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const normalized: Task = {
      ...task,
      dueDate: task.dueDate ? task.dueDate : undefined,
    };
    onSubmit(normalized);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{initial ? "Edit Task" : "Add New Task"}</h2>

      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={task.description || ""}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          value={task.status}
          onChange={(e) =>
            setTask({ ...task, status: e.target.value as TaskStatus })
          }
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          value={task.dueDate || ""}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
      </div>

      <div className="actions">
        <button type="submit">{initial ? "Save" : "Create"}</button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
