/**
 * Single source of truth for the backend API's base URL.
 *
 * Falls back to localhost for local development. In every other
 * environment, set NEXT_PUBLIC_API_BASE_URL to the deployed backend's
 * real URL (e.g. https://api.deepakkumar.dev) — every function in
 * lib/api reads it from here instead of declaring its own copy.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";