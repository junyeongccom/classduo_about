import Link from 'next/link';

export default function Corporate() {
  return (
    <div className="min-h-screen bg-white">
      {/* 메인 콘텐츠 */}
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* 로고 */}
        <h1 className="mb-8 text-6xl font-light tracking-wide text-[#333] md:text-8xl">
          Corporate Info
        </h1>
        
        {/* 준비 중 메시지 */}
        <p className="mb-12 max-w-2xl text-lg font-light leading-relaxed text-[#666] md:text-xl">
          Preparing...
        </p>
        
        {/* 홈으로 돌아가기 버튼 */}
        <div>
          <Link
            href="/"
            className="group relative overflow-hidden rounded-full border border-[#333] px-8 py-3 text-[#333] bg-white transition-all duration-300 hover:bg-[#333] hover:text-white"
          >
            <span className="relative z-10">← Back to Home</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
