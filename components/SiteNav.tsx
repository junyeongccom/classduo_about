/**
 * @file SiteNav.tsx
 * @description 상단 메뉴바 (드롭다운 내비) — 홈/리서치 등 전 페이지 공용, Game>Running은 달리기게임 실행
 * @module components
 * @dependencies ./running-game/RunningGameOverlay
 */
'use client';

import { useState } from 'react';
import { RunningGameOverlay } from './running-game/RunningGameOverlay';

// 노션 "첫화면 프롬프트" 기준 내비 (각 항목 드롭다운)
const navItems = [
  { label: 'Research', items: ['Predictive Query Management'] },
  {
    label: 'Feature',
    items: [
      'Microlearning',
      'Test-based Learning',
      'Engagement',
      'Conversational Learning',
      'Self-directed Learning',
    ],
  },
  { label: 'Product', items: ['Aplus'] },
  { label: 'Character', items: ['2026'] },
  { label: 'Game', items: ['Running', 'Shooting', 'Puzzle'] },
];

const subHrefs: Record<string, string> = {
  'Predictive Query Management': '/research/predictive-query-management',
};

export function SiteNav() {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <>
      <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 py-8 text-[16px] font-medium md:gap-x-[clamp(28px,5vw,76px)]">
        {navItems.map((item) => (
          <div key={item.label} className="group pointer-events-auto relative">
            <span className="inline-flex cursor-pointer items-center gap-1.5 py-1.5 text-[#111315] transition-colors duration-200 group-hover:text-[#55BA8A]">
              {item.label}
              <svg
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-2.5 w-2.5 opacity-55 transition-transform duration-200 group-hover:rotate-180 group-hover:opacity-100"
              >
                <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>

            {/* 드롭다운 */}
            <div className="invisible absolute left-1/2 top-full z-30 min-w-[200px] -translate-x-1/2 translate-y-1.5 rounded-xl border border-[#e7eae8] bg-white p-2 opacity-0 shadow-[0_12px_34px_rgba(17,19,21,0.08)] transition-all duration-200 group-hover:visible group-hover:translate-y-2.5 group-hover:opacity-100">
              {item.items.map((sub) =>
                sub === 'Running' ? (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setIsGameOpen(true)}
                    className="block w-full whitespace-nowrap rounded-lg px-3 py-2.5 text-left text-[14px] font-normal text-[#5b6168] transition-colors duration-150 hover:bg-[#55BA8A]/10 hover:text-[#55BA8A]"
                  >
                    {sub}
                  </button>
                ) : (
                  <a
                    key={sub}
                    href={subHrefs[sub] ?? '#'}
                    className="block whitespace-nowrap rounded-lg px-3 py-2.5 text-[14px] font-normal text-[#5b6168] transition-colors duration-150 hover:bg-[#55BA8A]/10 hover:text-[#55BA8A]"
                  >
                    {sub}
                  </a>
                ),
              )}
            </div>
          </div>
        ))}
      </nav>

      {/* Game > Running: 달리기게임 오버레이 */}
      <RunningGameOverlay isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </>
  );
}
