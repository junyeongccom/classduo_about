import BoidsBackground from '../components/BoidsBackground';

const services = [
  {
    icon: '🤖',
    title: 'AI 튜터링',
    description: '대화형 AI 튜터가 학생 개개인의 수준에 맞춰 실시간으로 학습을 지원합니다. 스트리밍 기반 자연스러운 대화로 깊이 있는 학습이 가능합니다.',
  },
  {
    icon: '🎙️',
    title: '강의 녹음 분석',
    description: '강의 녹음을 자동으로 전사하고, 핵심 키워드를 추출하며, 학습 가능한 콘텐츠로 자동 변환합니다.',
  },
  {
    icon: '📊',
    title: '교수자 대시보드',
    description: '강의 관리, 퀴즈 출제, 학생 성과 분석까지 하나의 플랫폼에서 관리합니다.',
  },
  {
    icon: '📚',
    title: '학습자 스터디스페이스',
    description: '강의자료 학습, AI 대화학습까지 통합된 학습 환경을 제공합니다.',
  },
  {
    icon: '🎮',
    title: '게임 기반 학습',
    description: '게이미피케이션 학습 모듈을 통해 학습 동기를 부여하고, 보상 시스템으로 지속적인 참여를 유도합니다.',
  },
  {
    icon: '⚡',
    title: 'AI 콘텐츠 자동생성',
    description: 'PDF 등 학습 자료를 업로드하면 AI가 퀴즈, 플래시카드, 요약본을 자동으로 생성합니다.',
  },
];

const achievements = [
  {
    year: '2025 1학기',
    title: '고려대학교 SW프로그래밍의 기초 수업 도입',
    description: '700명 규모 수업에 Classduo 플랫폼 도입',
  },
  {
    year: '2025 2학기',
    title: '고려대학교 교양한국어 AI 교육콘텐츠 개발',
    description: 'AI 기반 교양한국어 학습 콘텐츠 개발 및 적용',
  },
  {
    year: '2026 1학기',
    title: '고려대학교 생명과학의 세계 대규모 수업 적용',
    description: '신입생 필수 교양 2,500명 대규모 수업 적용',
  },
  {
    year: '논문 성과',
    title: '국제 학술 논문 게재',
    description: 'CIKM 2025, ACL Industry 2026 논문 채택',
  },
];

