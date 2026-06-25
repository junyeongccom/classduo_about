import BoidsBackground from '../components/BoidsBackground';

// 노션 "첫화면 프롬프트" 기준 내비 (각 항목 드롭다운)
const navItems = [
  { label: 'Research', items: ['Predictive Query Management'] },
  {
    label: 'Feature',
    items: [
      'Microlearning',
      'Test-based Learning',
      'Engagement',
      'Conversational Learning',
      'Self-directed Learning',
    ],
  },
  { label: 'Product', items: ['Aplus'] },
  { label: 'Character', items: ['2026'] },
  { label: 'Game', items: ['Running', 'Puzzle'] },
];

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-white">
      {/* 배경: 떠다니는 보트 (클릭 시 버스트) */}
      <BoidsBackground />

      {/* 콘텐츠 레이어 — 기본은 클릭이 캔버스로 통과(보트 버스트), 내비만 인터랙티브 */}
      <div className="pointer-events-none relative z-20 flex h-full flex-col">
        {/* 상단 내비 */}
        <header>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 py-8 text-[16px] font-medium md:gap-x-[clamp(28px,5vw,76px)]">
            {navItems.map((item) => (
              <div key={item.label} className="group pointer-events-auto relative">
                <span className="inline-flex cursor-pointer items-center gap-1.5 py-1.5 text-[#111315] transition-colors duration-200 group-hover:text-[#55BA8A]">
                  {item.label}
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-2.5 w-2.5 opacity-55 transition-transform duration-200 group-hover:rotate-180 group-hover:opacity-100"
                  >
                    <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>

                {/* 드롭다운 */}
                <div className="invisible absolute left-1/2 top-full min-w-[200px] -translate-x-1/2 translate-y-1.5 rounded-xl border border-[#e7eae8] bg-white p-2 opacity-0 shadow-[0_12px_34px_rgba(17,19,21,0.08)] transition-all duration-200 group-hover:visible group-hover:translate-y-2.5 group-hover:opacity-100">
                  {item.items.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className="block whitespace-nowrap rounded-lg px-3 py-2.5 text-[14px] font-normal text-[#5b6168] transition-colors duration-150 hover:bg-[#55BA8A]/10 hover:text-[#55BA8A]"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
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
            <svg
              viewBox="0 0 580 300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              role="img"
              aria-label="classduo boat"
              className="block h-auto shrink-0"
              style={{ width: 'clamp(110px, 15vw, 200px)', transform: 'rotate(-32deg)' }}
            >
              <path
                fillRule="evenodd"
                fill="#1E9E57"
                d="M40 92 C72 80 140 80 250 82 C350 84 420 90 470 106 C508 120 536 138 552 150 C536 162 508 180 470 194 C420 210 350 216 250 218 C140 220 72 220 40 208 C24 202 24 192 66 196 C110 198 180 200 250 200 C350 198 415 194 462 182 C498 170 518 158 524 150 C518 142 498 130 462 118 C415 106 350 102 250 100 C180 100 110 102 66 104 C24 108 24 98 40 92 Z"
              />
              <path
                fill="#D2EEDD"
                stroke="#1E9E57"
                strokeWidth="2.6"
                d="M140 114 L300 112 L324 112 L346 124 L346 176 L324 188 L300 188 L140 186 Q132 186 132 178 L132 122 Q132 114 140 114 Z"
              />
              <path fill="#1E9E57" d="M84 126 L116 126 Q122 126 122 132 L122 168 Q122 174 116 174 L84 174 Q78 174 78 168 L78 132 Q78 126 84 126 Z" />
              <path fill="#1E9E57" d="M60 138 L78 138 L78 162 L60 162 Q54 162 54 156 L54 144 Q54 138 60 138 Z" />
              <path stroke="#1E9E57" strokeWidth="3" d="M54 150 L44 150" />
            </svg>
          </div>
          <p
            className="font-light tracking-[-0.01em] text-[#111315]"
            style={{ marginTop: 'clamp(40px, 6.8vh, 80px)', fontSize: 'clamp(18px, 2.4vw, 30px)' }}
          >
            Building Engaging AI Learning Platform
          </p>
        </div>

        {/* 하단 좌측: 위치 + 카피라이트 */}
        <footer className="flex items-end justify-between px-6 pb-7 text-[13px] leading-relaxed text-[#5b6168] md:px-10">
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-[#111315]">Seoul, Korea</span>
            <span>© 2026 classduo.ai</span>
          </div>
          <div />
        </footer>
      </div>
    </main>
  );
}
