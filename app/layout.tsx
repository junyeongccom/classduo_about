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
        alt: "CLASSDUO",
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
    <html lang="ko">
      <body className="antialiased">
        {/* 세로 스크롤바 폭을 --ct-sb 로 노출 — .ct-bleed 가 100vw 를 쓸 때
            스크롤바 폭만큼 밀려 본문과 어긋나는 것을 막는다. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;function s(){d.style.setProperty('--ct-sb',(window.innerWidth-d.clientWidth)+'px')}s();addEventListener('resize',s)})()",
          }}
        />
        {children}
      </body>
    </html>
  );
}
