/**
 * @file nav.ts
 * @description 상단 내비 구조 정본 — SiteNav(데스크톱/모바일 공용)와 각 페이지가 같은 소스를 본다.
 * @module lib
 */

export type NavChild = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
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
];
