import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskList } from "./TaskList";
import type { Task } from "../types";
import { vi } from "vitest";

describe("TaskList", () => {
  test("renders tasks and triggers Edit/Delete callbacks", async () => {
    const user = userEvent.setup();

    const tasks: Task[] = [
      { id: 1, title: "T1", description: "D1", status: "TODO", dueDate: "2025-12-31" },
    ];

    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onStatusChange = vi.fn();

    render(
      <TaskList
        tasks={tasks}
        onEdit={onEdit}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />
    );

    expect(screen.getByText("T1")).toBeInTheDocument();
    expect(screen.getByText("D1")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(tasks[0]);

    await user.click(screen.getByRole("button", { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(tasks[0]);
  });

  test("calls onStatusChange when status dropdown changes", async () => {
    const user = userEvent.setup();

    const tasks: Task[] = [
      { id: 2, title: "T2", description: "D2", status: "TODO", dueDate: null },
    ];

    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onStatusChange = vi.fn();

    render(
      <TaskList
        tasks={tasks}
        onEdit={onEdit}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />
    );

    const statusSelect = screen.getByDisplayValue("TODO");
    await user.selectOptions(statusSelect, "DONE");

    expect(onStatusChange).toHaveBeenCalledTimes(1);
    expect(onStatusChange).toHaveBeenCalledWith(tasks[0], "DONE");
  });
});
