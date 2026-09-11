import { API_BASE_URL } from "./config";

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

export async function getExperiences(): Promise<
  ExperienceApiResponse[]
> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/experiences`,
    {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch experiences: ${response.status}`,
    );
  }

  return response.json();
}
