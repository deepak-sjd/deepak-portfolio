import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import ThemeProvider from "@/components/providers/ThemeProvider";
import HashScrollHandler from "@/components/common/HashScrollHandler";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),

  title: {
    default: "Deepak Kumar | AI Engineer & Full Stack Developer",
    template: "%s | Deepak Kumar",
  },

  description:
    "Portfolio of Deepak Kumar, an AI Engineer and Java Full Stack Developer building intelligent applications, RAG systems, computer vision solutions, backend services, and modern web applications.",

  keywords: [
    "Deepak Kumar",
    "AI Engineer",
    "AI Engineer India",
    "Java Full Stack Developer",
    "Generative AI",
    "RAG",
    "Computer Vision",
    "Python",
    "Java",
    "Spring Boot",
    "Next.js",
    "React",
  ],

  authors: [
    {
      name: "Deepak Kumar",
    },
  ],

  creator: "Deepak Kumar",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Deepak Kumar | AI Engineer & Full Stack Developer",
    description:
      "AI Engineer and Java Full Stack Developer building intelligent applications and production-oriented software systems.",
    siteName: "Deepak Kumar",
    // Shown as the link preview thumbnail on LinkedIn/Twitter/Slack/etc.
    // Add a 1200x630 image at public/og-image.png (or swap this path).
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Deepak Kumar — AI Engineer & Full Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Deepak Kumar | AI Engineer & Full Stack Developer",
    description:
      "AI Engineer and Java Full Stack Developer building intelligent applications and production-oriented software systems.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ThemeProvider>
          <HashScrollHandler />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}