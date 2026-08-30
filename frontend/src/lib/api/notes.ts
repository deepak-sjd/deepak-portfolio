export type ResourceType =
  | "PDF"
  | "DOCX"
  | "IMAGE"
  | "YOUTUBE"
  | "WEBSITE"
  | "OTHER";

export interface NoteResourceApiResponse {
  id: number;
  type: ResourceType;
  label: string;
  url: string;
  fileName: string | null;
  fileSize: number | null;
  sortOrder: number;
  createdAt: string;
}

export interface NoteSummaryApiResponse {
  id: number;
  title: string;
  slug: string;
  summary: string;
  displayOrder: number;
  hasChildren: boolean;
  resourceCount: number;
}

export interface NoteApiResponse {
  id: number;
  title: string;
  category: string;
  summary: string;
  content: string | null;
  slug: string;
  published: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  resources: NoteResourceApiResponse[];
  parentSlug: string | null;
  parentTitle: string | null;
  children: NoteSummaryApiResponse[];
}

export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  fieldErrors?: { field: string; message: string }[] | null;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;
    try {
      const errorBody = (await response.json()) as ApiErrorResponse;
      message = errorBody.message ?? message;
    } catch {
      // Non-JSON error response — fall back to the status-based message.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

/**
 * Top-level Field cards (Generative AI, Backend, etc.) for the main Notes page.
 */
export async function getRootNotes(): Promise<NoteSummaryApiResponse[]> {
  return request<NoteSummaryApiResponse[]>("/api/v1/notes");
}

/**
 * A single node's full detail — its own content/resources plus direct children.
 * Used for every level: Field, Topic, and leaf Subtopic pages.
 */
export async function getNoteBySlug(slug: string): Promise<NoteApiResponse> {
  return request<NoteApiResponse>(`/api/v1/notes/${encodeURIComponent(slug)}`);
}

export function resolveResourceUrl(url: string): string {
  return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
}

export function formatFileSize(bytes: number | null): string | null {
  if (bytes === null) return null;
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

// ============================================================
// ADMIN-ONLY FUNCTIONS
// ============================================================

export async function uploadNoteResource(
  noteId: number,
  file: File,
  type: "PDF" | "DOCX" | "IMAGE",
  label: string,
): Promise<NoteResourceApiResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  formData.append("label", label);

  return request<NoteResourceApiResponse>(
    `/api/v1/notes/${noteId}/resources/upload`,
    { method: "POST", body: formData },
  );
}

export async function addNoteLinkResource(
  noteId: number,
  type: "YOUTUBE" | "WEBSITE" | "OTHER",
  label: string,
  url: string,
): Promise<NoteResourceApiResponse> {
  return request<NoteResourceApiResponse>(
    `/api/v1/notes/${noteId}/resources/link`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, label, url }),
    },
  );
}

export async function deleteNoteResource(
  noteId: number,
  resourceId: number,
): Promise<void> {
  await request<void>(`/api/v1/notes/${noteId}/resources/${resourceId}`, {
    method: "DELETE",
  });
}
