/**
 * Shared frontend types for Tasks and API error responses.
 * Keep this file "types only" (no console logs) to avoid lint/build noise.
 */

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: TaskStatus;

  /**
   * HTML <input type="date"> uses "YYYY-MM-DD".
   * Backend can accept null/omitted; frontend treats empty as undefined.
   */
  dueDate?: string; // "yyyy-MM-dd"
}

/**
 * Standard error shape we try to read from backend responses.
 * You can extend this if your backend returns field-level validation errors.
 */
export interface ApiError {
  message: string;
  errors?: Record<string, string>;
}

/**
 * Optional: only keep this if you previously had a build issue where Vite/TS
 * treated the module as empty. Normally this is NOT needed.
 */
// export const __keepTypes = true;
