import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Classduo - AI 대학 교육 혁신 플랫폼",
  description: "AI 기술로 대학 교육의 새로운 패러다임을 만듭니다. 맞춤형 AI 튜터링, 적응형 학습, 강의 분석 솔루션을 제공합니다.",
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: "Classduo - AI 대학 교육 혁신 플랫폼",
    siteName: "Classduo",
    description: "AI 기술로 대학 교육의 새로운 패러다임을 만듭니다.",
    url: "https://classduo.ai",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: "Classduo",
    description: "AI 기술로 대학 교육의 새로운 패러다임을 만듭니다.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
