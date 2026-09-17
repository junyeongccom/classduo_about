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
  title: "Learning, Reimagined",
  description:
    "같은 수업에서 시작해도, 배움의 길은 다릅니다. 우리는 AI로 각자의 이해가 깊어지는 학습을 만듭니다.",
  openGraph: {
    title: "Learning, Reimagined",
    siteName: "classduo.ai",
    description:
      "같은 수업에서 시작해도, 배움의 길은 다릅니다. 우리는 AI로 각자의 이해가 깊어지는 학습을 만듭니다.",
    url: "https://classduo.ai.kr",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/classduo-preview-20260917.png",
        width: 230,
        height: 158,
        alt: "classduo.ai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning, Reimagined",
    description:
      "같은 수업에서 시작해도, 배움의 길은 다릅니다. 우리는 AI로 각자의 이해가 깊어지는 학습을 만듭니다.",
    images: ["/classduo-preview-20260917.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
