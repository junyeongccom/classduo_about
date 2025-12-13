import BoidsBackground from '../components/BoidsBackground';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Boids 배경 애니메이션 */}
      <BoidsBackground />
      
      {/* 메인 콘텐츠 */}
      <main className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center pointer-events-none">
        {/* 로고 */}
        <h1 className="mb-8 text-6xl font-light tracking-wide text-[#333] md:text-8xl">
        classduo.ai
        </h1>
        
        {/* 소개 문구 */}
        <p className="mb-12 max-w-3xl text-lg font-light leading-relaxed text-[#666] md:text-xl">
        We make product for college education innovation.<br />
We want college learning to be more fun, effective and motivating experience.
        </p>
        
        {/* 링크들 */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8 pointer-events-auto">
          <Link
            href="/blog"
            className="group relative overflow-hidden rounded-full border border-[#333] px-8 py-3 text-[#333] bg-white transition-all duration-300 hover:bg-[#333] hover:text-white"
          >
            <span className="relative z-10">Blog</span>
          </Link>
          
          <Link
            href="/careers"
            className="group relative overflow-hidden rounded-full border border-[#666] px-8 py-3 text-[#666] bg-white transition-all duration-300 hover:bg-[#333] hover:text-white hover:border-[#333]"
          >
            <span className="relative z-10">Careers</span>
          </Link>
          
          <Link
            href="/corporate"
            className="group relative overflow-hidden rounded-full border border-[#666] px-8 py-3 text-[#666] bg-white transition-all duration-300 hover:bg-[#333] hover:text-white hover:border-[#333]"
          >
            <span className="relative z-10">Corporate info</span>
          </Link>
        </div>
        
        {/* 하단 정보 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <p className="text-sm text-[#999]">
          Contact: info@classduo.ai
          </p>
        </div>
      </main>
    </div>
  );
}
