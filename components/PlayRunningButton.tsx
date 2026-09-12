/**
 * @file PlayRunningButton.tsx
 * @description /game 페이지에서 달리기게임 오버레이를 여는 버튼 (내비의 Game > Running 과 동일 진입).
 * @module components
 * @dependencies ./running-game/RunningGameOverlay
 */
'use client';

import { useState } from 'react';
import { RunningGameOverlay } from './running-game/RunningGameOverlay';

export function PlayRunningButton({ accent = '#55BA8A' }: { accent?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="ct-small ct-strong inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-white transition-opacity duration-200 hover:opacity-90"
        style={{ backgroundColor: accent }}
      >
        지금 플레이하기
        <span aria-hidden>→</span>
      </button>
      <RunningGameOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
