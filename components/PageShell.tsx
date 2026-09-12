/* eslint-disable @next/next/no-img-element */
/**
 * @file PageShell.tsx
 * @description 서브페이지 공용 껍데기 + 본문 프리미티브.
 *              폭·타입스케일·굵기·자간은 전부 globals.css 의 --ct-* 토큰을 따른다 —
 *              레퍼런스 실측(sakana/stripe/elice, 2026-09-13)에서 도출한 값이라
 *              개별 컴포넌트에서 px 를 새로 만들지 않는다.
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
  accent = 'var(--ct-accent)',
  children,
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-white text-[color:var(--ct-ink)]">
      <header className="border-b border-[color:var(--ct-line)]">
        <SiteNav />
      </header>

      {/* 히어로 */}
      <section className="border-b border-[color:var(--ct-line-soft)] bg-[color:var(--ct-surface)]">
        <div className="ct-page flex items-center gap-10 py-16 md:py-24">
          <div className="min-w-0 flex-1">
            <p
              className="ct-caption ct-strong uppercase tracking-[0.16em]"
              style={{ color: accent }}
            >
              {kicker}
            </p>
            <h1 className="ct-h1 mt-4">{title}</h1>
            {subtitle && (
              <p className="ct-body mt-3 text-[color:var(--ct-ink-4)]">{subtitle}</p>
            )}
            {lead && (
              <p className="ct-body ct-prose mt-7 text-[color:var(--ct-ink-2)]">{lead}</p>
            )}
          </div>
          {icon && (
            <img
              src={icon}
              alt=""
              aria-hidden
              className="hidden h-[112px] w-[112px] shrink-0 object-contain md:block lg:h-[140px] lg:w-[140px]"
            />
          )}
        </div>
      </section>

      <main className="ct-page py-16 md:py-24">{children}</main>

      <SiteFooter />
    </div>
  );
}

/* ──────────────────────────── 본문 프리미티브 ──────────────────────────── */

export function StatStrip({
  items,
  accent = 'var(--ct-accent)',
}: {
  items: { value: string; label: string }[];
  accent?: string;
}) {
  return (
    <div className="mb-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[color:var(--ct-line)] bg-[color:var(--ct-line)] md:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="bg-white px-6 py-7">
          <p
            className="ct-h2 ct-num leading-none"
            style={{ color: accent }}
          >
            {s.value}
          </p>
          <p className="ct-caption mt-3 text-[color:var(--ct-ink-3)]">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function Section({
  title,
  index,
  accent = 'var(--ct-accent)',
  children,
}: {
  title: string;
  index?: number;
  accent?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-20 last:mb-0">
      <h2 className="ct-h2 flex items-baseline gap-4">
        {index !== undefined && (
          <span
            className="ct-caption ct-strong shrink-0 tabular-nums"
            style={{ color: accent }}
          >
            {String(index).padStart(2, '0')}
          </span>
        )}
        <span>{title}</span>
      </h2>
      <div className="ct-body ct-prose mt-6 space-y-5 text-[color:var(--ct-ink-2)]">
        {children}
      </div>
    </section>
  );
}

export function CardGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((c) => (
        <div
          key={c.title}
          className="rounded-xl border border-[color:var(--ct-line)] bg-white p-6"
        >
          <p className="ct-h3 text-[color:var(--ct-ink)]">{c.title}</p>
          <p className="ct-small mt-3 text-[color:var(--ct-ink-3)]">{c.body}</p>
        </div>
      ))}
    </div>
  );
}

export function Steps({
  items,
  accent = 'var(--ct-accent)',
}: {
  items: { title: string; body: string }[];
  accent?: string;
}) {
  return (
    <ol className="relative space-y-7 border-l border-[color:var(--ct-line)] pl-7">
      {items.map((s, i) => (
        <li key={s.title} className="relative">
          <span
            className="absolute -left-[35px] top-[3px] flex h-[20px] w-[20px] items-center justify-center rounded-full text-[11px] font-[550] text-white"
            style={{ backgroundColor: accent }}
          >
            {i + 1}
          </span>
          <p className="ct-h3 text-[color:var(--ct-ink)]">{s.title}</p>
          <p className="ct-small mt-2 text-[color:var(--ct-ink-3)]">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function Bullets({
  items,
  accent = 'var(--ct-accent)',
}: {
  items: string[];
  accent?: string;
}) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-4">
          <span
            className="mt-[11px] h-[5px] w-[5px] shrink-0 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <span className="ct-body text-[color:var(--ct-ink-2)]">{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function Footnote({ children }: { children: React.ReactNode }) {
  return (
    <p className="ct-caption ct-prose mt-16 border-t border-[color:var(--ct-line-soft)] pt-6 text-[color:var(--ct-ink-4)]">
      {children}
    </p>
  );
}

export function NextLinks({
  items,
  accent = 'var(--ct-accent)',
}: {
  items: { label: string; href: string; caption?: string }[];
  accent?: string;
}) {
  return (
    <nav className="mt-20 border-t border-[color:var(--ct-line)] pt-10">
      <p className="ct-caption ct-strong uppercase tracking-[0.14em] text-[color:var(--ct-ink-4)]">
        More
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((l) => (
          <Link
            key={l.href + l.label}
            href={l.href}
            className="group rounded-xl border border-[color:var(--ct-line)] bg-white p-6 transition-colors hover:border-[#cfe6db] hover:bg-[#f7fbf9]"
          >
            <p
              className="ct-h3 text-[color:var(--ct-ink)] transition-colors group-hover:text-[color:var(--accent)]"
              style={{ ['--accent' as string]: accent }}
            >
              {l.label} <span aria-hidden>→</span>
            </p>
            {l.caption && (
              <p className="ct-small mt-2 text-[color:var(--ct-ink-3)]">{l.caption}</p>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
