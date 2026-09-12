/* eslint-disable @next/next/no-img-element */
/**
 * @file page.tsx
 * @description Game — 학습 게임 라인업. Running 은 이 페이지에서 바로 플레이, 나머지는 준비 중.
 * @module app/game
 */
import type { Metadata } from 'next';
import { Bullets, Footnote, NextLinks, PageShell, Section } from '@/components/PageShell';
import { PlayRunningButton } from '@/components/PlayRunningButton';

const ACCENT = '#E8A400';

export const metadata: Metadata = {
  title: 'Game — classduo.ai',
  description: '정답을 알아야 이기는 학습 게임. 달리기 게임은 브라우저에서 바로 플레이할 수 있습니다.',
  openGraph: {
    title: 'Game — classduo.ai',
    description: '정답을 알아야 이기는 학습 게임. 달리기 게임은 브라우저에서 바로 플레이할 수 있습니다.',
  },
};

const UPCOMING = [
  {
    name: 'Shooting',
    tagline: '날아오는 오답을 골라 맞히는 반응형 인출 게임',
    body: '보기가 화면을 가로질러 지나가고, 맞는 것만 골라 맞힙니다. 망설이는 시간 자체가 숙련도의 신호가 됩니다.',
  },
  {
    name: 'Puzzle',
    tagline: '흩어진 개념을 관계로 다시 맞추는 조립 게임',
    body: '용어와 정의, 원인과 결과를 조각으로 흩어 놓고 다시 잇게 합니다. 단어를 외웠는지가 아니라 관계를 이해했는지를 묻습니다.',
  },
];

export default function GamePage() {
  return (
    <PageShell
      kicker="Game"
      title="정답을 알아야 이기는 게임"
      subtitle="Learning Games"
      lead="학습 게임이 실패하는 방식은 대개 하나입니다. 문제를 다 틀려도 반응이 좋으면 이기는 구조. 클래스듀오의 게임은 승리 조건을 수행하는 행위 자체가 지식 인출이 되도록 설계 원칙을 고정했습니다."
      icon="/home_assets/unique/19__08-currency-v4__01.png"
      accent={ACCENT}
    >
      {/* 플레이 가능한 게임 */}
      <div className="mb-20 overflow-hidden rounded-2xl border border-[color:var(--ct-line)]">
        <div className="flex flex-col gap-8 bg-[#fffaf0] px-7 py-10 md:flex-row md:items-center md:px-10 md:py-12">
          <div className="min-w-0 flex-1">
            <span
              className="inline-block rounded-full px-2.5 py-1 text-[11px] font-[550] uppercase tracking-[0.1em] text-white"
              style={{ backgroundColor: ACCENT }}
            >
              Playable
            </span>
            <h2 className="ct-h2 mt-4">Running — 퀴즈 러너</h2>
            <p className="ct-body ct-prose mt-4 text-[color:var(--ct-ink-2)]">
              달리면서 일정 주기마다 3지선다 문항을 만납니다. 정답은 버프로, 오답은 디버프로 곧바로
              게임플레이에 반영됩니다. 실제 강의에 배포된 게임을 학습 콘텐츠 대신 샘플 문항으로 바꿔
              그대로 옮겨 왔습니다.
            </p>
            <div className="mt-7">
              <PlayRunningButton accent={ACCENT} />
            </div>
            <p className="ct-caption mt-3 text-[color:var(--ct-ink-4)]">
              모바일에서는 가로 화면으로 전환되어 실행됩니다.
            </p>
          </div>
          <img
            src="/home_assets/unique/16__07-xp-v2__01.png"
            alt=""
            aria-hidden
            className="hidden h-[80px] w-[140px] shrink-0 object-contain md:block"
          />
        </div>
      </div>

      <Section title="설계 원칙" index={1} accent={ACCENT}>
        <Bullets
          accent={ACCENT}
          items={[
            '승리 조건 수행 = 지식 인출. 정답을 몰라도 잘할 수 있는 게임은 학습 콘텐츠가 아닙니다.',
            '한 판은 짧게. 실사용 로그에서 1회 플레이 중앙값은 40~47초였고, 대부분 학습 화면에서 진입해 다시 학습으로 돌아갔습니다.',
            '폭보다 깊이. 가볍게 여러 종을 늘어놓는 방식은 학생의 기대치를 넘지 못했습니다. 종 수를 줄이고 완성도를 올리는 쪽으로 방향을 바꿨습니다.',
            '랭킹은 게임 점수가 아니라 학습 통계 기반. 반복 플레이로 상단을 점유하는 구조를 만들지 않습니다.',
          ]}
        />
      </Section>

      <Section title="준비 중인 게임" index={2} accent={ACCENT}>
        <div className="grid gap-4 sm:grid-cols-2">
          {UPCOMING.map((g) => (
            <div
              key={g.name}
              className="rounded-xl border border-dashed border-[#dfe3e1] bg-[color:var(--ct-surface)] p-6"
            >
              <div className="flex items-center gap-2">
                <p className="ct-h3 text-[color:var(--ct-ink)]">{g.name}</p>
                <span className="rounded-full bg-[#eceeed] px-2 py-0.5 text-[12px] font-[500] text-[color:var(--ct-ink-4)]">
                  준비 중
                </span>
              </div>
              <p className="ct-small ct-strong mt-2 text-[color:var(--ct-ink-3)]">{g.tagline}</p>
              <p className="ct-small mt-2.5 text-[color:var(--ct-ink-3)]">{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Footnote>
        이 페이지에서 실행되는 달리기 게임은 데모 빌드입니다. 문항은 실제 강의 콘텐츠가 아닌 샘플이며,
        점수와 랭킹은 저장되지 않습니다.
      </Footnote>

      <NextLinks
        accent={ACCENT}
        items={[
          {
            label: 'Engagement',
            href: '/feature/engagement',
            caption: '게임이 학습 흐름 안에서 어떻게 소비되는지 — 운영 로그 분석',
          },
          {
            label: 'Character 2026',
            href: '/character/2026',
            caption: '게임과 학습 화면을 잇는 캐릭터·아트 시스템',
          },
        ]}
      />
    </PageShell>
  );
}
