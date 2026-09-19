import { apiFetch } from "./config";

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
  return apiFetch<ResumeApiResponse>("/api/v1/resume", { revalidate: 300 });
}