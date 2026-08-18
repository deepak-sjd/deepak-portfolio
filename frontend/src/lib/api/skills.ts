export interface SkillApiResponse {
  id: number;
  name: string;
  category: string;
  displayOrder: number;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

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