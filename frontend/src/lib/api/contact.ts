import { apiFetch } from "./config";

export interface ContactMessageRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessageResponse {
  id: number;
  name: string;
  subject: string;
  message: string;
  createdAt: string;
}

export async function submitContactMessage(
  request: ContactMessageRequest,
): Promise<ContactMessageResponse> {
  return apiFetch<ContactMessageResponse>("/api/v1/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
}