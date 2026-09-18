/**
 * @file ImpactHero.tsx
 * @description 실제 수업의 집단 비교와 설문 성과를 보여주는 첫 화면
 * @module components
 * @dependencies react, next/link, ImpactHero.module.css
 */
"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./ImpactHero.module.css";

export function ImpactHero() {
  const [paused, setPaused] = useState(false);
  return (
    <section
      className={`${styles.hero} ${paused ? styles.paused : ""}`}
      aria-labelledby="home-title"
    >
      <div className={styles.topline}>
        <span>CLASSDUO / LEARNING IN THE REAL WORLD</span>
        <span>FIELD NOTES — 2026</span>
      </div>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span aria-hidden>✳</span> 실제 수업에서 만난 배움의 가능성
          </p>
          <h1 id="home-title">
            배움의 차이가,
            <br />
            <span>성취의 차이로.</span>
          </h1>
          <p className={styles.description}>
            더 깊이 이해하고, 더 멀리 나아가도록.
            <br />
            AI와 함께한 배움의 가능성을
            <br className={styles.mobileBreak} /> 교육 현장의 숫자로
            이야기합니다.
          </p>
          <div className={styles.actions}>
            <Link href="/product/aplus">
              제품 알아보기 <span aria-hidden>↗</span>
            </Link>
            <a href="mailto:admin@aplus.io.kr?subject=%5B%EB%8F%84%EC%9E%85%20%EB%AC%B8%EC%9D%98%5D%20classduo.ai">
              도입 문의 <span aria-hidden>↗</span>
            </a>
          </div>
          <p className={styles.context}>
            서울 주요 대학 3,000명 규모 단일 강좌
            <br />
            <span>2026년 수업 운영 성과</span>
          </p>
        </div>
        <div className={styles.visual}>
          <div className={styles.halo} aria-hidden="true" />
          <svg
            className={styles.orbit}
            viewBox="0 0 500 480"
            fill="none"
            aria-hidden="true"
          >
            <g stroke="currentColor" strokeWidth=".8">
              {[0, 30, 60, 90, 120, 150].map((angle) => (
                <ellipse
                  key={angle}
                  cx="250"
                  cy="240"
                  rx="218"
                  ry="90"
                  transform={`rotate(${angle} 250 240)`}
                />
              ))}
              <circle cx="250" cy="240" r="218" />
            </g>
          </svg>
          <div className={styles.window}>
            <div className={styles.windowBar}>
              <span>01 / LEARNING OUTCOMES</span>
              <span aria-hidden>− □ ×</span>
            </div>
            <div className={styles.windowBody}>
              <p className={styles.chartLabel}>Aplus 사용자 집단의 평균 점수</p>
              <div className={styles.score}>
                +13<span>점</span>
                <span className={styles.arrow} aria-hidden>
                  ↗
                </span>
              </div>
              <p className={styles.comparison}>미사용자 집단 대비</p>
              <div
                className={styles.chart}
                aria-label="평균 점수: Aplus 사용자 56.9점, 미사용자 43.9점"
              >
                <div className={styles.barGroup}>
                  <strong>56.9</strong>
                  <div className={styles.bar} style={{ height: 114 }} />
                  <span>Aplus 사용자</span>
                </div>
                <div className={styles.barGroup}>
                  <strong>43.9</strong>
                  <div
                    className={`${styles.bar} ${styles.otherBar}`}
                    style={{ height: 88 }}
                  />
                  <span>미사용자</span>
                </div>
              </div>
            </div>
            <div className={styles.windowFoot}>
              <span>서로 다른 배움, 더 넓은 가능성.</span>
              <span aria-hidden>✳</span>
            </div>
          </div>
          <button
            type="button"
            className={styles.motion}
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? "모션 재생" : "모션 정지"}{" "}
            <span aria-hidden>{paused ? "▷" : "Ⅱ"}</span>
          </button>
        </div>
      </div>
      <div className={styles.proof}>
        <div className={styles.proofIntro}>
          <span>BEYOND THE SCORE</span>
          <p>
            성취를 넘어,
            <br />
            배움의 경험까지.
          </p>
        </div>
        <div className={styles.metric}>
          <p>학습자 설문 긍정 응답</p>
          <strong>
            95.3<span>%</span>
          </strong>
          <small>대학 본부 공식 설문 · 226명 참여</small>
        </div>
        <div className={styles.metric}>
          <p>50점 미만 학습자 비율</p>
          <strong>
            14.7<span>%</span>
            <em>vs 59.4%</em>
          </strong>
          <small>Aplus 사용자 집단 vs 미사용자 집단</small>
        </div>
      </div>
      <details className={styles.sources}>
        <summary>
          성과 수치와 조사 기준 <span aria-hidden>＋</span>
        </summary>
        <div>
          <p>
            출처: 2026년 서울 주요 대학 3,000명 규모 단일 강좌 운영 성과 자료.
          </p>
          <p>
            평균 점수는 Aplus 사용자 56.9점, 미사용자 43.9점으로 13점
            차이입니다. 50점 미만 비율은 각각 14.7%, 59.4%로 44.7%p 차이입니다.
            동일 수업의 집단 비교이며, 개인의 사전·사후 점수 상승이나 인과효과를
            의미하지 않습니다.
          </p>
          <p>
            95.3%는 대학 본부 혁신지원사업단 공식 학습자 설문(226명 참여)의 긍정
            응답률입니다. 별도 학부대학 설문(105명 참여)의 긍정 응답률은
            94.8%입니다. 두 설문은 합산하지 않았습니다.
          </p>
        </div>
      </details>
    </section>
  );
}
