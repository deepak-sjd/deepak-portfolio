export interface NoteApiResponse {
  id: number;
  title: string;
  category: string;
  summary: string;
  content: string;
  slug: string;
  published: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8080";

/**
 * Fetch all published notes.
 */
export async function getNotes(): Promise<NoteApiResponse[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/notes`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch a single published note by slug.
 */
export async function getNoteBySlug(
  slug: string,
): Promise<NoteApiResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/notes/${encodeURIComponent(slug)}`,
    {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch note: ${response.status}`);
  }

  return response.json();
}