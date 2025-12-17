import React from "react";
import type { Task, TaskStatus } from "../types";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (task: Task, status: TaskStatus) => void;
}

/**
 * Task list is “dumb UI”:
 * it delegates all mutations to the parent via callbacks.
 */
export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <h2>Tasks</h2>
        <p>No tasks yet.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Tasks</h2>

      <table>
        <thead>
          <tr>
            <th style={{ width: "18%" }}>Title</th>
            <th>Description</th>
            <th style={{ width: "16%" }}>Status</th>
            <th style={{ width: "14%" }}>Due date</th>
            <th style={{ width: "18%" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr key={t.id ?? t.title}>
              <td>{t.title}</td>
              <td>{t.description ?? "-"}</td>

              <td>
                <select
                  value={t.status}
                  onChange={(e) => onStatusChange(t, e.target.value as TaskStatus)}
                  aria-label={`Change status for ${t.title}`}
                >
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </td>

              <td>{t.dueDate ? t.dueDate : "-"}</td>

              <td>
                <div className="action-buttons">
                  <button type="button" onClick={() => onEdit(t)}>
                    Edit
                  </button>

                  <button
                    type="button"
                    className="danger"
                    onClick={() => onDelete(t)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
