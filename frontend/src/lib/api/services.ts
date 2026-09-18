import { API_BASE_URL } from "./config";
import type { ProjectApiResponse } from "./projects";

export interface ServiceApiResponse {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  technologies: string;
  icon: string | null;
  displayOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  relatedProjects: ProjectApiResponse[];
}



export async function getServices(): Promise<ServiceApiResponse[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/services`,
    {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch services: ${response.status}`,
    );
  }

  return response.json();
}