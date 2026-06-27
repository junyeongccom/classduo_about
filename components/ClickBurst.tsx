/* eslint-disable @next/next/no-img-element */
/**
 * @file ClickBurst.tsx
 * @description 화면 클릭 시 home_assets 에셋을 클릭 지점에서 폭죽처럼(무작위 방향) 10~15개 터뜨려 배경을 채우고 5초 뒤 페이드아웃.
 * @module components
 * @dependencies public/home_assets/unique/*.png
 */
'use client';

import { useEffect, useRef, useState } from 'react';

const DIR = '/home_assets/unique/';

const ASSETS = [
  '01__01-short-test-v1__01.png',
  '02__01-short-test-v1__02.png',
  '03__01-short-test-v1__03.png',
  '04__02-microlearning-v1__01.png',
  '05__04-learning-streak-v1__02.png',
  '06__02-microlearning-v1__03.png',
  '07__02-microlearning-v1__04.png',
  '08__02-microlearning-v1__05.png',
  '09__02-microlearning-v2__01.png',
  '10__02-microlearning-v2__02.png',
  '11__02-microlearning-v2__03.png',
  '12__02-microlearning-v2__04.png',
  '13__02-microlearning-v2__05.png',
  '15__04-learning-streak-v1__03.png',
  '16__07-xp-v2__01.png',
  '17__07-xp-v2__02.png',
  '18__07-xp-v2__03.png',
  '19__08-currency-v4__01.png',
  '20__08-currency-v4__02.png',
  '21__08-currency-v4__03.png',
  '22__08-currency-v4__04.png',
  '23__08-currency-v4__05.png',
  '24__08-currency-v6__01.png',
  '25__08-currency-v6__02.png',
  '26__08-currency-v6__03.png',
  '27__08-currency-v6__04.png',
  '28__09-character-v3__01.png',
  '29__09-character-v3__02.png',
  '30__09-character-v3__03.png',
  '31__09-character-v3__04.png',
  '32__10-social-v10__01.png',
  '33__10-social-v10__02.png',
  '34__10-social-v10__03.png',
  '35__10-social-v10__04.png',
  '36__10-social-v5__01.png',
  '37__10-social-v5__02.png',
  '38__10-social-v5__03.png',
  '39__10-social-v5__04.png',
  '40__04-clock.png',
  '41__04-pencil.png',
  '42__04-flower.png',
  '43__04-leaf.png',
];

// 물고기(보이드) 기준 크기 ≈ 90px → MIN_SCALE~MAX_SCALE 무작위 (현재 50%~130%, 최대 살짝 축소).
const BASE_SIZE = 90;
const MIN_SCALE = 0.5;
const MAX_SCALE = 1.3;
const MIN_COUNT = 10;
const MAX_COUNT = 15;
// burst(0.6s) + hold + fade(0.6s). 페이드는 3초 시점(83%)부터 시작 — globals.css homeBurst 와 동기.
const LIFETIME_MS = 3600;
const MAX_ON_SCREEN = 240; // 과다 누적 방지

type Particle = {
  id: number;
  src: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  rot: number;
};

export default function ClickBurst() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const count = MIN_COUNT + Math.floor(Math.random() * (MAX_COUNT - MIN_COUNT + 1));
      const batch: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2; // 무작위 방향
        const distance = 90 + Math.random() * 280; // 클릭 지점에서 흩어지는 거리
        batch.push({
          id: idRef.current++,
          src: DIR + ASSETS[Math.floor(Math.random() * ASSETS.length)],
          x: e.clientX,
          y: e.clientY,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          size: BASE_SIZE * (MIN_SCALE + Math.random() * (MAX_SCALE - MIN_SCALE)), // 50%~130%
          rot: (Math.random() - 0.5) * 90,
        });
      }
      setParticles((prev) => [...prev, ...batch].slice(-MAX_ON_SCREEN));
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const remove = (id: number) => setParticles((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {particles.map((p) => {
        const vars = {
          '--dx': `${p.dx}px`,
          '--dy': `${p.dy}px`,
          '--rot': `${p.rot}deg`,
        } as React.CSSProperties;
        return (
          <img
            key={p.id}
            src={p.src}
            alt=""
            draggable={false}
            onAnimationEnd={() => remove(p.id)}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: p.size,
              height: 'auto',
              willChange: 'transform, opacity',
              animation: `homeBurst ${LIFETIME_MS}ms ease-out forwards`,
              ...vars,
            }}
          />
        );
      })}
    </div>
  );
}
