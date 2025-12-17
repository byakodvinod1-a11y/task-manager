import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskForm } from "./TaskForm";
import type { Task } from "../types";
import { vi } from "vitest";

describe("TaskForm", () => {
  test("shows validation error when title is empty", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<TaskForm initial={null} onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: /create/i }));

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("calls onSubmit with normalized dueDate (undefined when empty)", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<TaskForm initial={null} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/title/i), "My Task");
    await user.type(screen.getByLabelText(/description/i), "Desc");

    await user.click(screen.getByRole("button", { name: /create/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);

    const submitted: Task = onSubmit.mock.calls[0][0];
    expect(submitted.title).toBe("My Task");
    // dueDate should be undefined when user leaves it blank
    expect(submitted.dueDate).toBeUndefined();
  });
});
