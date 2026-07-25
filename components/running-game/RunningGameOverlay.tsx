/**
 * @file RunningGameOverlay.tsx
 * @description 랜딩페이지용 달리기게임(Phaser) 모달 오버레이 — 학생앱 GameOverlay 포팅(간소화)
 * @module components/running-game
 * @dependencies phaser, ./game/config, ./quizData
 */
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { LANDING_QUIZ_WORDS } from './quizData';

interface RunningGameOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

function useMediaQueryValue(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

export function RunningGameOverlay({ isOpen, onClose }: RunningGameOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<import('phaser').Game | null>(null);
  const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting'>('entering');
  const [isGameReady, setIsGameReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 });

  // 모바일 세로: 게임을 가로 모드로 강제(90° 회전)
  const landscape = useMediaQueryValue('(max-width: 767px) and (orientation: portrait)');

  // 2:1 비율 계산 (모바일 세로면 화면 긴 변 기준으로 가로 채움 후 회전)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (landscape) {
      const long = Math.max(window.innerWidth, window.innerHeight);
      const short = Math.min(window.innerWidth, window.innerHeight);
      let width = long;
      let height = width / 2;
      if (height > short) {
        height = short;
        width = height * 2;
      }
      setDimensions({ width, height });
      return;
    }
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.9;
    let width = Math.min(maxWidth, 1600);
    let height = width / 2; // game is 2:1 ratio (1600x800)
    if (height > maxHeight) {
      height = maxHeight;
      width = height * 2;
    }
    setDimensions({ width, height });
  }, [landscape]);

  // 애니메이션 상태 관리
  useEffect(() => {
    if (isOpen) {
      setAnimationState('entering');
      setTimeout(() => {
        setAnimationState('entered');
      }, 100);
    } else {
      setAnimationState('exiting');
    }
  }, [isOpen]);

  // Phaser 인스턴스 생성/소멸
  useEffect(() => {
    if (!isOpen || animationState !== 'entered' || typeof window === 'undefined') return;
    if (!containerRef.current || gameRef.current) return;

    let game: import('phaser').Game | null = null;

    setIsGameReady(false);

    const initGame = async () => {
      const Phaser = (await import('phaser')).default;
      const { createGameConfig } = await import('./game/config');

      if (!containerRef.current) return;

      const config = createGameConfig(containerRef.current, landscape ? dimensions.width / 1600 : undefined);
      game = new Phaser.Game(config);
      game.registry.set('keywords', LANDING_QUIZ_WORDS);
      game.registry.set('locale', 'ko');
      game.registry.set('gameMode', 'normal');
      gameRef.current = game;
      setIsGameReady(true);

      // 모바일 세로에서 캔버스를 90° CSS 회전하면 Phaser의 기본 포인터 변환이
      // 회전된 getBoundingClientRect를 그대로 써서 좌표가 어긋난다(터치가 안 먹힘).
      // 회전을 역보정하는 transformPointer로 교체한다.
      if (landscape) {
        const canvas = game.canvas;
        game.input.transformPointer = function (pointer, pageX, pageY, wasMove) {
          const p0 = pointer.position;
          const p1 = pointer.prevPosition;
          p1.x = p0.x;
          p1.y = p0.y;
          const rect = canvas.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const cssW = rect.height; // 회전 전 논리 가로 = 화면상 세로
          const z = cssW / canvas.width;
          const halfW = cssW / 2;
          const halfH = rect.width / 2;
          const sx = pageX - window.scrollX - cx;
          const sy = pageY - window.scrollY - cy;
          const x = (sy + halfW) / z;
          const y = (halfH - sx) / z;
          const a = pointer.smoothFactor;
          if (!wasMove || a === 0) {
            p0.x = x;
            p0.y = y;
          } else {
            p0.x = x * a + p1.x * (1 - a);
            p0.y = y * a + p1.y * (1 - a);
          }
        };
      }

      // 게임 컨테이너로 포커스 이동 → 페이지의 다른 요소가 SPACE를 가로채지 않도록
      containerRef.current?.focus();
    };

    initGame();

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      game = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, animationState]);

  // isOpen이 false로 바뀌면 Phaser 인스턴스 소멸
  useEffect(() => {
    if (!isOpen && gameRef.current) {
      gameRef.current.destroy(true);
      gameRef.current = null;
      setIsGameReady(false);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  const rotate = landscape ? ' rotate(90deg)' : '';

  return (
    <>
      {/* 배경 오버레이 — 게임 활성 중에는 X 버튼만 닫기 허용 */}
      <div
        className={`fixed inset-0 z-[80] bg-black/50 transition-opacity duration-500 ${
          animationState === 'entered' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 게임 컨테이너 */}
      <div
        className="fixed z-[80] overflow-hidden rounded-2xl shadow-2xl"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          left: '50%',
          top: '50%',
          transform:
            animationState === 'entered'
              ? `translate(-50%, -50%)${rotate} scale(1)`
              : `translate(-50%, -50%)${rotate} scale(0.6)`,
          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease-out',
          opacity: animationState === 'entered' ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          aria-label="게임 닫기"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-lg font-semibold text-gray-600 shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
        >
          ✕
        </button>

        {/* 로딩 표시 */}
        {!isGameReady && animationState === 'entered' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-950">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-white" />
            <p className="mt-3 text-sm text-gray-400">Loading game...</p>
          </div>
        )}

        {/* Phaser 렌더 영역 */}
        <div ref={containerRef} tabIndex={-1} className="h-full w-full bg-[#e8f4f8] outline-none" />
      </div>
    </>
  );
}
