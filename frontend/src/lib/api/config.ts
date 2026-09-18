/**
 * Single source of truth for talking to the backend API.
 *
 * `API_BASE_URL` falls back to localhost for local development. In every
 * other environment, set NEXT_PUBLIC_API_BASE_URL to the deployed backend's
 * real URL (e.g. https://api.deepakkumar.dev).
 *
 * `apiFetch` is the one place every domain module (projects, skills,
 * experiences, ...) should go through instead of calling `fetch` directly.
 * It centralizes:
 *  - prefixing the base URL and setting the Accept header
 *  - Next.js caching (`revalidate` seconds, or `false` for no-store)
 *  - reading the backend's real error message (from GlobalExceptionHandler's
 *    ErrorResponse) instead of a generic "request failed" string
 *  - the 204 No Content case, which has no JSON body to parse
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  fieldErrors?: { field: string; message: string }[] | null;
}

interface ApiFetchOptions extends Omit<RequestInit, "cache"> {
  /** Seconds to cache for (Next.js `next.revalidate`), or `false` for no-store. */
  revalidate?: number | false;
}

export async function apiFetch<T>(
  path: string,
  { revalidate, headers, ...init }: ApiFetchOptions = {},
): Promise<T> {
  const cachingInit: RequestInit =
    revalidate === false
      ? { cache: "no-store" }
      : revalidate !== undefined
        ? { next: { revalidate } }
        : {};

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    ...cachingInit,
    headers: {
      Accept: "application/json",
      ...headers,
    },
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

/** Resolves a possibly-relative backend URL (e.g. `/files/...`) to an absolute one. */
export function resolveFileUrl(url: string): string {
  return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
}