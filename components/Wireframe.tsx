/**
 * @file Wireframe.tsx
 * @description 회전하는 와이어프레임과 사용자 모션 제어
 * @module components
 * @dependencies react, Wireframe.module.css
 */
"use client";
import { useState } from "react";
import styles from "./Wireframe.module.css";

export function Wireframe() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={styles.scene}>
      <div className={styles.stage} aria-hidden="true">
        <div className={`${styles.cube} ${paused ? styles.paused : ""}`}>
          {Array.from({ length: 6 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <span className={styles.center} />
      </div>
      <button
        className={styles.control}
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? "모션 재생" : "모션 정지"}{" "}
        <span aria-hidden>{paused ? "▷" : "Ⅱ"}</span>
      </button>
    </div>
  );
}
