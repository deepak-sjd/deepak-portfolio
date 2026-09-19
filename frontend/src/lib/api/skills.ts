import { apiFetch } from "./config";

export interface SkillApiResponse {
  id: number;
  name: string;
  category: string;
  displayOrder: number;
  description?: string | null;
}

export async function getSkills(): Promise<SkillApiResponse[]> {
  return apiFetch<SkillApiResponse[]>("/api/v1/skills", { revalidate: 300 });
}