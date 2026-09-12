/**
 * @file SiteNav.tsx
 * @description 상단 메뉴바 — 전 페이지 공용. 좌측 워드마크 + 우측 메뉴.
 *              데스크톱은 클릭/호버 드롭다운, 모바일은 햄버거 시트.
 *              (구버전은 CSS `group-hover` 전용이라 터치 기기에서 메뉴가 열리지 않았다.)
 * @module components
 * @dependencies @/lib/nav
 */
'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NAV_GROUPS, type NavChild } from '@/lib/nav';

export function SiteNav() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const closeAll = useCallback(() => {
    setOpenLabel(null);
    setIsSheetOpen(false);
  }, []);

  // 열린 메뉴 정리는 항목 클릭·바깥 탭·ESC 에서 직접 한다.
  // 라우트 변화에 반응하는 effect 를 두면 렌더 중 setState 가 되어 불필요한 연쇄 렌더를 만든다.
  useEffect(() => {
    if (!openLabel && !isSheetOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) closeAll();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAll();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openLabel, isSheetOpen, closeAll]);

  // 모바일 시트가 열린 동안 배경 스크롤 잠금
  useEffect(() => {
    if (!isSheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isSheetOpen]);

  const renderChild = (child: NavChild, className: string) => (
    <Link key={child.label} href={child.href} onClick={closeAll} className={className}>
      {child.label}
    </Link>
  );

  const desktopItemClass =
    'ct-small flex items-center whitespace-nowrap rounded-lg px-3 py-2.5 text-[color:var(--ct-ink-3)] transition-colors duration-150 hover:bg-[#55BA8A]/10 hover:text-[#55BA8A]';
  const sheetItemClass =
    'ct-body flex items-center rounded-lg px-3 py-3 text-[color:var(--ct-ink-3)] transition-colors duration-150 active:bg-[#55BA8A]/10 active:text-[#55BA8A]';

  const wordmark = (size: string) => (
    <Link
      href="/"
      onClick={closeAll}
      className={`${size} font-[600] tracking-[-0.03em] text-[color:var(--ct-ink)]`}
    >
      classduo.ai
    </Link>
  );

  return (
    <div ref={rootRef} className="relative">
      {/* ── 데스크톱 (md+) ── */}
      <nav className="ct-page hidden items-center justify-between py-6 md:flex">
        {wordmark('text-[20px]')}

        <div className="ct-small ct-strong flex items-center gap-x-9">
          {NAV_GROUPS.map((group) => {
            const isOpen = openLabel === group.label;
            return (
              <div
                key={group.label}
                className="relative"
                // 마우스일 때만 호버로 연다. 터치 태블릿(≥768px)에서는 tap 이
                // pointerenter → click 순으로 들어와 "열자마자 닫히는" 문제가 생긴다.
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') setOpenLabel(group.label);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === 'mouse')
                    setOpenLabel((cur) => (cur === group.label ? null : cur));
                }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => setOpenLabel(isOpen ? null : group.label)}
                  className="inline-flex cursor-pointer items-center gap-1.5 py-1.5 text-[color:var(--ct-ink)] transition-colors duration-200 hover:text-[#55BA8A]"
                  style={isOpen ? { color: '#55BA8A' } : undefined}
                >
                  {group.label}
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className={`h-2.5 w-2.5 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 opacity-100' : 'opacity-55'
                    }`}
                  >
                    <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div
                  className={`absolute right-0 top-full z-40 min-w-[230px] rounded-xl border border-[color:var(--ct-line)] bg-white p-2 shadow-[0_12px_34px_rgba(17,19,21,0.08)] transition-all duration-200 ${
                    isOpen ? 'visible translate-y-2.5 opacity-100' : 'invisible translate-y-1.5 opacity-0'
                  }`}
                >
                  {group.items.map((child) => renderChild(child, desktopItemClass))}
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      {/* ── 모바일 (~md) ── */}
      <div className="flex items-center justify-between px-5 py-5 md:hidden">
        {wordmark('text-[18px]')}
        <button
          type="button"
          aria-label={isSheetOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isSheetOpen}
          onClick={() => setIsSheetOpen((v) => !v)}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-[color:var(--ct-ink)] active:bg-[color:var(--ct-line-soft)]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-6 w-6">
            {isSheetOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {isSheetOpen && (
        <div className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-84px)] overflow-y-auto border-y border-[color:var(--ct-line)] bg-white px-4 pb-6 pt-2 shadow-[0_18px_40px_rgba(17,19,21,0.10)] md:hidden">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="border-b border-[color:var(--ct-line-soft)] py-3 last:border-b-0">
              <p className="ct-caption ct-strong px-3 pb-1 uppercase tracking-[0.14em] text-[color:var(--ct-ink-4)]">
                {group.label}
              </p>
              {group.items.map((child) => renderChild(child, sheetItemClass))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
