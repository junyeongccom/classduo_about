/* eslint-disable @next/next/no-img-element */
/**
 * @file PageShell.tsx
 * @description 서브페이지 공용 껍데기 — 상단 내비 + 워드마크 + 히어로 + 푸터.
 *              research 페이지의 레이아웃 규칙(max-w-5xl, 워드마크, 구분선)을 정본화한 것.
 * @module components
 * @dependencies ./SiteNav, ./SiteFooter
 */
import Link from 'next/link';
import { SiteNav } from './SiteNav';
import { SiteFooter } from './SiteFooter';

type PageShellProps = {
  /** 상단 작은 라벨 (Feature / Product / Character …) */
  kicker: string;
  /** 국문 제목 */
  title: string;
  /** 영문 부제 */
  subtitle?: string;
  /** 도입부 문단 */
  lead?: string;
  /** 히어로 우측 스티커 아이콘 경로 (public 기준) */
  icon?: string;
  /** 키 컬러 (스티커 에셋 팔레트에서 고름) */
  accent?: string;
  children: React.ReactNode;
};

export function PageShell({
  kicker,
  title,
  subtitle,
  lead,
  icon,
  accent = '#55BA8A',
  children,
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-white text-[#111315]">
      <header className="border-b border-gray-200">
        <SiteNav />
        <div className="mx-auto hidden max-w-5xl px-6 pb-7 md:block md:px-8">
          <Link href="/" className="text-3xl font-black tracking-tight md:text-4xl">
            classduo.ai
          </Link>
        </div>
      </header>

      {/* 히어로 */}
      <section className="border-b border-gray-100 bg-[#fafbfa]">
        <div className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-12 md:px-8 md:py-16">
          <div className="min-w-0 flex-1">
            <p
              className="text-[13px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: accent }}
            >
              {kicker}
            </p>
            <h1 className="mt-3 text-[26px] font-bold leading-[1.32] tracking-tight md:text-[38px]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-[15px] font-medium text-[#8a9099] md:text-[17px]">
                {subtitle}
              </p>
            )}
            {lead && (
              <p className="mt-5 max-w-2xl text-[15px] leading-[1.85] text-[#4a5057] md:text-[16px]">
                {lead}
              </p>
            )}
          </div>
          {icon && (
            <img
              src={icon}
              alt=""
              aria-hidden
              className="hidden h-[104px] w-[104px] shrink-0 object-contain md:block lg:h-[132px] lg:w-[132px]"
            />
          )}
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-16">{children}</main>

      <SiteFooter />
    </div>
  );
}

/* ──────────────────────────── 본문 프리미티브 ──────────────────────────── */

export function StatStrip({
  items,
  accent = '#55BA8A',
}: {
  items: { value: string; label: string }[];
  accent?: string;
}) {
  return (
    <div className="mb-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#e7eae8] bg-[#e7eae8] md:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="bg-white px-5 py-6">
          <p
            className="text-[24px] font-bold leading-none tracking-tight md:text-[28px]"
            style={{ color: accent }}
          >
            {s.value}
          </p>
          <p className="mt-2.5 text-[13px] leading-[1.55] text-[#5b6168]">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function Section({
  title,
  index,
  accent = '#55BA8A',
  children,
}: {
  title: string;
  index?: number;
  accent?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14 last:mb-0">
      <h2 className="flex items-baseline gap-3 text-[19px] font-bold leading-snug tracking-tight md:text-[22px]">
        {index !== undefined && (
          <span
            className="text-[13px] font-semibold tabular-nums"
            style={{ color: accent }}
          >
            {String(index).padStart(2, '0')}
          </span>
        )}
        <span>{title}</span>
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-[1.9] text-[#41474e]">{children}</div>
    </section>
  );
}

export function CardGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((c) => (
        <div key={c.title} className="rounded-xl border border-[#e7eae8] bg-white p-5">
          <p className="text-[15px] font-semibold text-[#111315]">{c.title}</p>
          <p className="mt-2 text-[14px] leading-[1.8] text-[#5b6168]">{c.body}</p>
        </div>
      ))}
    </div>
  );
}

export function Steps({
  items,
  accent = '#55BA8A',
}: {
  items: { title: string; body: string }[];
  accent?: string;
}) {
  return (
    <ol className="relative space-y-5 border-l border-[#e7eae8] pl-6">
      {items.map((s, i) => (
        <li key={s.title} className="relative">
          <span
            className="absolute -left-[30px] top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ backgroundColor: accent }}
          >
            {i + 1}
          </span>
          <p className="text-[15px] font-semibold text-[#111315]">{s.title}</p>
          <p className="mt-1 text-[14px] leading-[1.8] text-[#5b6168]">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function Bullets({ items, accent = '#55BA8A' }: { items: string[]; accent?: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span
            className="mt-[10px] h-[5px] w-[5px] shrink-0 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <span className="text-[15px] leading-[1.85] text-[#41474e]">{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function Footnote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-12 border-t border-[#f1f3f2] pt-5 text-[12.5px] leading-[1.8] text-[#8a9099]">
      {children}
    </p>
  );
}

export function NextLinks({
  items,
  accent = '#55BA8A',
}: {
  items: { label: string; href: string; caption?: string }[];
  accent?: string;
}) {
  return (
    <nav className="mt-14 border-t border-[#e7eae8] pt-8">
      <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#8a9099]">
        More
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((l) => (
          <Link
            key={l.href + l.label}
            href={l.href}
            className="group rounded-xl border border-[#e7eae8] bg-white p-5 transition-colors hover:border-[#cfe6db] hover:bg-[#f7fbf9]"
          >
            <p
              className="text-[15px] font-semibold text-[#111315] transition-colors group-hover:text-[color:var(--accent)]"
              style={{ ['--accent' as string]: accent }}
            >
              {l.label} <span aria-hidden>→</span>
            </p>
            {l.caption && (
              <p className="mt-1.5 text-[13.5px] leading-[1.7] text-[#5b6168]">{l.caption}</p>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
