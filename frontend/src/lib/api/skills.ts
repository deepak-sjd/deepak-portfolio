import { API_BASE_URL } from "./config";

export interface SkillApiResponse {
  id: number;
  name: string;
  category: string;
  displayOrder: number;
  description?: string | null;
}

export async function getSkills(): Promise<SkillApiResponse[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/skills`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch skills: ${response.status}`);
  }

  return response.json();
}
