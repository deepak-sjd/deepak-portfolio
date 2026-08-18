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
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8080";

export async function getServices(): Promise<ServiceApiResponse[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/services`,
    {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch services: ${response.status}`,
    );
  }

  return response.json();
}