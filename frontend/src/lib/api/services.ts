import { apiFetch } from "./config";
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
  return apiFetch<ServiceApiResponse[]>("/api/v1/services", {
    revalidate: 300,
  });
}