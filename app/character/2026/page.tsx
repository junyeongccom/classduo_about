/* eslint-disable @next/next/no-img-element */
/**
 * @file page.tsx
 * @description Character > 2026 — 캐릭터 IP와 스티커 아트 시스템 소개.
 * @module app/character
 */
import type { Metadata } from 'next';
import { CardGrid, NextLinks, PageShell, Section } from '@/components/PageShell';

const ACCENT = '#55BA8A';

const STICKERS = [
  { src: '/home_assets/unique/01__01-short-test-v1__01.png', label: '쪽지시험' },
  { src: '/home_assets/unique/04__02-microlearning-v1__01.png', label: '마이크로러닝' },
  { src: '/home_assets/unique/05__04-learning-streak-v1__02.png', label: '학습 연속일' },
  { src: '/home_assets/unique/16__07-xp-v2__01.png', label: '경험치' },
  { src: '/home_assets/unique/19__08-currency-v4__01.png', label: '보상' },
  { src: '/home_assets/unique/28__09-character-v3__01.png', label: '캐릭터' },
  { src: '/home_assets/unique/32__10-social-v10__01.png', label: '대화' },
  { src: '/home_assets/unique/40__04-clock.png', label: '학습 시간' },
  { src: '/home_assets/unique/41__04-pencil.png', label: '풀이' },
  { src: '/home_assets/unique/42__04-flower.png', label: '성장' },
  { src: '/home_assets/unique/43__04-leaf.png', label: '휴식' },
  { src: '/home_assets/unique/24__08-currency-v6__01.png', label: '수집' },
];

export const metadata: Metadata = {
  title: 'Character 2026 — classduo.ai',
  description: '학습 화면 안에서 학생 옆에 서 있는 클래스듀오의 캐릭터와 스티커 아트 시스템.',
  openGraph: {
    title: 'Character 2026 — classduo.ai',
    description: '학습 화면 안에서 학생 옆에 서 있는 클래스듀오의 캐릭터와 스티커 아트 시스템.',
  },
};

export default function Character2026Page() {
  return (
    <PageShell
      kicker="Character"
      title="공부하는 화면에도, 옆에 있는 사람이 필요합니다"
      subtitle="Character 2026"
      lead="클래스듀오의 캐릭터는 장식이 아니라 인터페이스의 일부입니다. 처음 들어온 학생을 안내하고, 문답 중에 기다림을 채우고, 틀렸을 때 화면을 덜 차갑게 만듭니다. 2026년 라인업은 두 명의 학생 캐릭터와, 학습 개념마다 하나씩 대응되는 스티커 아트 세트로 구성됩니다."
      icon="/home_assets/unique/28__09-character-v3__01.png"
      accent={ACCENT}
    >
      {/* 듀오 캐릭터 */}
      <div className="mb-14 overflow-hidden rounded-2xl border border-[#e7eae8] bg-[#fafbfa]">
        <div className="flex items-center justify-center px-6 py-10 md:py-14">
          <img
            src="/duo-character.png"
            alt="클래스듀오 2026 캐릭터 — 두 명의 학생 캐릭터"
            className="h-auto w-full max-w-[560px]"
          />
        </div>
        <p className="border-t border-[#e7eae8] bg-white px-6 py-4 text-[13px] leading-[1.7] text-[#5b6168]">
          듀오(Duo) — 함께 공부하는 두 사람. 서비스 이름이 그대로 캐릭터의 설정이 됩니다.
        </p>
      </div>

      <Section title="캐릭터가 하는 일" index={1} accent={ACCENT}>
        <p>
          캐릭터는 화면 구석의 마스코트로 남지 않고, 학습 흐름에서 사람이 필요한 자리에 배치됩니다.
          어느 자리에 놓을지는 &ldquo;여기서 학생이 혼자라고 느끼는가&rdquo;를 기준으로 정합니다.
        </p>
        <CardGrid
          items={[
            {
              title: '온보딩 가이드',
              body: '첫 로그인의 안내 슬라이드를 캐릭터가 이끕니다. 실제 서비스 화면 위에 표시를 덧그리고 말풍선으로 설명해, 사용법을 읽는 대신 보게 합니다.',
            },
            {
              title: '문답의 기다림',
              body: '대화형 학습에서 답변을 기다리는 동안 캐릭터가 반응합니다. 칭찬과 제안이 각각 다른 캐릭터·다른 색으로 나뉘어, 지금 어떤 피드백이 오는지 문장을 읽기 전에 전해집니다.',
            },
            {
              title: '학습 프로필',
              body: '자기주도학습 설문 결과 카드에서, 가장 낮은 요인에 맞는 캐릭터가 응원 문구와 함께 나타납니다.',
            },
            {
              title: '학교별 버전',
              body: '도입 기관의 색과 정체성에 맞춰 캐릭터 버전을 따로 둡니다. 학생이 자기 학교 서비스라고 느끼는 것이 사용률에 실제로 영향을 줍니다.',
            },
          ]}
        />
      </Section>

      <Section title="스티커 아트 시스템" index={2} accent={ACCENT}>
        <p>
          학습 개념 하나에 스티커 하나. 굵은 검정 외곽선과 채도 높은 단색 면이라는 규칙 하나로 전체
          세트를 묶어, 새 개념이 생겨도 같은 손으로 그린 것처럼 늘어납니다. 아이콘은 화면 안에서
          라벨을 대신하고, 학습 개념을 눈으로 먼저 구분하게 합니다.
        </p>
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-[#e7eae8] bg-[#e7eae8] sm:grid-cols-4 md:grid-cols-6">
          {STICKERS.map((s) => (
            <div
              key={s.src}
              className="flex flex-col items-center gap-2 bg-white px-3 py-5"
              title={s.label}
            >
              <img src={s.src} alt={s.label} className="h-12 w-12 object-contain" />
              <span className="text-center text-[11.5px] leading-tight text-[#8a9099]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <p>
          같은 세트가 이 사이트의 첫 화면에서도 쓰입니다. 홈에서 아무 곳이나 눌러 보면 스티커가
          터집니다.
        </p>
      </Section>

      <Section title="왜 여기에 공을 들이는가" index={3} accent={ACCENT}>
        <p>
          좋은 학습 콘텐츠를 만드는 것은 기술 과제입니다. 하지만 &ldquo;공부하고 싶게&rdquo; 만드는
          일은 콘텐츠가 아니라 화면이 담당합니다. 학생이 앱을 열게 만드는 힘의 상당 부분은 정확도가
          아니라 인상에서 나옵니다. 캐릭터와 아트 시스템에 제품 리소스를 배정하는 것은 취향이 아니라
          이 판단 때문입니다.
        </p>
      </Section>

      <NextLinks
        accent={ACCENT}
        items={[
          {
            label: 'Engagement',
            href: '/feature/engagement',
            caption: '게임과 보상을 학습 흐름 안쪽에 배치하는 방법',
          },
          {
            label: 'Self-directed Learning',
            href: '/feature/self-directed-learning',
            caption: '온보딩과 학습 프로필 카드에서 캐릭터가 하는 일',
          },
          { label: 'Game', href: '/game', caption: '플레이할 수 있는 학습 게임' },
          { label: 'Aplus', href: '/product/aplus', caption: '제품 전체 소개' },
        ]}
      />
    </PageShell>
  );
}
