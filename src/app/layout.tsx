import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "BentoFlow — AI-Powered Bento Portfolio Builder | Aflah Athallah",
  description:
    "Platform portofolio bento grid modern, interaktif, dan link-in-bio dinamis dengan drag-and-drop spasial, tema kustom, dan AI Copilot generator.",
  keywords: [
    "BentoFlow",
    "Bento Grid Portfolio",
    "Aflah Athallah",
    "Teknik Informatika",
    "Software Engineer Portfolio",
    "Next.js 15",
    "Tailwind CSS",
    "Vibe Coding",
    "Portfolio Builder",
  ],
  authors: [{ name: "Aflah Athallah", url: "https://github.com/Abcdeflahhh" }],
  creator: "Aflah Athallah",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://bentoflowaflah.vercel.app",
    title: "BentoFlow — AI-Powered Bento Portfolio Builder",
    description:
      "A modern, aesthetic, and dynamic Bento Grid portfolio builder crafted with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and AI Copilot.",
    siteName: "BentoFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "BentoFlow — AI-Powered Bento Portfolio Builder",
    description:
      "A modern, aesthetic, and dynamic Bento Grid portfolio builder crafted with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and AI Copilot.",
    creator: "@aflah",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#09090b] text-[#fafafa]">
        {children}
      </body>
    </html>
  );
}
