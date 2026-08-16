export interface ProjectApiResponse {
  id: number;
  title: string;
  description: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function getProjects(): Promise<ProjectApiResponse[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/projects`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.status}`);
  }

  const data: ProjectApiPage = await response.json();

  return data.content;
}