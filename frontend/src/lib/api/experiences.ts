import { apiFetch } from "./config";

export interface ExperienceApiResponse {
  id: number;
  company: string;
  role: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  displayOrder: number;
  cgpa: string | null;
}

export async function getExperiences(): Promise<ExperienceApiResponse[]> {
  return apiFetch<ExperienceApiResponse[]>("/api/v1/experiences", {
    revalidate: 300,
  });
}