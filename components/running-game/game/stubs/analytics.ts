/**
 * @file analytics.ts
 * @description 학생앱 분석 추적 no-op 스텁 — 랜딩페이지 포팅용 (전송 없음)
 * @module components/running-game/game/stubs
 * @dependencies 없음
 */

export function trackGameStart(_params: Record<string, unknown>): void {}

export function trackGameComplete(_params: Record<string, unknown>): void {}

export function trackInGameQuizAttempt(_params: Record<string, unknown>): void {}

export const runningGameAnalytics = {
  quizAnswer(_lectureId: string, _params: Record<string, unknown>): void {},
};
