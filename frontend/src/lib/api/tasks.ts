import { API_BASE_URL } from "./config";

export interface TaskApiResponse {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string | null; // "YYYY-MM-DD"
  displayOrder: number;
}

export async function getTasks(): Promise<TaskApiResponse[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/tasks`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.status}`);
  }

  return response.json();
}
