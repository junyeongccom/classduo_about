/* eslint-disable @next/next/no-img-element */
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { NextLinks } from '@/components/PageShell';

// 글씨체는 전역 Pretendard 상속. Figma 기준: 제목 30 / 날짜 20 / 본문 15.
export default function PredictiveQueryManagement() {
  return (
    <div className="min-h-screen bg-white text-[color:var(--ct-ink)]">
      {/* 상단 메뉴바 (홈과 동일) + 워드마크 + 구분선 */}
      <header className="border-b border-[color:var(--ct-line)]">
        <SiteNav />
      </header>

      {/* 본문 */}
      <article className="ct-page py-16 md:py-24">
        <h1 className="ct-h2">Predictive Query Management — Proactive Learning Support</h1>

        <p className="ct-small mt-3 text-[color:var(--ct-ink-4)]">June 27, 2026</p>

        {/* 다이어그램 + 학회 배너 — 본문과 동일 폭(좌우 끝 정렬) */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
          <img
            src="/research/pqm-figure.png"
            alt="Preset Question Prediction through Agent Debate"
            className="w-full rounded-lg md:w-[58%] md:flex-none"
          />
          <div className="flex w-full min-w-0 flex-col justify-center gap-3 md:flex-1">
            <img
              src="/research/cikm-2025.png"
              alt="CIKM 2025 — The 34th ACM International Conference on Information and Knowledge Management"
              className="w-full rounded-md"
            />
            <img
              src="/research/acl-2026.png"
              alt="ACL 2026 San Diego, July 2-7"
              className="w-full rounded-md"
            />
          </div>
        </div>

        <div className="ct-body ct-prose mt-10 space-y-6 text-[color:var(--ct-ink-2)]">
          <p>
            대규모 강의 환경에서는 학생 수가 많아질수록 교수자와 조교가 개별 학생의 이해 수준과 질문 상황을
            세밀하게 파악하고 보조하기 어렵습니다. 또한 많은 학생들은 수업 내용을 어려워하면서도 무엇을 모르는지
            명확히 표현하지 못해 도움을 요청하는 단계까지 쉽게 나아가지 못합니다. 이러한 문제는 단순히 응답 속도의
            문제가 아니라, 학습 지원이 학생의 질문 발생 이후에만 시작된다는 구조적 한계와 맞닿아 있습니다.
            Predictive Query Management는 이 한계를 완화하기 위해, 학생이 질문하기 전에 먼저 참고할 수 있는 예상
            질문과 답변을 제공하는 방향으로 설계되었습니다.
          </p>
          <p>
            핵심 방향은 학생 질의응답의 기술적 자동화가 아닌, 학생이 자신의 혼란을 발견하고 학습 대화를 시작할 수
            있는 진입점을 마련하는 데 있습니다. Predictive Query Management는 수업 흐름과 학습 맥락에 맞춘 사전
            Q&amp;A를 제시함으로써, 학생들이 흔히 헷갈릴 수 있는 개념을 먼저 탐색할 수 있게 합니다. 이 접근은
            학생에게 “무엇을 물어봐야 할지”에 대한 부담을 줄이고, 질문을 구성하지 못하는 학생에게도 학습 지원을
            연결합니다. 학생은 제시된 질문을 선택해 바로 답변을 확인하거나, 같은 화면에서 직접 질문을 이어갈 수
            있습니다. 따라서 시스템은 단순한 질의응답 도구를 넘어, 학습자가 수업 내용을 더 능동적으로 점검하도록
            유도하는 역할을 수행합니다.
          </p>
          <p>
            2025년에, 저희는 이러한 시스템을 실제 1,500명 이상의 학생이 수강한 대규모 Python 입문 수업에
            적용 및 운영하였습니다. 해당 수업은 기존에 이메일을 통한 문의에만 학습 지원에 의존해야
            했기 때문에, 학생들이 즉시 도움을 받기 어려운 상황이 많았습니다. 이런 상황에서 Predictive Query
            Management는 실시간 지원의 접근성을 높이고, 도움 요청의 심리적 장벽을 낮추는 실행 전략으로
            도입되었습니다.
          </p>
          <p>
            실제 사용 결과, 학생이 먼저 말을 걸지 않아도 학습 대화를 시작할 수 있게 해주는 인터페이스상의 안내
            장치로 기능한 사전 질문은 전체 세션의 상당 부분에서 활용되며, 학생들이 학습 지원에 진입하는 주요
            경로로서 효과성을 검증했습니다. 이는 사전 질문이 단순한 편의 기능이 아니라, 대규모 수업에서 학습
            참여를 촉진하는 실질적 장치가 될 수 있음을 보여줍니다. 또한 실제 학생의 오프라인/온라인 질문과
            시스템이 도출한 사전 질문이 의미적으로 상당히 겹친다는 분석은 이 방향성이 수업 현장의 현실적 필요와
            맞닿아 있음을 보여줍니다. 이러한 내용을 다룬 저희의 논문은 CIKM 2025, ACL Industry 2026에 채택되어
            논문발표를 진행하는 성과를 거두었습니다.
          </p>
          <p>
            저희는 Predictive Query Management를 통해 “학생이 묻기 전에 먼저 도와주는 AI 튜터”라는 선제적 학습
            지원 철학을 정립하고 해당 시스템을 핵심 구성 요소로 활용중입니다.
          </p>
        </div>

        <NextLinks
          items={[
            {
              label: 'Conversational Learning',
              href: '/feature/conversational-learning',
              caption: '예상 질문이 실제 학습 화면에서 어떻게 대화로 이어지는지',
            },
            {
              label: 'Aplus',
              href: '/product/aplus',
              caption: '이 연구가 들어가 있는 제품 전체 소개',
            },
          ]}
        />
      </article>

      <SiteFooter />
    </div>
  );
}
