/**
 * @file LearningField.tsx
 * @description 배움의 분화를 표현하는 SVG 그래픽과 모션 일시정지 제어
 * @module components
 * @dependencies react, landing.module.css
 */
"use client";
import { useState } from "react";
import styles from "@/app/landing.module.css";

export function LearningField() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`${styles.field} ${paused ? styles.paused : ""}`}>
      <svg
        viewBox="0 0 1200 290"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="learning-grid"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M30 0H0V30"
              fill="none"
              stroke="#263c38"
              strokeOpacity=".16"
            />
          </pattern>
          <pattern
            id="learning-lines"
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(30)"
          >
            <path d="M0 0V7" stroke="#263c38" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1200" height="290" fill="#bdcbc0" />
        <rect width="390" height="290" fill="#dfa0b0" />
        <rect x="810" width="390" height="290" fill="#dedfc3" />
        <rect width="1200" height="290" fill="url(#learning-grid)" />
        <g
          className={styles.fieldLines}
          fill="none"
          stroke="#263c38"
          strokeWidth="1.2"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              d={`M-40 ${i * 30 - 30} C210 ${i * 24 - 20}, 310 ${145 + (i - 6) * 4}, 590 145 S920 ${i * 27 - 20}, 1240 ${i * 32 - 30}`}
            />
          ))}
        </g>
        <g className={styles.fieldOrbit} stroke="#263c38" fill="none">
          {[42, 65, 88, 111, 134].map((r) => (
            <ellipse key={r} cx="600" cy="145" rx={r} ry="125" />
          ))}
          <circle cx="600" cy="145" r="125" />
          <path d="M475 145H725M600 20V270" />
        </g>
        <circle
          cx="208"
          cy="145"
          r="72"
          fill="url(#learning-lines)"
          stroke="#263c38"
        />
        <circle
          className={styles.fieldDot}
          cx="600"
          cy="145"
          r="10"
          fill="#263c38"
        />
        <g className={styles.fieldSquares} fill="none" stroke="#263c38">
          <rect x="914" y="65" width="160" height="160" />
          <rect x="936" y="87" width="116" height="116" />
          <path d="m914 65 160 160m0-160L914 225" />
          <circle cx="994" cy="145" r="58" />
        </g>
      </svg>
      <button
        type="button"
        className={styles.motionToggle}
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? "모션 재생" : "모션 정지"}{" "}
        <span aria-hidden>{paused ? "▷" : "Ⅱ"}</span>
      </button>
    </div>
  );
}
