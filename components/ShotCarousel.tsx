/* eslint-disable @next/next/no-img-element */
/**
 * @file ShotCarousel.tsx
 * @description 제품 화면 캡쳐를 클릭·스와이프로 넘기는 가로 캐러셀.
 *              네이티브 가로 스크롤 + scroll-snap 위에 화살표만 얹은 구조라
 *              터치에서는 그냥 스와이프가 되고, 키보드로도 레일에 포커스해 넘길 수 있다.
 *              (자동으로 흐르던 마퀴에서 교체 — 호버 정지가 "멈칫거림"으로 읽혔다.)
 *
 *              ⚠️ 여기 들어가는 캡쳐는 대외 공개용으로 가공된 것만 쓴다 —
 *              기관 엠블럼·계정 이메일·과목명이 있는 상단 크롬은 잘라낸 상태여야 하고,
 *              고객사 강의자료 원문이 보이는 화면은 넣지 않는다.
 * @module components
 */
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** w/h 는 원본 픽셀 크기. 이걸 img 속성으로 넘겨야 lazy 이미지가 로드 전에도
 *  올바른 폭을 차지한다 — 없으면 폭 0 으로 찌그러져 스냅·끝 판정이 깨진다. */
export type Shot = { src: string; label: string; w: number; h: number };

const GAP = 20;

function Arrow({
  dir,
  onClick,
  disabled,
}: {
  dir: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? '이전 화면' : '다음 화면'}
      className={`absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--ct-line)] bg-white/90 text-[color:var(--ct-ink)] shadow-[0_6px_20px_rgba(17,19,21,0.12)] backdrop-blur transition-opacity duration-200 hover:bg-white focus-visible:opacity-100 disabled:pointer-events-none disabled:opacity-0 md:flex ${
        dir === 'prev' ? 'left-5' : 'right-5'
      } opacity-0 group-hover:opacity-100`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path
          d={dir === 'prev' ? 'M14.5 5.5 8 12l6.5 6.5' : 'M9.5 5.5 16 12l-6.5 6.5'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function ShotCarousel({ items }: { items: Shot[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    // ResizeObserver 는 observe 직후 비동기로 한 번 발화한다 —
    // effect 안에서 동기 setState 를 하지 않으면서 초기 상태를 잡기 위해 이걸 쓴다.
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    el.addEventListener('scroll', sync, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener('scroll', sync);
    };
  }, [sync]);

  const step = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector('figure');
    const amount = card ? card.getBoundingClientRect().width + GAP : el.clientWidth * 0.8;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * amount, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <div className="group relative ct-bleed">
      <Arrow dir="prev" onClick={() => step(-1)} disabled={atStart} />
      <Arrow dir="next" onClick={() => step(1)} disabled={atEnd} />

      <div
        ref={railRef}
        className="ct-rail py-2"
        tabIndex={0}
        role="region"
        aria-label="제품 화면 캡쳐"
      >
        {items.map((shot, i) => (
          <figure key={shot.src} className="m-0 shrink-0">
            <img
              src={shot.src}
              alt={shot.label}
              width={shot.w}
              height={shot.h}
              loading={i > 1 ? 'lazy' : undefined}
              draggable={false}
              // lazy 이미지가 늦게 붙으면 레일의 scrollWidth 만 커지고 레일 자체 크기는
              // 그대로라 ResizeObserver 가 안 터진다 → 로드마다 끝 도달 여부를 다시 잰다.
              onLoad={sync}
              className="h-[240px] w-auto max-w-none rounded-xl border border-[color:var(--ct-line)] bg-white object-cover object-left-top shadow-[0_10px_30px_rgba(17,19,21,0.07)] md:h-[400px]"
            />
            <figcaption className="ct-caption mt-3 text-[color:var(--ct-ink-4)]">
              {shot.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
