/**
 * @file page.tsx
 * @description Feature 메뉴 5개 페이지 — lib/features.ts 데이터를 PageShell 프리미티브로 렌더.
 * @module app/feature
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Bullets,
  CardGrid,
  Footnote,
  NextLinks,
  PageShell,
  Section,
  StatStrip,
  Steps,
} from '@/components/PageShell';
import { FEATURES, FEATURE_BY_SLUG, type Block } from '@/lib/features';

export function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feature = FEATURE_BY_SLUG[slug];
  if (!feature) return {};
  return {
    title: `${feature.subtitle} — classduo.ai`,
    description: feature.summary,
    openGraph: {
      title: `${feature.subtitle} — classduo.ai`,
      description: feature.summary,
    },
  };
}

function renderBlock(block: Block, accent: string, key: number) {
  switch (block.kind) {
    case 'para':
      return <p key={key}>{block.text}</p>;
    case 'bullets':
      return <Bullets key={key} items={block.items} accent={accent} />;
    case 'cards':
      return <CardGrid key={key} items={block.items} />;
    case 'steps':
      return <Steps key={key} items={block.items} accent={accent} />;
  }
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = FEATURE_BY_SLUG[slug];
  if (!feature) notFound();

  const others = FEATURES.filter((f) => f.slug !== feature.slug);

  return (
    <PageShell
      kicker="Feature"
      title={feature.title}
      subtitle={feature.subtitle}
      lead={feature.lead}
      icon={feature.icon}
      accent={feature.accent}
    >
      <StatStrip items={feature.stats} accent={feature.accent} />

      {feature.sections.map((section, i) => (
        <Section key={section.title} title={section.title} index={i + 1} accent={feature.accent}>
          {section.blocks.map((block, j) => renderBlock(block, feature.accent, j))}
        </Section>
      ))}

      {feature.footnote && <Footnote>{feature.footnote}</Footnote>}

      <NextLinks
        accent={feature.accent}
        items={others.map((f) => ({
          label: f.nav,
          href: `/feature/${f.slug}`,
          caption: f.summary,
        }))}
      />
    </PageShell>
  );
}
