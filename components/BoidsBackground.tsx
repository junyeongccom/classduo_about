'use client';

import { useEffect, useRef } from 'react';

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

const BoidsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boidsRef = useRef<Boid[]>([]);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 크기 설정
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 마우스 클릭 이벤트
    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      
      // 빨간 물고기 생성 (리더)
      const redFish: Boid = {
        x: clickX,
        y: clickY,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        color: '#ff4444',
        size: 12,
      };
      boidsRef.current.push(redFish);

      // 주변에 작은 물고기 무리 생성
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const distance = 30 + Math.random() * 40;
        const schoolFish: Boid = {
          x: clickX + Math.cos(angle) * distance,
          y: clickY + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          color: '#b8e6d3', // 연한 민트 그린으로 변경
          size: 3 + Math.random() * 2, // 3-5 크기로 축소
        };
        boidsRef.current.push(schoolFish);
      }
    };

    canvas.addEventListener('click', handleClick);

    // Boids 초기화 (물고기 개수)
    const numBoids = 80;
    boidsRef.current = [];

    for (let i = 0; i < numBoids; i++) {
      boidsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: '#b8e6d3', // 연한 민트 그린으로 변경
        size: 4 + Math.random() * 2, // 4-6 크기로 축소
      });
    }

    // Boids 알고리즘 파라미터
    const maxSpeed = 2;
    const maxForce = 0.03;
    const separationRadius = 25;
    const alignmentRadius = 50;
    const cohesionRadius = 50;

    // 벡터 계산 함수들
    const distance = (boid1: Boid, boid2: Boid) => {
      const dx = boid1.x - boid2.x;
      const dy = boid1.y - boid2.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const normalize = (vx: number, vy: number) => {
      const mag = Math.sqrt(vx * vx + vy * vy);
      if (mag > 0) {
        return { x: vx / mag, y: vy / mag };
      }
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
    const separate = (boid: Boid, boids: Boid[]) => {
      let steerX = 0;
      let steerY = 0;
      let count = 0;

      for (const other of boids) {
        const d = distance(boid, other);
        if (d > 0 && d < separationRadius) {
          const diffX = boid.x - other.x;
          const diffY = boid.y - other.y;
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
        steerX = norm.x * maxSpeed - boid.vx;
        steerY = norm.y * maxSpeed - boid.vy;
        const limited = limit(steerX, steerY, maxForce);
        return limited;
      }

      return { x: 0, y: 0 };
    };

    // 정렬 (Alignment)
    const align = (boid: Boid, boids: Boid[]) => {
      let sumX = 0;
      let sumY = 0;
      let count = 0;

      for (const other of boids) {
        const d = distance(boid, other);
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
        const steerX = norm.x * maxSpeed - boid.vx;
        const steerY = norm.y * maxSpeed - boid.vy;
        const limited = limit(steerX, steerY, maxForce);
        return limited;
      }

      return { x: 0, y: 0 };
    };

    // 응집 (Cohesion)
    const cohesion = (boid: Boid, boids: Boid[]) => {
      let sumX = 0;
      let sumY = 0;
      let count = 0;

      for (const other of boids) {
        const d = distance(boid, other);
        if (d > 0 && d < cohesionRadius) {
          sumX += other.x;
          sumY += other.y;
          count++;
        }
      }

      if (count > 0) {
        sumX /= count;
        sumY /= count;
        const steerX = sumX - boid.x;
        const steerY = sumY - boid.y;
        const norm = normalize(steerX, steerY);
        const steerX2 = norm.x * maxSpeed - boid.vx;
        const steerY2 = norm.y * maxSpeed - boid.vy;
        const limited = limit(steerX2, steerY2, maxForce);
        return limited;
      }

      return { x: 0, y: 0 };
    };

    // 경계 처리
    const wrapAround = (boid: Boid) => {
      if (boid.x < 0) boid.x = canvas.width;
      if (boid.x > canvas.width) boid.x = 0;
      if (boid.y < 0) boid.y = canvas.height;
      if (boid.y > canvas.height) boid.y = 0;
    };

    // 귀여운 불가사리 그리기
    const drawBoid = (boid: Boid) => {
      const angle = Math.atan2(boid.vy, boid.vx);
      const size = boid.size;

      ctx.save();
      ctx.translate(boid.x, boid.y);
      ctx.rotate(angle);

      // 색상 설정
      if (boid.color === '#ff4444') {
        ctx.fillStyle = 'rgba(255, 100, 120, 0.7)';
        ctx.strokeStyle = 'rgba(220, 80, 100, 0.8)';
      } else if (boid.color === '#b8e6d3') {
        // 연한 민트 그린 불가사리
        ctx.fillStyle = 'rgba(184, 230, 211, 0.4)';
        ctx.strokeStyle = 'rgba(150, 200, 180, 0.6)';
      } else if (boid.color === '#f0c4e1') {
        // 연한 라벤더 핑크 불가사리
        ctx.fillStyle = 'rgba(240, 196, 225, 0.4)';
        ctx.strokeStyle = 'rgba(210, 170, 200, 0.6)';
      } else {
        ctx.fillStyle = 'rgba(255, 200, 150, 0.3)';
        ctx.strokeStyle = 'rgba(200, 160, 120, 0.5)';
      }
      
      ctx.lineWidth = 0.4;

      // 불가사리 5개 팔 그리기
      for (let i = 0; i < 5; i++) {
        const armAngle = (i / 5) * Math.PI * 2;
        
        ctx.save();
        ctx.rotate(armAngle);
        
        // 각 팔 그리기 (타원형)
        ctx.beginPath();
        ctx.ellipse(size * 0.6, 0, size * 0.8, size * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // 팔 끝 둥글게
        ctx.beginPath();
        ctx.arc(size * 1.2, 0, size * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.restore();
      }

      // 불가사리 중앙 몸체 (원형)
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 불가사리 표면 질감 (작은 점들)
      if (boid.color === '#ff4444') {
        ctx.fillStyle = 'rgba(200, 60, 80, 0.6)';
      } else if (boid.color === '#b8e6d3') {
        ctx.fillStyle = 'rgba(120, 180, 160, 0.5)';
      } else if (boid.color === '#f0c4e1') {
        ctx.fillStyle = 'rgba(200, 150, 180, 0.5)';
      } else {
        ctx.fillStyle = 'rgba(180, 140, 100, 0.4)';
      }
      
      for (let i = 0; i < 5; i++) {
        const armAngle = (i / 5) * Math.PI * 2;
        
        // 각 팔에 점들 추가
        for (let j = 0; j < 3; j++) {
          const dotDistance = size * (0.3 + j * 0.3);
          const dotX = Math.cos(armAngle) * dotDistance;
          const dotY = Math.sin(armAngle) * dotDistance;
          
          ctx.beginPath();
          ctx.arc(dotX, dotY, size * 0.06, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 중앙에 작은 점들
      for (let i = 0; i < 8; i++) {
        const dotAngle = (i / 8) * Math.PI * 2;
        const dotX = Math.cos(dotAngle) * size * 0.15;
        const dotY = Math.sin(dotAngle) * size * 0.15;
        
        ctx.beginPath();
        ctx.arc(dotX, dotY, size * 0.04, 0, Math.PI * 2);
        ctx.fill();
      }

      // 불가사리 중앙 핵심 (더 진한 색)
      if (boid.color === '#ff4444') {
        ctx.fillStyle = 'rgba(180, 40, 60, 0.8)';
      } else if (boid.color === '#b8e6d3') {
        ctx.fillStyle = 'rgba(100, 160, 140, 0.7)';
      } else if (boid.color === '#f0c4e1') {
        ctx.fillStyle = 'rgba(180, 130, 160, 0.7)';
      } else {
        ctx.fillStyle = 'rgba(160, 120, 80, 0.6)';
      }
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // 애니메이션 루프
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 화면 밖으로 나간 빨간 물고기들을 제거하기 위한 배열
      const boidsToKeep: Boid[] = [];

      for (const boid of boidsRef.current) {
        // 세 가지 힘 계산
        const sep = separate(boid, boidsRef.current);
        const ali = align(boid, boidsRef.current);
        const coh = cohesion(boid, boidsRef.current);

        // 힘 적용 (가중치)
        boid.vx += sep.x * 1.5 + ali.x * 1.0 + coh.x * 1.0;
        boid.vy += sep.y * 1.5 + ali.y * 1.0 + coh.y * 1.0;

        // 속도 제한
        const limited = limit(boid.vx, boid.vy, maxSpeed);
        boid.vx = limited.x;
        boid.vy = limited.y;

        // 위치 업데이트
        boid.x += boid.vx;
        boid.y += boid.vy;

        // 경계 처리 (기본 물고기는 화면을 순환, 빨간 물고기는 화면 밖으로 나가면 제거)
        if (boid.color === '#ff4444') {
          // 빨간 물고기: 화면 밖으로 나가면 제거
          const margin = 100; // 여유 공간
          if (boid.x >= -margin && boid.x <= canvas.width + margin && 
              boid.y >= -margin && boid.y <= canvas.height + margin) {
            boidsToKeep.push(boid);
            drawBoid(boid);
          }
          // 화면 밖으로 나간 빨간 물고기는 boidsToKeep에 추가하지 않음 (자동 제거)
        } else {
          // 기본 물고기: 화면 순환
          wrapAround(boid);
          boidsToKeep.push(boid);
          drawBoid(boid);
        }
      }

      // 업데이트된 물고기 배열로 교체
      boidsRef.current = boidsToKeep;

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
      className="fixed inset-0 w-full h-full"
      style={{ 
        zIndex: 1,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        cursor: 'pointer'
      }}
    />
  );
};

export default BoidsBackground;
