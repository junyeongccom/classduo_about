import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "classduo.ai",
  description: "We make product for college education innovation",
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: "classduo",
    siteName: "classduo",
    description: "We make product for college education innovation.",
    url: "https://classduo.ai",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: "classduo",
    description: "We make product for college education innovation.",
    site: "@classduo",
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
