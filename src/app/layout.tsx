import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollPager } from "@/components/ScrollPager";
import { Background } from "@/components/Background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Gabriel Gamaroff — Agentic Engineer";
const description =
  "Agentic engineer building the layer where people and AI meet. Four years shipping production AI products on Next.js, React, and TypeScript.";

export const metadata: Metadata = {
  metadataBase: new URL("https://gabrielgamaroff.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://gabrielgamaroff.com",
    siteName: "Gabriel Gamaroff",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen text-ink">
        <div className="scroll-progress" aria-hidden />
        <Background />
        <ScrollPager />
        {children}
      </body>
    </html>
  );
}
