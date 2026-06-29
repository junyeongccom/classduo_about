import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://classduo.ai.kr"),
  title: "classduo.ai — Building Engaging AI Learning Platform",
  description: "Building Engaging AI Learning Platform",
  openGraph: {
    title: "classduo.ai — Building Engaging AI Learning Platform",
    siteName: "classduo.ai",
    description: "Building Engaging AI Learning Platform",
    url: "https://classduo.ai.kr",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "classduo.ai · Aplus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "classduo.ai",
    description: "Building Engaging AI Learning Platform",
    images: ["/og-image.png"],
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
