import { apiFetch } from "./config";

export interface EventApiResponse {
  id: number;
  title: string;
  eventDate: string; // "YYYY-MM-DD"
  startTime?: string | null; // "HH:mm:ss"
  endTime?: string | null;
  location?: string | null;
  description?: string | null;
}

export async function getEvents(): Promise<EventApiResponse[]> {
  return apiFetch<EventApiResponse[]>("/api/v1/events", { revalidate: false });
}