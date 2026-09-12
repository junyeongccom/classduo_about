/**
 * @file SiteNav.tsx
 * @description 상단 메뉴바 — 전 페이지 공용. 데스크톱은 클릭/호버 드롭다운, 모바일은 햄버거 시트.
 *              (구버전은 CSS `group-hover` 전용이라 터치 기기에서 메뉴가 열리지 않았다.)
 * @module components
 * @dependencies @/lib/nav, ./running-game/RunningGameOverlay
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NAV_GROUPS, type NavChild } from '@/lib/nav';
import { RunningGameOverlay } from './running-game/RunningGameOverlay';

const BRAND = '#55BA8A';

function SoonBadge() {
  return (
    <span className="ml-2 rounded-full bg-[color:var(--ct-line-soft)] px-2 py-0.5 text-[12px] font-[500] text-[color:var(--ct-ink-4)]">
      준비 중
    </span>
  );
}

export function SiteNav() {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const closeAll = useCallback(() => {
    setOpenLabel(null);
    setIsSheetOpen(false);
  }, []);

  // 열린 메뉴 정리는 항목 클릭(renderChild)·바깥 탭·ESC 에서 직접 한다.
  // 라우트 변화에 반응하는 effect 를 두면 렌더 중 setState 가 되어 불필요한 연쇄 렌더를 만든다.

  // 바깥 탭/클릭 + ESC 로 닫기. 터치 기기에서도 동작하도록 pointerdown 을 쓴다.
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

  const runChild = (child: NavChild) => {
    closeAll();
    if (child.action === 'running-game') setIsGameOpen(true);
  };

  /** 드롭다운/시트 안의 한 줄 — 링크이거나 동작 버튼 */
  const renderChild = (child: NavChild, className: string) => {
    if (child.action) {
      return (
        <button
          key={child.label}
          type="button"
          onClick={() => runChild(child)}
          className={`${className} w-full text-left`}
        >
          {child.label}
        </button>
      );
    }
    return (
      <Link key={child.label} href={child.href ?? '/'} onClick={closeAll} className={className}>
        {child.label}
        {child.soon && <SoonBadge />}
      </Link>
    );
  };

  const desktopItemClass =
    'ct-small flex items-center whitespace-nowrap rounded-lg px-3 py-2.5 text-[color:var(--ct-ink-3)] transition-colors duration-150 hover:bg-[#55BA8A]/10 hover:text-[#55BA8A]';
  const sheetItemClass =
    'ct-body flex items-center rounded-lg px-3 py-3 text-[color:var(--ct-ink-3)] transition-colors duration-150 active:bg-[#55BA8A]/10 active:text-[#55BA8A]';

  return (
    <>
      <div ref={rootRef} className="relative">
        {/* ── 데스크톱 (md+) ── */}
        <nav className="ct-small ct-strong hidden items-center justify-center gap-x-[clamp(28px,5vw,76px)] px-6 py-7 md:flex">
          {NAV_GROUPS.map((group) => {
            const isOpen = openLabel === group.label;
            return (
              <div
                key={group.label}
                className="pointer-events-auto relative"
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
                  className="inline-flex cursor-pointer items-center gap-1.5 py-1.5 text-[#111315] transition-colors duration-200 hover:text-[#55BA8A]"
                  style={isOpen ? { color: BRAND } : undefined}
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
                  className={`absolute left-1/2 top-full z-40 min-w-[220px] -translate-x-1/2 rounded-xl border border-[#e7eae8] bg-white p-2 shadow-[0_12px_34px_rgba(17,19,21,0.08)] transition-all duration-200 ${
                    isOpen
                      ? 'visible translate-y-2.5 opacity-100'
                      : 'invisible translate-y-1.5 opacity-0'
                  }`}
                >
                  {group.items.map((child) => renderChild(child, desktopItemClass))}
                </div>
              </div>
            );
          })}
        </nav>

        {/* ── 모바일 (~md) ── */}
        <div className="flex items-center justify-between px-5 py-5 md:hidden">
          {pathname === '/' ? (
            <span aria-hidden className="h-6 w-6" />
          ) : (
            <Link
              href="/"
              className="text-[18px] font-[600] tracking-[-0.03em] text-[color:var(--ct-ink)]"
            >
              classduo.ai
            </Link>
          )}

          <button
            type="button"
            aria-label={isSheetOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isSheetOpen}
            onClick={() => setIsSheetOpen((v) => !v)}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#111315] active:bg-[#f1f3f2]"
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
          <div className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-84px)] overflow-y-auto border-y border-[#e7eae8] bg-white px-4 pb-6 pt-2 shadow-[0_18px_40px_rgba(17,19,21,0.10)] md:hidden">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="border-b border-[#f1f3f2] py-3 last:border-b-0">
                <p className="ct-caption ct-strong px-3 pb-1 uppercase tracking-[0.14em] text-[color:var(--ct-ink-4)]">
                  {group.label}
                </p>
                {group.items.map((child) => renderChild(child, sheetItemClass))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Game > Running: 달리기게임 오버레이 */}
      <RunningGameOverlay isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </>
  );
}
