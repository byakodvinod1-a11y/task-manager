console.log("ACTUAL types.ts LOADED");

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string | null; // ISO date string (yyyy-MM-dd)
}

export interface ApiError {
  message: string;
  errors?: Record<string, string>;
}

// 👇 ADD THIS LINE — forces Vite to treat the module as non-empty
export const __keepTypes = true;
