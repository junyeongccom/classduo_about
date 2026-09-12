/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import ClickBurst from '@/components/ClickBurst';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { FEATURES } from '@/lib/features';

const ENTRIES = [
  {
    href: '/product/aplus',
    kicker: 'Product',
    title: 'Aplus',
    body: '강의자료와 녹음을 학습 콘텐츠로 바꾸고, 학생의 학습 기록을 개인화된 훈련으로 되돌리는 대학 강의용 AI 학습 플랫폼.',
    icon: '/home_assets/unique/01__01-short-test-v1__01.png',
  },
  {
    href: '/research/predictive-query-management',
    kicker: 'Research',
    title: 'Predictive Query Management',
    body: '학생이 묻기 전에 먼저 묻습니다. 대규모 강의에서 학습 지원의 진입 장벽을 낮춘 선제적 질의 관리 — CIKM 2025 · ACL Industry 2026.',
    icon: '/home_assets/unique/32__10-social-v10__01.png',
  },
  {
    href: '/game',
    kicker: 'Game',
    title: '정답을 알아야 이기는 게임',
    body: '실제 강의에 배포된 학습 게임을 브라우저에서 바로 플레이해 볼 수 있습니다.',
    icon: '/home_assets/unique/19__08-currency-v4__01.png',
  },
  {
    href: '/character/2026',
    kicker: 'Character',
    title: 'Character 2026',
    body: '학습 화면 안에서 학생 옆에 서 있는 두 캐릭터와, 학습 개념마다 하나씩 대응되는 스티커 아트 시스템.',
    icon: '/home_assets/unique/28__09-character-v3__01.png',
  },
];

export default function Home() {
  return (
    <main className="relative w-full bg-white">
      {/* 클릭 폭죽: 배경(z-0)에서 home_assets 에셋이 터져 채워짐 */}
      <ClickBurst />
      {/* 첫 화면: 풀 뷰포트 hero (아래 섹션·푸터는 스크롤 시 노출) */}
      <div className="relative z-20 flex min-h-screen select-none flex-col">
        {/* 상단 내비 */}
        <header>
          <SiteNav />
        </header>

        {/* 히어로 (정중앙): classduo.ai + 캐릭터 + 태그라인 */}
        <div className="-mt-5 flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="flex flex-col items-center justify-center gap-[18px] md:flex-row md:gap-[clamp(14px,2.6vw,34px)]">
            <h1
              className="font-semibold leading-none tracking-[-0.03em] text-[#111315]"
              style={{ fontSize: 'clamp(38.4px, 7.2vw, 105.6px)' }}
            >
              classduo.ai
            </h1>
            <img
              src="/duo-character.png"
              alt="classduo characters"
              className="block w-auto shrink-0 select-none"
              style={{ height: 'clamp(40px, 6.5vw, 78px)' }}
            />
          </div>
          <p
            className="font-[300] tracking-[0.04em] text-[color:var(--ct-ink)]"
            style={{ marginTop: 'clamp(40px, 6.8vh, 80px)', fontSize: 'clamp(18px, 2.2vw, 28px)' }}
          >
            Building Engaging AI Learning Platform
          </p>
        </div>

        {/* 스크롤 유도 */}
        <div className="pb-10 text-center">
          <span className="text-[12px] tracking-[0.18em] text-[#b3b9bd]">SCROLL</span>
        </div>
      </div>

      {/* 첫 화면 아래: 무엇을 만드는 회사인지 */}
      <section className="relative z-20 border-t border-[color:var(--ct-line-soft)] bg-white py-20 md:py-28">
        <div className="ct-page">
          <h2 className="ct-h2">
            수업에서 이미 오간 것으로,
            <br />
            학생마다 다른 학습을 만듭니다
          </h2>
          <p className="ct-body ct-prose mt-7 text-[color:var(--ct-ink-2)]">
            클래스듀오는 대학 강의를 위한 AI 학습 플랫폼을 만듭니다. 교수자가 이미 가지고 있는
            강의자료와 강의 녹음에서 출발해 요약·퀴즈·대화·게임을 만들고, 학생이 남긴 학습 기록을
            다시 개인화된 훈련으로 되돌립니다. 새 교재를 만들 필요도, 강의 방식을 바꿀 필요도
            없습니다.
          </p>

          {/* Feature 5종 */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <Link
                key={f.slug}
                href={`/feature/${f.slug}`}
                className="group rounded-xl border border-[color:var(--ct-line)] bg-white p-6 transition-colors hover:border-[#cfe6db] hover:bg-[#f7fbf9]"
              >
                <img src={f.icon} alt="" aria-hidden className="h-10 w-10 object-contain" />
                <p className="ct-h3 mt-5 text-[color:var(--ct-ink)]">
                  {f.nav} <span aria-hidden>→</span>
                </p>
                <p className="ct-small mt-2.5 text-[color:var(--ct-ink-3)]">{f.summary}</p>
              </Link>
            ))}
          </div>

          {/* 제품 · 연구 · 게임 · 캐릭터 */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {ENTRIES.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="group flex gap-5 rounded-xl border border-[color:var(--ct-line)] bg-white p-6 transition-colors hover:border-[#cfe6db] hover:bg-[#f7fbf9]"
              >
                <img src={e.icon} alt="" aria-hidden className="h-10 w-10 shrink-0 object-contain" />
                <div className="min-w-0">
                  <p className="ct-caption ct-strong uppercase tracking-[0.14em] text-[color:var(--ct-accent)]">
                    {e.kicker}
                  </p>
                  <p className="ct-h3 mt-1.5 text-[color:var(--ct-ink)]">
                    {e.title} <span aria-hidden>→</span>
                  </p>
                  <p className="ct-small mt-2.5 text-[color:var(--ct-ink-3)]">{e.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter className="relative z-20" />
    </main>
  );
}
