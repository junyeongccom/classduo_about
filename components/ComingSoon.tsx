/**
 * @file ComingSoon.tsx
 * @description 내비에 없는 준비 중 페이지(blog/careers/corporate)의 공용 화면. 토큰만 사용.
 * @module components
 */
import Link from 'next/link';

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <p className="ct-caption ct-strong uppercase tracking-[0.16em] text-[color:var(--ct-accent)]">
        {title}
      </p>
      <h1 className="ct-h1 mt-4 text-[color:var(--ct-ink)]">준비 중입니다</h1>
      <p className="ct-body mt-5 max-w-md text-[color:var(--ct-ink-3)]">
        아직 공개할 내용이 준비되지 않았습니다. 곧 채워 두겠습니다.
      </p>
      <Link
        href="/"
        className="ct-small ct-strong mt-10 rounded-full border border-[color:var(--ct-line)] px-7 py-3.5 text-[color:var(--ct-ink)] transition-colors hover:border-[#cfe6db] hover:bg-[#f7fbf9] hover:text-[color:var(--ct-accent)]"
      >
        ← 홈으로
      </Link>
    </div>
  );
}