export default function Home() {
  return (
    <div className="relative bg-white">
      {/* ===== Hero Section ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <BoidsBackground />
        <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
          <div className="mb-6 w-full max-w-sm md:max-w-xl px-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/classduo 글자 로고.png"
              alt="Classduo"
              width={2160}
              height={296}
              className="w-full h-auto"
            />
          </div>
          <p className="mb-4 text-xl font-light text-[#555] md:text-2xl">
            AI로 대학 교육을 혁신합니다
          </p>
          <p className="mb-8 max-w-2xl text-base font-light leading-relaxed text-[#888] md:text-lg">
            맞춤형 AI 튜터링, 강의 분석, 적응형 학습 솔루션으로<br />
            대학 교육의 새로운 패러다임을 만듭니다.
          </p>
          <div className="mb-10 w-full max-w-md md:max-w-xl overflow-hidden rounded-2xl shadow-xl pointer-events-auto">
            <video
              src="/5.에이플러스_MASTER_TXTED.mp4"
              controls
              controlsList="nodownload noplaybackrate noremoteplayback"
              disablePictureInPicture
              preload="metadata"
              playsInline
              className="w-full h-auto"
            />
          </div>
          <div className="flex gap-4 pointer-events-auto">
            <a
              href="https://korea.aplus.io.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#333] px-8 py-3 text-white text-sm font-medium transition-all duration-300 hover:bg-[#111]"
            >
              서비스 접속
            </a>
            <a
              href="#contact"
              className="rounded-full border border-[#333] px-8 py-3 text-[#333] text-sm font-medium bg-white transition-all duration-300 hover:bg-[#333] hover:text-white"
            >
              문의하기
            </a>
          </div>
        </div>
        {/* 스크롤 유도 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <a href="#about" className="animate-bounce-slow inline-block text-[#aaa]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </a>
        </div>
      </section>

      {/* ===== About Section ===== */}
      <section id="about" className="py-24 md:py-32 bg-[#f9fafb]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-semibold text-[#222] md:text-4xl">
            About Classduo
          </h2>
          <div className="mx-auto mb-8 h-1 w-12 bg-[#333]" />
          <p className="mb-8 text-lg leading-relaxed text-[#555] md:text-xl">
            Classduo는 AI 기술을 활용하여 대학 교육을 혁신하는 에듀테크 기업입니다.
          </p>
          <p className="text-base leading-relaxed text-[#777] md:text-lg">
            우리는 대학 교육이 더 재미있고, 효과적이며,<br className="hidden md:inline" />
            동기를 부여하는 경험이 되어야 한다고 믿습니다.<br /><br />
            AI 튜터링, 적응형 학습, 강의 녹음 분석 등의 기술을 통해<br className="hidden md:inline" />
            교수자와 학습자 모두에게 최적화된 교육 환경을 제공합니다.<br className="hidden md:inline" />
            대학 기관을 위한 맞춤형 솔루션을 통해<br className="hidden md:inline" />
            데이터 기반의 과학적인 학습을 실현하고 있습니다.
          </p>
        </div>
      </section>

      {/* ===== Services Section ===== */}
      <section id="services" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-3xl font-semibold text-[#222] md:text-4xl">
              Services
            </h2>
            <div className="mx-auto mb-8 h-1 w-12 bg-[#333]" />
            <p className="text-lg text-[#666]">
              대학 기관을 위한 AI 기반 교육 솔루션
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-[#e5e7eb] bg-white p-8 transition-all duration-300 hover:shadow-lg hover:border-[#ccc]"
              >
                <div className="mb-4 text-3xl">{service.icon}</div>
                <h5 className="mb-3 text-lg font-semibold text-[#333]">
                  {service.title}
                </h5>
                <p className="text-sm leading-relaxed text-[#666]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Achievements Section ===== */}
      <section id="achievements" className="py-24 md:py-32 bg-[#f9fafb]">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-3xl font-semibold text-[#222] md:text-4xl">
              Achievements
            </h2>
            <div className="mx-auto mb-8 h-1 w-12 bg-[#333]" />
            <p className="text-lg text-[#666]">
              Classduo의 주요 성과
            </p>
          </div>

          <div className="relative">
            {/* 타임라인 세로선 */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[#ddd] md:left-1/2 md:-translate-x-px" />

            <div className="space-y-12">
              {achievements.map((item, index) => (
                <div
                  key={item.title}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* 타임라인 점 */}
                  <div className="absolute left-4 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[#333] md:left-1/2" />

                  {/* 콘텐츠 */}
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}>
                    <span className="inline-block mb-2 rounded-full bg-[#333] px-4 py-1 text-xs font-medium text-white">
                      {item.year}
                    </span>
                    <h4 className="mb-2 text-lg font-semibold text-[#333]">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#666]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contact / Footer Section ===== */}
      <section id="contact" className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-semibold text-[#222] md:text-4xl">
            Contact
          </h2>
          <div className="mx-auto mb-8 h-1 w-12 bg-[#333]" />
          <p className="mb-12 text-lg text-[#666]">
            Classduo에 대해 더 알고 싶으시면 연락해 주세요.
          </p>

          <div className="mb-16 grid gap-8 md:grid-cols-3">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#999]">
                Email
              </p>
              <p className="text-[#333]">alex@classduo.ai.kr<br />cto@classduo.ai.kr</p>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#999]">
                Address
              </p>
              <p className="text-[#333]">서울특별시 성북구 안암로 145<br />고려대학교 경영본관 2층</p>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#999]">
                Phone
              </p>
              <p className="text-[#333]">010-3455-5341</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-[#eee] py-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm text-[#999]">
            &copy; {new Date().getFullYear()} Classduo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
