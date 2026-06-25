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

// 보트 부위별 색 — 회색(기본) / 초록(에셋 원색)
const HULL_GRAY = [150, 158, 163, 0.7];
const HULL_GREEN = [30, 158, 87, 0.95]; // #1E9E57
const SOLID_GRAY = [150, 158, 163, 0.8];
const SOLID_GREEN = [30, 158, 87, 1]; // 콘솔
const LINE_GRAY = [150, 158, 163, 0.85];
const LINE_GREEN = [30, 158, 87, 1]; // 모터

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

    // 보트 형태 — 첨부 SVG(01-rib-dinghy.svg) 심플 버전(솔리드 선체). 뱃머리=오른쪽(+x), viewBox 580x300
    const HULL = new Path2D('M30 96 C55 82 120 82 250 84 C350 86 420 92 470 108 C510 122 538 140 552 150 C538 160 510 178 470 192 C420 208 350 214 250 216 C120 218 55 218 30 204 Q20 198 22 188 Q26 180 80 178 L80 122 Q26 120 22 112 Q20 102 30 96 Z');
    const CONSOLE = new Path2D('M58 138 L80 138 L80 162 L58 162 Q52 162 52 156 L52 144 Q52 138 58 138 Z');
    const MOTOR = new Path2D('M52 150 L42 150');

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
        scale: 0.22,
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
          scale: 0.08 + Math.random() * 0.03,
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
        scale: 0.1 + Math.random() * 0.05,
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

    // 보트 그리기 — 심플 버전(솔리드 선체 + 콘솔 + 모터). 초록(리더/지정 보트)이면 에셋 원색, 아니면 회색.
    // 뱃머리(SVG 기본 방향 →)를 진행 방향으로 회전시켜 "전진" 표현.
    const drawBoat = (boat: Boat) => {
      const s = boat.scale;
      const isGreen = boat.leader || boat.green;

      const hull = isGreen ? HULL_GREEN : HULL_GRAY;
      const solid = isGreen ? SOLID_GREEN : SOLID_GRAY;
      const line = isGreen ? LINE_GREEN : LINE_GRAY;

      ctx.save();
      ctx.translate(boat.x, boat.y);
      ctx.rotate(boat.heading); // 기본 오른쪽(→) → 진행 방향
      ctx.scale(s, s);
      ctx.translate(-290, -150); // 선체 중심 정렬
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // 선체(솔리드)
      ctx.fillStyle = rgba(hull);
      ctx.fill(HULL);

      // 콘솔
      ctx.fillStyle = rgba(solid);
      ctx.fill(CONSOLE);

      // 모터
      ctx.strokeStyle = rgba(line);
      ctx.lineWidth = 3 / s;
      ctx.stroke(MOTOR);

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
