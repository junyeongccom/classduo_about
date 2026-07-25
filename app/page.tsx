import ClickBurst from '@/components/ClickBurst';
import { SiteNav } from '@/components/SiteNav';

export default function Home() {
  return (
    <main className="relative w-full select-none bg-white">
      {/* 클릭 폭죽: 배경(z-0)에서 home_assets 에셋이 터져 채워짐 */}
      <ClickBurst />
      {/* 첫 화면: 풀 뷰포트 hero (푸터는 이 아래, 스크롤 시 노출) */}
      <div className="relative z-20 flex min-h-screen flex-col">
        {/* 상단 내비 */}
        <header>
          <SiteNav />
        </header>

        {/* 히어로 (정중앙): classduo.ai + 보트 + 태그라인 */}
        <div className="-mt-5 flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="flex flex-col items-center justify-center gap-[18px] md:flex-row md:gap-[clamp(14px,2.6vw,34px)]">
            <h1
              className="font-semibold leading-none tracking-[-0.03em] text-[#111315]"
              style={{ fontSize: 'clamp(38.4px, 7.2vw, 105.6px)' }}
            >
              classduo.ai
            </h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/duo-character.png"
              alt="classduo characters"
              className="block w-auto shrink-0 select-none"
              style={{ height: 'clamp(40px, 6.5vw, 78px)' }}
            />
          </div>
          <p
            className="font-[350] tracking-[0.057em] text-[#111315]"
            style={{ marginTop: 'clamp(40px, 6.8vh, 80px)', fontSize: 'clamp(18px, 2.4vw, 30px)' }}
          >
            Building Engaging AI Learning Platform
          </p>
        </div>

      </div>

      {/* 스크롤 내리면 보이는 푸터 (첫 화면 아래) — 사업자 정보 + 카피라이트 (MLP 푸터 기준) */}
      <footer className="relative z-20 border-t border-gray-100 bg-white px-6 py-10 text-[12px] leading-relaxed text-[#5b6168] md:px-10">
        <div className="flex flex-col gap-0.5">
          <p>
            <span className="font-medium text-[#111315]">주식회사 클래스듀오</span> | 대표: 윤건재 | 사업자등록번호: 124-87-60756
          </p>
          <p>주소: 서울특별시 성북구 안암로 145, 경영본관동 2층 227호(안암동5가, 고려대학교안암캠퍼스)</p>
          <p>전화: 02-6951-0048 | 이메일: admin@aplus.io.kr</p>
          <p className="text-[#8a9099]">© 2026 classduo.ai. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
