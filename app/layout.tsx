import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "classduo.ai — Building Engaging AI Learning Platform",
  description: "Building Engaging AI Learning Platform",
  openGraph: {
    title: "classduo.ai — Building Engaging AI Learning Platform",
    siteName: "classduo.ai",
    description: "Building Engaging AI Learning Platform",
    url: "https://classduo.ai.kr",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "classduo.ai",
    description: "Building Engaging AI Learning Platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
