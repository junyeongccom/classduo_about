/**
 * @file nav.ts
 * @description 상단 내비 구조 정본 — SiteNav(데스크톱/모바일 공용)와 각 페이지가 같은 소스를 본다.
 * @module lib
 */

export type NavChild = {
  label: string;
  href?: string;
  /** 링크가 아니라 동작(달리기게임 오버레이 실행 등)인 항목 */
  action?: 'running-game';
  /** 준비 중 배지 노출 */
  soon?: boolean;
};

export type NavGroup = {
  label: string;
  href?: string;
  items: NavChild[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Research',
    items: [
      { label: 'Predictive Query Management', href: '/research/predictive-query-management' },
    ],
  },
  {
    label: 'Feature',
    items: [
      { label: 'Microlearning', href: '/feature/microlearning' },
      { label: 'Test-based Learning', href: '/feature/test-based-learning' },
      { label: 'Engagement', href: '/feature/engagement' },
      { label: 'Conversational Learning', href: '/feature/conversational-learning' },
      { label: 'Self-directed Learning', href: '/feature/self-directed-learning' },
    ],
  },
  {
    label: 'Product',
    items: [{ label: 'Aplus', href: '/product/aplus' }],
  },
  {
    label: 'Character',
    items: [{ label: '2026', href: '/character/2026' }],
  },
  {
    label: 'Game',
    href: '/game',
    items: [
      { label: 'Running', action: 'running-game' },
      { label: 'Shooting', href: '/game', soon: true },
      { label: 'Puzzle', href: '/game', soon: true },
    ],
  },
];
