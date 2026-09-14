/* eslint-disable @next/next/no-img-element */
/**
 * @file ShotMarquee.tsx
 * @description 제품 화면 캡쳐가 가로로 흐르는 띠. 트랙을 2벌 복제해 CSS 로만 무한 루프한다
 *              (JS 없음 → 스크롤 성능·SSR 영향 없음). 마우스를 올리면 멈추고,
 *              prefers-reduced-motion 에서는 자동 이동 대신 손으로 넘기는 스크롤이 된다.
 *
 *              ⚠️ 여기 들어가는 캡쳐는 대외 공개용으로 가공된 것만 쓴다 —
 *              기관 엠블럼·계정 이메일·과목명이 있는 상단 크롬은 잘라낸 상태여야 하고,
 *              고객사 강의자료 원문이 보이는 화면은 넣지 않는다.
 * @module components
 */

export type Shot = { src: string; label: string };

export function ShotMarquee({ items }: { items: Shot[] }) {
  // 2벌 복제 — keyframes 의 translateX(-50%) 가 정확히 한 벌만큼 이동한다.
  const track = [...items, ...items];

  return (
    <div className="ct-marquee ct-bleed py-2">
      <div className="ct-marquee-track">
        {track.map((shot, i) => {
          const isClone = i >= items.length;
          return (
            <figure key={i} className="m-0 shrink-0" aria-hidden={isClone || undefined}>
              <img
                src={shot.src}
                alt={isClone ? '' : shot.label}
                loading={i > 2 ? 'lazy' : undefined}
                draggable={false}
                className="h-[240px] w-auto rounded-xl border border-[color:var(--ct-line)] bg-white object-cover object-left-top shadow-[0_10px_30px_rgba(17,19,21,0.07)] md:h-[400px]"
              />
              <figcaption className="ct-caption mt-3 text-[color:var(--ct-ink-4)]">
                {shot.label}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
