/**
 * @file ScrollMotion.tsx
 * @description 화면에 들어온 콘텐츠를 한 번만 드러내는 점진적 모션 강화
 * @module components
 * @dependencies react, next/navigation
 */
"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function ScrollMotion() {
  const pathname = usePathname();
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = marker.current?.parentElement;
    if (!root || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          target.setAttribute("data-visible", "true");
          observer.unobserve(target);
        });
      },
      { threshold: 0.08 },
    );
    const reset = () => {
      observer.disconnect();
      targets.forEach((target) => {
        target.removeAttribute("data-pending");
        target.removeAttribute("data-visible");
        if (!preference.matches) {
          target.setAttribute("data-pending", "true");
          observer.observe(target);
        }
      });
    };
    reset();
    preference.addEventListener("change", reset);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", reset);
      targets.forEach((target) => target.removeAttribute("data-pending"));
    };
  }, [pathname]);
  return <span ref={marker} hidden aria-hidden="true" />;
}
