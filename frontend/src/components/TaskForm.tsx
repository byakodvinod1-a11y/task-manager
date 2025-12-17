import React, { useEffect, useMemo, useState } from "react";
import type { Task, TaskStatus } from "../types";

interface TaskFormProps {
  /** When provided, form acts in edit mode */
  initial?: Task | null;
  /** Parent decides whether to create or update */
  onSubmit: (task: Task) => void;
  onCancel?: () => void;
}

const statusOptions: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

/**
 * Important: keep dueDate as undefined for "no date"
 * and only convert to "" for the input value binding.
 */
const emptyTask: Task = {
  title: "",
  description: "",
  status: "TODO",
  dueDate: undefined,
};

export const TaskForm: React.FC<TaskFormProps> = ({ initial, onSubmit, onCancel }) => {
  const [task, setTask] = useState<Task>(emptyTask);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = useMemo(() => Boolean(initial?.id), [initial]);

  useEffect(() => {
    if (initial) {
      setTask({
        ...initial,
        dueDate: initial.dueDate ?? undefined,
      });
    } else {
      setTask(emptyTask);
    }
    setErrors({});
  }, [initial]);

  const validate = (): boolean => {
    const e: Record<string, string> = {};

    const title = task.title.trim();
    if (!title) e.title = "Title is required";
    else if (title.length > 100) e.title = "Max 100 characters";

    if (task.description && task.description.length > 500) {
      e.description = "Max 500 characters";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    /**
     * Normalize data before sending to parent:
     * - trim title
     * - convert empty dueDate to undefined (not "")
     */
    const normalized: Task = {
      ...task,
      title: task.title.trim(),
      dueDate: task.dueDate ? task.dueDate : undefined,
    };

    onSubmit(normalized);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{isEdit ? "Edit Task" : "Add New Task"}</h2>

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          aria-invalid={Boolean(errors.title)}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="desc">Description</label>
        <textarea
          id="desc"
          value={task.description ?? ""}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          aria-invalid={Boolean(errors.description)}
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value as TaskStatus })}
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={task.dueDate ?? ""} // date input wants "" when empty
          onChange={(e) =>
            setTask({ ...task, dueDate: e.target.value ? e.target.value : undefined })
          }
        />
      </div>

      <div className="actions">
        <button type="submit">{isEdit ? "Save" : "Create"}</button>

        {onCancel && (
          <button type="button" onClick={onCancel} className="secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
