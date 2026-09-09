export interface EventApiResponse {
  id: number;
  title: string;
  eventDate: string; // "YYYY-MM-DD"
  startTime?: string | null; // "HH:mm:ss"
  endTime?: string | null;
  location?: string | null;
  description?: string | null;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function getEvents(): Promise<EventApiResponse[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/events`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.status}`);
  }

  return response.json();
}