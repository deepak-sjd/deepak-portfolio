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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8080";

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