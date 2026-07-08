import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jatin Nath — Software Engineer & AI Developer",
  description:
    "CS (AI & Data Science) undergrad building scalable, production-grade systems. Hackathon winner at TetherX (VIT Chennai). Experienced in full-stack development, REST APIs, Docker, and cloud deployment on AWS.",
  keywords: [
    "Jatin Nath",
    "Software Engineer",
    "AI Developer",
    "Full Stack Developer",
    "Portfolio",
    "React",
    "Next.js",
    "Python",
    "Machine Learning",
  ],
  authors: [{ name: "Jatin Nath" }],
  openGraph: {
    title: "Jatin Nath — Software Engineer & AI Developer",
    description:
      "CS (AI & Data Science) undergrad building scalable, production-grade systems. Hackathon winner, Full-Stack builder.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
