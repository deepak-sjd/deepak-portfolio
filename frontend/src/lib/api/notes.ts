import { apiFetch, resolveFileUrl } from "./config";

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

/**
 * Top-level Field cards (Generative AI, Backend, etc.) for the main Notes page.
 */
export async function getRootNotes(): Promise<NoteSummaryApiResponse[]> {
  return apiFetch<NoteSummaryApiResponse[]>("/api/v1/notes", {
    revalidate: 300,
  });
}

/**
 * A single node's full detail — its own content/resources plus direct children.
 * Used for every level: Field, Topic, and leaf Subtopic pages.
 */
export async function getNoteBySlug(slug: string): Promise<NoteApiResponse> {
  return apiFetch<NoteApiResponse>(
    `/api/v1/notes/${encodeURIComponent(slug)}`,
    { revalidate: 300 },
  );
}

/** Resolves a resource's (possibly relative) URL to an absolute one. */
export const resolveResourceUrl = resolveFileUrl;

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

  return apiFetch<NoteResourceApiResponse>(
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
  return apiFetch<NoteResourceApiResponse>(
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
  await apiFetch<void>(`/api/v1/notes/${noteId}/resources/${resourceId}`, {
    method: "DELETE",
  });
}