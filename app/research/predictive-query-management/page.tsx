/**
 * @file page.tsx
 * @description 연구 목적과 공개 학회 이력을 소개하는 페이지
 * @module app/research
 * @dependencies PageShell
 */
/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { NextLinks, PageShell, Section } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Research — classduo.ai",
  description:
    "더 많은 학습자에게 배움의 기회가 닿도록, 교육 현장과 함께 이어가는 연구.",
};
export default function PredictiveQueryManagement() {
  return (
    <PageShell
      kicker="Research"
      title="더 좋은 배움은, 더 좋은 질문에서"
      subtitle="Predictive Query Management"
      lead="아직 말이 되지 못한 궁금함에도 배움의 가능성이 있습니다. 우리는 질문과 이해 사이의 거리를 좁히는 방법을 연구합니다."
    >
      <Section title="질문 이전의 궁금함" index={1}>
        <p>
          배움의 어려움은 언제나 명확한 질문의 모습으로 드러나지는 않습니다.
          무엇이 궁금한지 말하기 어려운 순간에도 학습 지원이 닿을 수 있을까요?
          우리의 연구는 이 질문에서 출발합니다.
        </p>
      </Section>
      <Section title="학습자의 경험에서 출발합니다" index={2}>
        <p>
          Predictive Query Management는 학습자가 도움에 더 쉽게 다가갈 수 있는
          가능성을 탐구합니다. 기술 그 자체보다, 궁금함을 발견하고 이해를
          넓혀가는 학습자의 경험에 관심을 둡니다.
        </p>
      </Section>
      <Section title="교육 현장과 이어지는 연구" index={3}>
        <p>
          대학 교육 현장에서 얻은 경험을 바탕으로 연구를 이어가고 있습니다. 관련
          논문은 CIKM 2025와 ACL 2026 Industry Track에 채택되었습니다.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <img
            src="/research/cikm-2025.png"
            alt="CIKM 2025"
            className="w-full border border-[color:var(--ct-line)]"
          />
          <img
            src="/research/acl-2026.png"
            alt="ACL 2026"
            className="w-full border border-[color:var(--ct-line)]"
          />
        </div>
      </Section>
      <Section title="함께 넓혀가는 가능성" index={4}>
        <p>
          우리는 연구와 교육 현장이 서로에게 질문을 던질 때 더 좋은 학습 경험이
          만들어진다고 믿습니다. 더 많은 학습자에게 배움의 기회가 닿도록 탐구를
          이어갑니다.
        </p>
      </Section>
      <NextLinks
        items={[
          {
            label: "Conversational Learning",
            href: "/feature/conversational-learning",
            caption: "질문과 대화로 넓어지는 배움",
          },
          {
            label: "Aplus",
            href: "/product/aplus",
            caption: "교육 현장으로 이어지는 학습 경험",
          },
        ]}
      />
    </PageShell>
  );
}
