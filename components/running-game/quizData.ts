/**
 * @file quizData.ts
 * @description 랜딩페이지 달리기게임용 더미 퀴즈 10문제 (keyword=정답, description=문제)
 * @module components/running-game
 * @dependencies 없음
 */

export interface QuizWord {
  keyword: string;
  description: string;
}

// 게임 엔진(QuizManager)이 description을 문제로, keyword를 정답으로 사용하고
// 오답 보기는 다른 항목의 keyword에서 무작위로 뽑는다.
export const LANDING_QUIZ_WORDS: QuizWord[] = [
  { keyword: '2', description: '1+1은?' },
  { keyword: '귀요미', description: "'1+1은?' 하고 물었을 때 애교 정답은?" },
  { keyword: '빨간색', description: '사과, 소방차, 딸기의 공통 색깔 이름은?' },
  { keyword: '초록색', description: '클래스듀오 보트의 색깔 이름은?' },
  { keyword: '7', description: '일주일은 며칠일까?' },
  { keyword: '고양이', description: "'야옹' 하고 우는 동물은?" },
  { keyword: '강아지', description: "'멍멍' 하고 짖는 동물은?" },
  { keyword: '태양', description: '낮에 하늘에서 빛나는 별은?' },
  { keyword: '김치', description: '한국의 대표 발효 반찬은?' },
  { keyword: '바나나', description: '원숭이가 좋아하는 노란 과일은?' },
];
