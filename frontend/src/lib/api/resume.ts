import { API_BASE_URL } from "./config";

export interface ResumeApiResponse {
  id: number;
  title: string;
  fileUrl: string;
  version: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getActiveResume(): Promise<ResumeApiResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/resume`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch resume: ${response.status}`
    );
  }

  return response.json();
}
