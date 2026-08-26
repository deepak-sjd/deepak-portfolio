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
  resources: NoteResourceApiResponse[];
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

/**
 * Wraps fetch, parses backend's uniform error shape, and throws a
 * readable Error so callers don't each need to re-implement this.
 */
async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
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
      // Response wasn't JSON (e.g. network/proxy error) — fall back to status text.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

/**
 * Fetch all published notes.
 */
export async function getNotes(): Promise<NoteApiResponse[]> {
  return request<NoteApiResponse[]>("/api/v1/notes");
}

/**
 * Fetch a single published note by slug.
 */
export async function getNoteBySlug(
  slug: string,
): Promise<NoteApiResponse> {
  return request<NoteApiResponse>(
    `/api/v1/notes/${encodeURIComponent(slug)}`,
  );
}

/**
 * Resolves a resource's URL to an absolute URL. Uploaded files come back
 * as relative paths (e.g. "/files/notes/xyz.pdf"); external links
 * (YouTube/website) already come back absolute.
 */
export function resolveResourceUrl(url: string): string {
  return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
}

/**
 * Human-readable file size, e.g. "2.4 MB". Returns null for links
 * that have no fileSize (YouTube/website).
 */
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
// (Call these from an authenticated admin panel, not public pages.)
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
  await request<void>(
    `/api/v1/notes/${noteId}/resources/${resourceId}`,
    { method: "DELETE" },
  );
}
