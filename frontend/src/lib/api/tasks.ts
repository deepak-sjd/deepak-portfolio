import { apiFetch } from "./config";

export interface TaskApiResponse {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string | null; // "YYYY-MM-DD"
  displayOrder: number;
}

export async function getTasks(): Promise<TaskApiResponse[]> {
  return apiFetch<TaskApiResponse[]>("/api/v1/tasks", { revalidate: false });
}