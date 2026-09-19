import type { NextConfig } from "next";

const backendUrl = new URL(process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080");
const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: backendUrl.protocol.replace(":", "") as "http" | "https",
        hostname: backendUrl.hostname,
        ...(backendUrl.port ? { port: backendUrl.port } : {}),
      },
    ],
    // Only relaxed for local dev against a localhost backend — automatically
    // off in production since NODE_ENV switches, no manual toggle needed.
    ...(isDev ? { dangerouslyAllowLocalIP: true } : {}),
  },
};

export default nextConfig;