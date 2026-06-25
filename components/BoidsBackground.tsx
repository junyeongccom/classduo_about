'use client';

import { useEffect, useRef } from 'react';

interface Boat {
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;       // SVG(580단위) → 화면 px 스케일
  leader: boolean;     // 클릭으로 생긴 큰 보트(초록)
  green: boolean;      // 항상 초록으로 유지(무리 중 독립적인 한 척)
  transient: boolean;  // true = 화면 밖으로 나가면 제거(클릭 버스트), false = 화면 순환
  heading: number;     // 현재 뱃머리 방향(rad) — 진행 방향으로 부드럽게 회전
}

// 보트 선 색 — 회색(기본) / 초록(브랜드)
const LINE_GRAY = [150, 158, 163, 0.85];
const LINE_GREEN = [30, 158, 87, 1]; // #1E9E57

const rgba = (c: number[]) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${c[3]})`;

const BoidsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boatsRef = useRef<Boat[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 보트 형태 — 첨부 SVG(04-sailboat.svg) 라인아트 돛단배. 뱃머리=위(↑), viewBox 200x200
    const SAIL_OUTER = new Path2D('M100 22 C138 58 146 110 140 170 L60 170 C54 110 62 58 100 22 Z');
    const SAIL_INNER = new Path2D('M100 50 C126 80 132 118 128 162 L72 162 C68 118 74 80 100 50 Z');
    const SAIL_BASE = new Path2D('M76 150 L124 150');

    // 캔버스 크기 설정
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 마우스 클릭 → 보트가 "팡" 생겨나며 사방으로 흩어짐 (리더만 초록, 나머지는 회색)
    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      // 리더 보트 (크고 초록)
      const lvx = (Math.random() - 0.5) * 2;
      const lvy = (Math.random() - 0.5) * 2;
      boatsRef.current.push({
        x: clickX,
        y: clickY,
        vx: lvx,
        vy: lvy,
        scale: 0.4,
        leader: true,
        green: false,
        transient: true,
        heading: Math.atan2(lvy, lvx),
      });

      // 주변으로 퍼져나가는 작은 회색 보트 무리 (버스트)
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const distance = 26 + Math.random() * 34;
        const burstSpeed = 1.6 + Math.random() * 1.2;
        boatsRef.current.push({
          x: clickX + Math.cos(angle) * distance,
          y: clickY + Math.sin(angle) * distance,
          vx: Math.cos(angle) * burstSpeed,
          vy: Math.sin(angle) * burstSpeed,
          scale: 0.1 + Math.random() * 0.05,
          leader: false,
          green: false,
          transient: true,
          heading: angle, // 퍼져나가는 방향으로 뱃머리
        });
      }
    };

    canvas.addEventListener('click', handleClick);

    // 떠다니는 앰비언트 보트 초기화 (회색). 그 중 한 척만 항상 초록으로 유지.
    const numBoats = 28;
    const greenIndex = Math.floor(Math.random() * numBoats);
    boatsRef.current = [];

    for (let i = 0; i < numBoats; i++) {
      const avx = (Math.random() - 0.5) * 2;
      const avy = (Math.random() - 0.5) * 2;
      boatsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: avx,
        vy: avy,
        scale: 0.14 + Math.random() * 0.06,
        leader: false,
        green: i === greenIndex,
        transient: false,
        heading: Math.atan2(avy, avx),
      });
    }

    // Boids 알고리즘 파라미터
    const maxSpeed = 1.8;
    const maxForce = 0.03;
    const separationRadius = 34;
    const alignmentRadius = 60;
    const cohesionRadius = 60;

    // 벡터 계산 함수들
    const distance = (a: Boat, b: Boat) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const normalize = (vx: number, vy: number) => {
      const mag = Math.sqrt(vx * vx + vy * vy);
      if (mag > 0) return { x: vx / mag, y: vy / mag };
      return { x: 0, y: 0 };
    };

    const limit = (vx: number, vy: number, max: number) => {
      const mag = Math.sqrt(vx * vx + vy * vy);
      if (mag > max) {
        const norm = normalize(vx, vy);
        return { x: norm.x * max, y: norm.y * max };
      }
      return { x: vx, y: vy };
    };

    // 분리 (Separation)
    const separate = (boat: Boat, boats: Boat[]) => {
      let steerX = 0;
      let steerY = 0;
      let count = 0;

      for (const other of boats) {
        const d = distance(boat, other);
        if (d > 0 && d < separationRadius) {
          const diffX = boat.x - other.x;
          const diffY = boat.y - other.y;
          const norm = normalize(diffX, diffY);
          steerX += norm.x / d;
          steerY += norm.y / d;
          count++;
        }
      }

      if (count > 0) {
        steerX /= count;
        steerY /= count;
        const norm = normalize(steerX, steerY);
        steerX = norm.x * maxSpeed - boat.vx;
        steerY = norm.y * maxSpeed - boat.vy;
        return limit(steerX, steerY, maxForce);
      }

      return { x: 0, y: 0 };
    };

    // 정렬 (Alignment)
    const align = (boat: Boat, boats: Boat[]) => {
      let sumX = 0;
      let sumY = 0;
      let count = 0;

      for (const other of boats) {
        const d = distance(boat, other);
        if (d > 0 && d < alignmentRadius) {
          sumX += other.vx;
          sumY += other.vy;
          count++;
        }
      }

      if (count > 0) {
        sumX /= count;
        sumY /= count;
        const norm = normalize(sumX, sumY);
        const steerX = norm.x * maxSpeed - boat.vx;
        const steerY = norm.y * maxSpeed - boat.vy;
        return limit(steerX, steerY, maxForce);
      }

      return { x: 0, y: 0 };
    };

    // 응집 (Cohesion)
    const cohesion = (boat: Boat, boats: Boat[]) => {
      let sumX = 0;
      let sumY = 0;
      let count = 0;

      for (const other of boats) {
        const d = distance(boat, other);
        if (d > 0 && d < cohesionRadius) {
          sumX += other.x;
          sumY += other.y;
          count++;
        }
      }

      if (count > 0) {
        sumX /= count;
        sumY /= count;
        const steerX = sumX - boat.x;
        const steerY = sumY - boat.y;
        const norm = normalize(steerX, steerY);
        const steerX2 = norm.x * maxSpeed - boat.vx;
        const steerY2 = norm.y * maxSpeed - boat.vy;
        return limit(steerX2, steerY2, maxForce);
      }

      return { x: 0, y: 0 };
    };

    // 경계 처리 (앰비언트 보트는 반대편으로 순환)
    const wrapAround = (boat: Boat) => {
      if (boat.x < 0) boat.x = canvas.width;
      if (boat.x > canvas.width) boat.x = 0;
      if (boat.y < 0) boat.y = canvas.height;
      if (boat.y > canvas.height) boat.y = 0;
    };

    // 보트 그리기 — 라인아트 돛단배(외곽 돛 + 안쪽 돛 + 바닥선). 초록(리더/지정 보트)이면 초록선, 아니면 회색선.
    // 뱃머리(SVG 기본 방향 ↑)를 진행 방향으로 회전시켜 "전진" 표현.
    const drawBoat = (boat: Boat) => {
      const s = boat.scale;
      const isGreen = boat.leader || boat.green;
      const line = isGreen ? LINE_GREEN : LINE_GRAY;

      ctx.save();
      ctx.translate(boat.x, boat.y);
      ctx.rotate(boat.heading + Math.PI / 2); // 기본 위(↑) → 진행 방향
      ctx.scale(s, s);
      ctx.translate(-100, -96); // 돛단배 중심 정렬
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = rgba(line);
      ctx.lineWidth = 1.6 / s; // 스케일 보정 → 실제 ~1.6px 일정 두께

      ctx.stroke(SAIL_OUTER);
      ctx.stroke(SAIL_INNER);
      ctx.stroke(SAIL_BASE);

      ctx.restore();
    };

    // 애니메이션 루프
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const boatsToKeep: Boat[] = [];

      for (const boat of boatsRef.current) {
        // 세 가지 힘 계산
        const sep = separate(boat, boatsRef.current);
        const ali = align(boat, boatsRef.current);
        const coh = cohesion(boat, boatsRef.current);

        // 힘 적용 (가중치)
        boat.vx += sep.x * 1.5 + ali.x * 1.0 + coh.x * 1.0;
        boat.vy += sep.y * 1.5 + ali.y * 1.0 + coh.y * 1.0;

        // 속도 제한
        const limited = limit(boat.vx, boat.vy, maxSpeed);
        boat.vx = limited.x;
        boat.vy = limited.y;

        // 뱃머리를 진행 방향으로 부드럽게 회전 (각도 wrap 처리)
        const targetH = Math.atan2(boat.vy, boat.vx);
        let dh = targetH - boat.heading;
        dh = Math.atan2(Math.sin(dh), Math.cos(dh));
        boat.heading += dh * 0.18;

        // 위치 업데이트
        boat.x += boat.vx;
        boat.y += boat.vy;

        if (boat.transient) {
          // 클릭 버스트 보트: 화면 밖으로 나가면 제거
          const margin = 120;
          if (
            boat.x >= -margin && boat.x <= canvas.width + margin &&
            boat.y >= -margin && boat.y <= canvas.height + margin
          ) {
            boatsToKeep.push(boat);
            drawBoat(boat);
          }
        } else {
          // 앰비언트 보트: 화면 순환
          wrapAround(boat);
          boatsToKeep.push(boat);
          drawBoat(boat);
        }
      }

      boatsRef.current = boatsToKeep;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
      }}
    />
  );
};

export default BoidsBackground;
