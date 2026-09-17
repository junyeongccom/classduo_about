/**
 * @file page.tsx
 * @description Product > Aplus — 대학 강의용 AI 학습 플랫폼 소개.
 * @module app/product
 */
import type { Metadata } from "next";
import {
  CardGrid,
  NextLinks,
  PageShell,
  Section,
  StatStrip,
} from "@/components/PageShell";
import { FEATURES } from "@/lib/features";

const ACCENT = "#223c37";
const DESCRIPTION =
  "수업과 배움의 가능성을 넓히는 대학 교육을 위한 AI 학습 플랫폼, Aplus.";
export const metadata: Metadata = {
  title: "Aplus — classduo.ai",
  description: DESCRIPTION,
  openGraph: { title: "Aplus — classduo.ai", description: DESCRIPTION },
};

export default function AplusPage() {
  return (
    <PageShell
      kicker="Product"
      title="수업의 가능성을, 각자의 배움으로"
      subtitle="Aplus"
      lead="Aplus는 대학 교육을 위한 AI 학습 플랫폼입니다. 학생에게는 더 가까운 배움을, 교수자에게는 교육에 집중할 여유를, 대학에는 새로운 학습 경험의 가능성을 더합니다."
      accent={ACCENT}
    >
      <StatStrip
        accent={ACCENT}
        items={[
          { value: "학생", label: "자신의 속도로 깊어지는 이해" },
          { value: "교수자", label: "배움에 더 가까이 다가가는 교육" },
          { value: "대학", label: "함께 넓혀가는 교육의 가능성" },
        ]}
      />
      <Section
        title="수업에 자연스럽게 더해지는 변화"
        index={1}
        accent={ACCENT}
      >
        <p>
          좋은 기술은 교육의 본질에 집중할 수 있도록 도와야 합니다. 익숙한
          수업의 가치를 이어가면서, 학생과 교수자가 새로운 학습 경험을 만날 수
          있도록 돕습니다.
        </p>
      </Section>
      <Section title="서로 다른 관점, 하나의 배움" index={2} accent={ACCENT}>
        <CardGrid
          items={[
            {
              title: "학생을 위해",
              body: "궁금한 순간에 도움을 얻고, 자신에게 맞는 속도로 이해를 넓혀갑니다.",
            },
            {
              title: "교수자를 위해",
              body: "학생의 배움에 관심을 기울이고 수업의 가능성을 확장할 수 있도록 돕습니다.",
            },
            {
              title: "대학을 위해",
              body: "교육 현장의 다양한 요구를 함께 살피며 지속 가능한 활용 방향을 모색합니다.",
            },
          ]}
        />
      </Section>
      <Section title="수업이 끝나도 이어지는 배움" index={3} accent={ACCENT}>
        <p>
          교실에서 시작된 호기심이 수업 밖에서도 이어지기를 바랍니다. 배운 것을
          돌아보고, 궁금함을 풀고, 스스로 이해하는 시간이 하나의 학습 경험으로
          이어집니다.
        </p>
      </Section>
      <Section title="교육 현장마다 다른 가능성" index={4} accent={ACCENT}>
        <p>
          대학과 수업마다 교육의 목표와 환경이 다릅니다. 하나의 방식을
          강요하기보다 각 현장에 필요한 경험을 함께 고민합니다. 도입과 활용에
          관한 구체적인 내용은 상담을 통해 안내합니다.
        </p>
      </Section>
      <Section title="연구와 현장에서 배웁니다" index={5} accent={ACCENT}>
        <p>
          학습자를 이해하려는 연구와 실제 교육 현장의 경험을 함께 살핍니다.
          새로운 가능성을 탐구하면서도, 확인된 결과와 앞으로 답해야 할 질문을
          구분하며 나아갑니다.
        </p>
        <p>관련 연구는 CIKM 2025와 ACL 2026 Industry Track에 채택되었습니다.</p>
      </Section>
      <Section title="우리가 중요하게 생각하는 것" index={6} accent={ACCENT}>
        <CardGrid
          items={[
            {
              title: "학습의 의미",
              body: "기술의 새로움보다 학습자에게 어떤 도움이 되는지를 먼저 생각합니다.",
            },
            {
              title: "신뢰와 책임",
              body: "교육 현장에서 신뢰할 수 있는 경험을 만들기 위해 노력합니다.",
            },
            {
              title: "오래 이어지는 변화",
              body: "일시적인 시도를 넘어 현장에서 지속할 수 있는 활용을 고민합니다.",
            },
          ]}
        />
        <a
          href="mailto:admin@aplus.io.kr?subject=Aplus%20도입%20문의"
          className="ct-small ct-strong mt-8 inline-block underline underline-offset-4"
        >
          우리 교육 현장에 맞는 도입 상담 →
        </a>
      </Section>
      <NextLinks
        accent={ACCENT}
        items={FEATURES.map((f) => ({
          label: f.nav,
          href: `/feature/${f.slug}`,
          caption: f.summary,
        }))}
      />
    </PageShell>
  );
}
