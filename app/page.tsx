/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { FEATURES } from '@/lib/features';

/** 히어로 바로 아래 신뢰 증거 — /product/aplus 의 StatStrip 과 같은 값을 쓴다(페이지 간 수치 불일치 방지). */
const PROOF = [
  { value: '3,000명', label: '단일 강좌 최대 도입 규모' },
  { value: '3개', label: '2026년 학기 중 실서비스 운영 대학·교육기관' },
  { value: '9.8 / 10', label: '학기말 학습 효과 인식 설문 평균' },
  { value: '2편', label: '국제 학술대회 채택 논문' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-[color:var(--ct-line)]">
        <SiteNav />
      </header>

      {/* ── 히어로 ── */}
      <section className="ct-page pb-20 pt-24 md:pb-28 md:pt-36">
        <p className="ct-caption ct-strong uppercase tracking-[0.16em] text-[color:var(--ct-accent)]">
          AI Learning Platform for Universities
        </p>
        <h1 className="ct-h1 ct-prose mt-6">
          수업에서 이미 오간 것으로,
          <br />
          학생마다 다른 학습을 만듭니다
        </h1>
        <p className="ct-body ct-prose mt-8 text-[color:var(--ct-ink-2)]">
          클래스듀오는 대학 강의를 위한 AI 학습 플랫폼을 만듭니다. 교수자가 이미 가지고 있는
          강의자료와 강의 녹음에서 요약·퀴즈·대화를 만들고, 학생이 남긴 학습 기록을 다시 개인화된
          훈련으로 되돌립니다. 새 교재를 만들 필요도, 강의 방식을 바꿀 필요도 없습니다.
        </p>

        <div className="mt-11 flex flex-wrap items-center gap-3">
          <Link
            href="/product/aplus"
            className="ct-small ct-strong rounded-full bg-[color:var(--ct-ink)] px-7 py-3.5 text-white transition-opacity hover:opacity-88"
          >
            제품 알아보기 <span aria-hidden>→</span>
          </Link>
          <a
            href="mailto:admin@aplus.io.kr?subject=%5B%EB%8F%84%EC%9E%85%20%EB%AC%B8%EC%9D%98%5D%20classduo.ai"
            className="ct-small ct-strong rounded-full border border-[color:var(--ct-line)] px-7 py-3.5 text-[color:var(--ct-ink)] transition-colors hover:border-[#cfe6db] hover:bg-[#f7fbf9] hover:text-[color:var(--ct-accent)]"
          >
            도입 문의
          </a>
        </div>
      </section>

      {/* ── 신뢰 증거 ── */}
      <section className="border-y border-[color:var(--ct-line)] bg-[color:var(--ct-surface)]">
        <div className="ct-page grid grid-cols-2 gap-x-8 gap-y-10 py-14 md:grid-cols-4 md:py-16">
          {PROOF.map((s) => (
            <div key={s.label}>
              <p className="ct-h2 ct-num leading-none text-[color:var(--ct-accent)]">{s.value}</p>
              <p className="ct-caption mt-3 text-[color:var(--ct-ink-3)]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 연구 ── */}
      <section className="ct-page py-20 md:py-28">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16">
          <div className="min-w-0 flex-1">
            <p className="ct-caption ct-strong uppercase tracking-[0.16em] text-[color:var(--ct-ink-4)]">
              Research
            </p>
            <h2 className="ct-h2 mt-4">학생이 묻기 전에, 먼저 묻습니다</h2>
            <p className="ct-body mt-6 text-[color:var(--ct-ink-2)]">
              대규모 강의에서 학습 지원이 닿지 않는 이유는 응답이 느려서가 아니라, 많은 학생이
              무엇을 모르는지 언어로 만들지 못하기 때문입니다. 수업 맥락에 맞춘 예상 질문을 먼저
              제시하는 선제적 질의 관리 방식으로 그 진입 장벽을 낮췄고, 1,500명 이상이 수강한
              대규모 강의에 적용한 결과를 두 편의 논문으로 정리했습니다.
            </p>
            <Link
              href="/research/predictive-query-management"
              className="ct-small ct-strong mt-7 inline-block text-[color:var(--ct-accent)] hover:underline"
            >
              Predictive Query Management 읽기 <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 md:w-[340px]">
            <img
              src="/research/cikm-2025.png"
              alt="CIKM 2025 — The 34th ACM International Conference on Information and Knowledge Management"
              className="w-full rounded-lg border border-[color:var(--ct-line)]"
            />
            <img
              src="/research/acl-2026.png"
              alt="ACL 2026 Industry Track, San Diego"
              className="w-full rounded-lg border border-[color:var(--ct-line)]"
            />
          </div>
        </div>
      </section>

      {/* ── 기능 ── */}
      <section className="border-t border-[color:var(--ct-line-soft)] bg-[color:var(--ct-surface)] py-20 md:py-28">
        <div className="ct-page">
          <p className="ct-caption ct-strong uppercase tracking-[0.16em] text-[color:var(--ct-ink-4)]">
            Feature
          </p>
          <h2 className="ct-h2 mt-4">학습의 다섯 축</h2>
          <p className="ct-body ct-prose mt-6 text-[color:var(--ct-ink-2)]">
            진단하고, 훈련하고, 되묻고, 스스로 점검하게 합니다. 각 축이 어떤 설계 위에서 도는지
            따로 정리했습니다.
          </p>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <Link
                key={f.slug}
                href={`/feature/${f.slug}`}
                className="group rounded-xl border border-[color:var(--ct-line)] bg-white p-6 transition-colors hover:border-[#cfe6db] hover:bg-[#f7fbf9]"
              >
                <p className="ct-h3 text-[color:var(--ct-ink)]">
                  {f.nav} <span aria-hidden>→</span>
                </p>
                <p className="ct-small mt-3 text-[color:var(--ct-ink-3)]">{f.summary}</p>
              </Link>
            ))}
            <Link
              href="/product/aplus"
              className="group flex flex-col justify-between rounded-xl border border-[color:var(--ct-ink)] bg-[color:var(--ct-ink)] p-6 text-white transition-opacity hover:opacity-90"
            >
              <p className="ct-h3">
                Aplus <span aria-hidden>→</span>
              </p>
              <p className="ct-small mt-3 text-white/70">
                다섯 축이 하나의 제품으로 어떻게 묶이는지 — 도입 구조와 운영 원칙까지.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
