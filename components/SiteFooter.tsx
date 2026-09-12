/**
 * @file SiteFooter.tsx
 * @description 사업자 정보 + 카피라이트 푸터 — 홈과 서브페이지 공용. 폭·타입은 --ct-* 토큰.
 * @module components
 */

export function SiteFooter({ className = '' }: { className?: string }) {
  return (
    <footer
      className={`border-t border-[color:var(--ct-line-soft)] bg-white py-12 ${className}`}
    >
      <div className="ct-page ct-caption flex flex-col gap-1 text-[color:var(--ct-ink-3)]">
        <p>
          <span className="ct-strong text-[color:var(--ct-ink)]">주식회사 클래스듀오</span> |
          대표: 윤건재 | 사업자등록번호: 124-87-60756
        </p>
        <p>
          주소: 서울특별시 성북구 안암로 145, 경영본관동 2층 227호(안암동5가,
          고려대학교안암캠퍼스)
        </p>
        <p>전화: 02-6951-0048 | 이메일: admin@aplus.io.kr</p>
        <p className="mt-2 text-[color:var(--ct-ink-4)]">© 2026 classduo.ai. All rights reserved.</p>
      </div>
    </footer>
  );
}
