import { apiFetch } from "./config";

export interface ProjectApiResponse {
  id: number;
  title: string;
  description: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  videoUrl: string | null;
  featured: boolean;
  displayOrder: number;
}

interface ProjectApiPage {
  content: ProjectApiResponse[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export async function getProjects(): Promise<ProjectApiResponse[]> {
  const data = await apiFetch<ProjectApiPage>("/api/v1/projects", {
    revalidate: 300,
  });
  return data.content;
}