/**
 * @file features.ts
 * @description Feature 메뉴 5개 페이지의 본문 데이터 정본. 내부 지식 vault(제품 모듈·근거 노트)를
 *              대외 공개 수위에 맞춰 재서술한 것 — 고객사명·내부 식별자·미공개 수치는 넣지 않는다.
 * @module lib
 */

export type Block =
  | { kind: "para"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "cards"; items: { title: string; body: string }[] }
  | { kind: "steps"; items: { title: string; body: string }[] };

export type FeatureSection = { title: string; blocks: Block[] };

export type Feature = {
  slug: string;
  nav: string;
  title: string;
  subtitle: string;
  lead: string;
  accent: string;
  icon: string;
  summary: string;
  stats: { value: string; label: string }[];
  sections: FeatureSection[];
  footnote?: string;
};

// 공개 카피는 학습 가치와 경험만 설명하며 내부 설계·운영 규칙은 포함하지 않습니다.
export const FEATURES: Feature[] = [
  {
    slug: "microlearning",
    nav: "Microlearning",
    title: "작은 배움이, 깊은 이해로",
    subtitle: "Microlearning",
    lead: "부담 없이 시작하고, 일상 속에서 이어가는 배움. 작은 이해가 쌓여 더 넓은 시야가 되도록 돕습니다.",
    accent: "#223c37",
    icon: "/home_assets/unique/04__02-microlearning-v1__01.png",
    summary: "일상에 자연스럽게 스며드는 작은 배움을 만듭니다.",
    stats: [
      {
        value: "시작",
        label: "가볍게 다가가는 배움",
      },
      {
        value: "집중",
        label: "지금 필요한 이해",
      },
      {
        value: "연결",
        label: "차곡차곡 쌓이는 경험",
      },
    ],
    sections: [
      {
        title: "부담을 낮추는 시작",
        blocks: [
          {
            kind: "para",
            text: "배워야 할 것이 많을수록 첫걸음은 무거워집니다. 지금 할 수 있는 만큼부터 시작할 수 있도록 학습의 부담을 덜어줍니다.",
          },
        ],
      },
      {
        title: "나의 속도로 깊어지는 이해",
        blocks: [
          {
            kind: "para",
            text: "모두가 같은 속도로 이해하지는 않습니다. 익숙한 내용은 되짚고 어려운 내용에는 머물며, 자신에게 맞는 호흡으로 배워갑니다.",
          },
        ],
      },
      {
        title: "일상 속에 이어지는 배움",
        blocks: [
          {
            kind: "para",
            text: "한 번의 긴 공부만큼 작은 배움을 이어가는 일도 중요합니다. 수업에서 시작된 관심이 일상 속 학습으로 이어지는 경험을 지향합니다.",
          },
        ],
      },
    ],
  },
  {
    slug: "test-based-learning",
    nav: "Test-based Learning",
    title: "이해를 확인하고, 다음으로",
    subtitle: "Test-based Learning",
    lead: "스스로 알고 있는 것과 더 배우고 싶은 것을 발견하는 시간. 확인하는 경험이 다음 배움을 향한 자신감으로 이어집니다.",
    accent: "#223c37",
    icon: "/home_assets/unique/01__01-short-test-v1__01.png",
    summary: "이해를 돌아보고 다음 배움의 방향을 찾도록 돕습니다.",
    stats: [
      {
        value: "발견",
        label: "나의 이해 돌아보기",
      },
      {
        value: "도전",
        label: "한 걸음 더 나아가기",
      },
      {
        value: "성장",
        label: "다시 시도할 자신감",
      },
    ],
    sections: [
      {
        title: "점수 너머의 발견",
        blocks: [
          {
            kind: "para",
            text: "학습을 확인하는 시간은 결과를 매기는 데서 끝나지 않습니다. 지금의 이해를 돌아보고, 앞으로의 배움을 생각하는 기회가 됩니다.",
          },
        ],
      },
      {
        title: "각자에게 의미 있는 도전",
        blocks: [
          {
            kind: "para",
            text: "이미 아는 것과 아직 낯선 것은 사람마다 다릅니다. 자신의 배움에 관심을 두고 한 걸음씩 나아갈 수 있도록 돕습니다.",
          },
        ],
      },
      {
        title: "다시 생각할 수 있는 여유",
        blocks: [
          {
            kind: "para",
            text: "한 번의 실수가 배움의 끝은 아닙니다. 틀렸던 순간도 이해를 넓히는 과정으로 받아들이고, 다시 도전할 수 있는 경험을 만듭니다.",
          },
        ],
      },
    ],
  },
  {
    slug: "engagement",
    nav: "Engagement",
    title: "계속하고 싶은 배움",
    subtitle: "Engagement",
    lead: "배움을 이어가는 힘은 작은 성취와 즐거움에서 자랍니다. 학습의 의미를 잃지 않으면서도 다시 찾고 싶은 경험을 만듭니다.",
    accent: "#223c37",
    icon: "/home_assets/unique/16__07-xp-v2__01.png",
    summary: "작은 성취와 즐거움으로 배움을 이어갈 힘을 더합니다.",
    stats: [
      {
        value: "관심",
        label: "다시 찾고 싶은 경험",
      },
      {
        value: "성취",
        label: "작은 노력의 의미",
      },
      {
        value: "지속",
        label: "이어가는 즐거움",
      },
    ],
    sections: [
      {
        title: "호기심이 머무는 경험",
        blocks: [
          {
            kind: "para",
            text: "배움에는 집중하는 순간과 숨을 고르는 순간이 모두 필요합니다. 다양한 경험으로 관심을 환기하고 학습에 다시 다가갈 여유를 만듭니다.",
          },
        ],
      },
      {
        title: "작은 성취를 알아보는 일",
        blocks: [
          {
            kind: "para",
            text: "멀리 있는 목표만 바라보면 오늘의 노력을 놓치기 쉽습니다. 지금까지 걸어온 과정에도 의미를 느낄 수 있도록 돕습니다.",
          },
        ],
      },
      {
        title: "참여의 의미를 묻습니다",
        blocks: [
          {
            kind: "para",
            text: "활발한 참여가 언제나 깊은 이해를 뜻하지는 않습니다. 우리는 학습의 목적과 경험을 함께 바라보며 더 나은 참여의 방식을 탐구합니다.",
          },
        ],
      },
    ],
  },
  {
    slug: "conversational-learning",
    nav: "Conversational Learning",
    title: "질문이 열어주는 새로운 이해",
    subtitle: "Conversational Learning",
    lead: "혼자서는 지나쳤을 궁금함도 대화 속에서는 배움의 시작이 됩니다. 질문하는 부담을 낮추고, 이해를 넓혀가는 학습을 돕습니다.",
    accent: "#223c37",
    icon: "/home_assets/unique/32__10-social-v10__01.png",
    summary: "궁금함을 표현하고 대화로 이해를 넓히도록 돕습니다.",
    stats: [
      {
        value: "질문",
        label: "궁금함을 꺼내는 용기",
      },
      {
        value: "대화",
        label: "이해를 넓히는 시간",
      },
      {
        value: "맥락",
        label: "수업과 이어지는 배움",
      },
    ],
    sections: [
      {
        title: "질문을 잘하지 않아도 괜찮도록",
        blocks: [
          {
            kind: "para",
            text: "무엇이 어려운지 설명하는 일부터 막힐 수 있습니다. 완벽한 질문을 준비하지 않아도 배움에 다가갈 수 있는 경험을 지향합니다.",
          },
        ],
      },
      {
        title: "수업과 맞닿은 대화",
        blocks: [
          {
            kind: "para",
            text: "지금 배우는 내용과 이어지는 대화는 궁금함을 더 깊은 이해로 이끕니다. 학습의 맥락을 놓치지 않으며 생각을 넓혀가도록 돕습니다.",
          },
        ],
      },
      {
        title: "스스로 생각할 수 있는 도움",
        blocks: [
          {
            kind: "para",
            text: "설명을 접하는 것에서 나아가 자신의 말로 이해하는 과정이 중요합니다. 대화가 학습자의 생각을 이어주는 계기가 되기를 바랍니다.",
          },
        ],
      },
    ],
  },
  {
    slug: "self-directed-learning",
    nav: "Self-directed Learning",
    title: "배움의 방향을, 스스로",
    subtitle: "Self-directed Learning",
    lead: "나를 이해하는 일에서 주도적인 배움이 시작됩니다. 자신의 과정을 돌아보고, 자신에게 의미 있는 다음 걸음을 선택하도록 돕습니다.",
    accent: "#223c37",
    icon: "/home_assets/unique/41__04-pencil.png",
    summary: "자신의 배움을 돌아보고 스스로 방향을 잡도록 돕습니다.",
    stats: [
      {
        value: "성찰",
        label: "나의 배움 이해하기",
      },
      {
        value: "선택",
        label: "나에게 맞는 방향",
      },
      {
        value: "주도",
        label: "스스로 이어가는 힘",
      },
    ],
    sections: [
      {
        title: "비교보다 먼저, 나를 이해하기",
        blocks: [
          {
            kind: "para",
            text: "다른 사람의 속도만으로 자신의 배움을 판단할 필요는 없습니다. 어떤 순간에 집중하고 무엇이 어려웠는지 돌아보는 데서 시작합니다.",
          },
        ],
      },
      {
        title: "나에게 맞는 방향 찾기",
        blocks: [
          {
            kind: "para",
            text: "좋은 학습의 모습은 하나로 정해져 있지 않습니다. 자신의 경험을 바탕으로 더 잘 배울 수 있는 방향을 찾아가도록 돕습니다.",
          },
        ],
      },
      {
        title: "과정을 바라보는 시선",
        blocks: [
          {
            kind: "para",
            text: "학습자의 변화는 하나의 결과만으로 설명하기 어렵습니다. 우리는 서로 다른 배움의 과정을 이해하기 위해 교육 현장과 함께 연구합니다.",
          },
        ],
      },
    ],
  },
];

export const FEATURE_BY_SLUG = Object.fromEntries(
  FEATURES.map((f) => [f.slug, f]),
);
