/**
 * @file layout.tsx
 * @description 공통 레이아웃 및 검색·소셜 미리보기 메타데이터
 * @module app
 * @dependencies next, globals.css
 */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://classduo.ai.kr"),
  title: "classduo.ai — Engaging AI Learning Platform",
  description: "Engaging AI Learning Platform",
  openGraph: {
    title: "classduo.ai — Engaging AI Learning Platform",
    siteName: "classduo.ai",
    description: "Engaging AI Learning Platform",
    url: "https://classduo.ai.kr",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CLASSDUO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "classduo.ai",
    description: "Engaging AI Learning Platform",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
