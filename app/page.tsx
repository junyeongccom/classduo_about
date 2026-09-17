/**
 * @file page.tsx
 * @description 가치 중심 메시지와 기하학 모션으로 구성한 클래스듀오 랜딩페이지
 * @module app
 * @dependencies SiteNav, SiteFooter, LearningField
 */
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { LearningField } from "@/components/LearningField";
import styles from "./landing.module.css";

const PILLARS = [
  {
    slug: "microlearning",
    label: "Microlearning",
    title: "작은 배움의 축적",
    text: "작게 시작한 이해가 더 깊은 배움으로 이어지도록.",
    symbol: "stack",
  },
  {
    slug: "test-based-learning",
    label: "Test-based Learning",
    title: "이해를 발견하는 순간",
    text: "스스로 확인하며 다음 배움의 방향을 찾도록.",
    symbol: "target",
  },
  {
    slug: "engagement",
    label: "Engagement",
    title: "계속하고 싶은 마음",
    text: "작은 성취가 배움을 이어가는 힘이 되도록.",
    symbol: "spark",
  },
  {
    slug: "conversational-learning",
    label: "Conversational Learning",
    title: "질문에서 열리는 가능성",
    text: "하나의 질문이 새로운 이해의 시작이 되도록.",
    symbol: "orbit",
  },
  {
    slug: "self-directed-learning",
    label: "Self-directed Learning",
    title: "스스로 만드는 방향",
    text: "각자의 속도와 선택으로 배움을 이끌어가도록.",
    symbol: "path",
  },
];

export default function Home() {
  return (
    <main className={styles.landing}>
      <header className={styles.header}>
        <SiteNav />
      </header>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.eyebrow}>
          <span>CLASSDUO — LEARNING, REIMAGINED</span>
          <span>배움의 새로운 가능성</span>
        </div>
        <LearningField />
        <div className={styles.heroCopy}>
          <p className={styles.label}>A NEW SHAPE OF LEARNING</p>
          <h1 id="home-title">
            하나의 수업,
            <br />
            저마다의 <span>가능성.</span>
          </h1>
          <div className={styles.heroBottom}>
            <p>
              같은 수업에서 시작해도, 배움의 길은 다릅니다.
              <br />
              우리는 AI로 각자의 이해가 깊어지는 학습을 만듭니다.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primary} href="/product/aplus">
                제품 알아보기 <span aria-hidden>↗</span>
              </Link>
              <a
                className={styles.secondary}
                href="mailto:admin@aplus.io.kr?subject=%5B%EB%8F%84%EC%9E%85%20%EB%AC%B8%EC%9D%98%5D%20classduo.ai"
              >
                도입 문의 <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.sectionEnd}>
          <span>함께 배우고, 다르게 성장하다.</span>
          <span aria-hidden>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      <section className={styles.evidence} aria-label="연구와 교육 현장의 기반">
        <p className={styles.label}>GROUNDED IN THE REAL WORLD</p>
        <div className={styles.evidenceGrid}>
          <div>
            <span className={styles.evidenceMark}>01 / RESEARCH</span>
            <h2>연구에서 시작해</h2>
            <p>학습을 이해하는 질문과 탐구</p>
          </div>
          <div>
            <span className={styles.evidenceMark}>02 / PRACTICE</span>
            <h2>교육 현장에서 배우고</h2>
            <p>실제 수업과 학습자의 경험</p>
          </div>
          <div>
            <span className={styles.evidenceMark}>03 / PROGRESS</span>
            <h2>다음 배움으로 잇습니다</h2>
            <p>연구와 현장이 함께 만드는 변화</p>
          </div>
        </div>
      </section>

      <section className={styles.research} aria-labelledby="research-title">
        <div className={styles.sectionHeading}>
          <span className={styles.label}>01 / RESEARCH</span>
          <span aria-hidden>↗</span>
        </div>
        <div className={styles.researchGrid}>
          <div className={styles.researchArt} aria-hidden="true">
            <div className={styles.artCaption}>CURIOSITY → UNDERSTANDING</div>
            <svg viewBox="0 0 460 400" fill="none">
              <path
                d="M0 200H460M230 0V400"
                stroke="currentColor"
                opacity=".25"
              />
              {[65, 100, 135, 170].map((r) => (
                <circle key={r} cx="230" cy="200" r={r} stroke="currentColor" />
              ))}
              <path d="M60 330 230 200 385 60" stroke="currentColor" />
              <circle cx="230" cy="200" r="14" fill="currentColor" />
              <circle
                cx="385"
                cy="60"
                r="7"
                fill="#e9a3b3"
                stroke="currentColor"
              />
            </svg>
            <span className={styles.artFoot}>
              질문 하나가 넓히는 세계. <span>FIG. 02</span>
            </span>
          </div>
          <div className={styles.researchCopy}>
            <h2 id="research-title">
              더 좋은 배움은
              <br />더 좋은 질문에서.
            </h2>
            <p>
              아직 말이 되지 못한 궁금함에도 배움의 가능성이 있습니다. 우리는
              질문과 이해 사이의 거리를 좁히는 방법을 연구합니다.
            </p>
            <Link
              className={styles.textLink}
              href="/research/predictive-query-management"
            >
              우리의 연구 알아보기 <span aria-hidden>↗</span>
            </Link>
            <div className={styles.publications}>
              <span>RESEARCH PRESENTED AT</span>
              <p>
                CIKM 2025 <i> / </i> ACL 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features} aria-labelledby="features-title">
        <div className={styles.sectionHeading}>
          <span className={styles.label}>02 / FEATURE</span>
          <span className={styles.label}>MANY WAYS TO GROW</span>
        </div>
        <div className={styles.featureIntro}>
          <h2 id="features-title">
            배움의 방식은,
            <br />
            하나가 아니니까.
          </h2>
          <p>
            서로 다른 다섯 가지 접근.
            <br />
            각자의 가능성을 여는 하나의 경험.
          </p>
        </div>
        <div className={styles.cards}>
          {PILLARS.map((p, index) => (
            <Link
              key={p.slug}
              href={`/feature/${p.slug}`}
              className={styles.card}
            >
              <div className={styles.cardTop}>
                <span>0{index + 1}</span>
                <span aria-hidden>↗</span>
              </div>
              <div
                className={`${styles.symbol} ${styles[p.symbol]}`}
                aria-hidden="true"
              >
                <i />
                <i />
                <i />
                <i />
              </div>
              <span className={styles.cardLabel}>{p.label}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Link>
          ))}
          <Link
            href="/product/aplus"
            className={`${styles.card} ${styles.productCard}`}
          >
            <div className={styles.cardTop}>
              <span>THE EXPERIENCE</span>
              <span aria-hidden>↗</span>
            </div>
            <div className={styles.productWord}>
              A<span>+</span>
            </div>
            <span className={styles.cardLabel}>Aplus by classduo</span>
            <h3>가능성이 일상이 되는 곳.</h3>
            <p>우리의 생각을 하나의 학습 경험으로.</p>
          </Link>
        </div>
      </section>
      <SiteFooter className={styles.footer} />
    </main>
  );
}
