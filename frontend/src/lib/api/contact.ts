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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8080";

export async function submitContactMessage(
  request: ContactMessageRequest,
): Promise<ContactMessageResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/contact`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    },
  );

  if (!response.ok) {
    let errorMessage = `Failed to send contact message: ${response.status}`;

    try {
      const errorBody = await response.json();

      if (errorBody?.message) {
        errorMessage = errorBody.message;
      }
    } catch {
      // Keep the default error message.
    }

    throw new Error(errorMessage);
  }

  return response.json();
}