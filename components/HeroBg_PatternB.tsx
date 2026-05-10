'use client';

import { useEffect, useRef } from 'react';

// Pattern B: 星座マップ — 散らばった点が繋がって計画のネットワークを形成
export default function HeroBgPatternB() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const c = canvas;
    let animationId: number;

    interface Star {
      x: number; y: number; baseX: number; baseY: number;
      size: number; phase: number; speed: number; connected: boolean; connectTime: number;
    }

    let stars: Star[] = [];
    let connectionOrder: number[][] = [];
    let startTime = 0;

    function resize() {
      const parent = c.parentElement;
      if (!parent) return;
      c.width = parent.offsetWidth;
      c.height = parent.offsetHeight;
    }

    function init() {
      resize();
      startTime = performance.now();
      const count = Math.floor((c.width * c.height) / 20000);
      stars = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * c.width;
        const y = Math.random() * c.height;
        stars.push({
          x, y, baseX: x, baseY: y,
          size: Math.random() * 2 + 0.5,
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.5,
          connected: false, connectTime: 0,
        });
      }

      // Build connection order — nearest neighbor chain
      connectionOrder = [];
      const used = new Set<number>();
      let current = 0; // start from first star
      used.add(current);
      for (let step = 0; step < Math.min(stars.length - 1, 25); step++) {
        let nearest = -1;
        let nearestDist = Infinity;
        for (let j = 0; j < stars.length; j++) {
          if (used.has(j)) continue;
          const dx = stars[current].x - stars[j].x;
          const dy = stars[current].y - stars[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < nearestDist && d < 300) {
            nearestDist = d;
            nearest = j;
          }
        }
        if (nearest === -1) break;
        connectionOrder.push([current, nearest]);
        used.add(nearest);
        current = nearest;
      }
    }

    function animate(now: number) {
      if (!ctx) return;
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, c.width, c.height);

      // Breathe stars
      stars.forEach(star => {
        star.x = star.baseX + Math.sin(now * 0.001 * star.speed + star.phase) * 3;
        star.y = star.baseY + Math.cos(now * 0.001 * star.speed + star.phase * 0.7) * 2;
      });

      // Draw all stars as faint dots
      stars.forEach(star => {
        const twinkle = 0.5 + Math.sin(now * 0.002 + star.phase) * 0.5;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(154, 7, 26, ${0.04 + twinkle * 0.04})`;
        ctx.fill();
      });

      // Draw connections appearing over time
      connectionOrder.forEach(([from, to], i) => {
        const connectionStart = 1000 + i * 300;
        if (elapsed < connectionStart) return;
        const progress = Math.min((elapsed - connectionStart) / 600, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        const s1 = stars[from];
        const s2 = stars[to];
        const cx = s1.x + (s2.x - s1.x) * eased;
        const cy = s1.y + (s2.y - s1.y) * eased;

        // Line
        ctx.beginPath();
        ctx.moveTo(s1.x, s1.y);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = `rgba(154, 7, 26, ${0.06 * eased})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Glow on connected node
        if (progress >= 1 && !stars[to].connected) {
          stars[to].connected = true;
          stars[to].connectTime = now;
        }

        if (stars[to].connected) {
          const glowAge = now - stars[to].connectTime;
          const glowAlpha = Math.max(0, 0.12 - glowAge * 0.00005);
          ctx.beginPath();
          ctx.arc(s2.x, s2.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 168, 76, ${glowAlpha})`;
          ctx.fill();
        }
      });

      // Loop
      const totalDuration = 1000 + connectionOrder.length * 300 + 600 + 4000;
      if (elapsed > totalDuration) {
        stars.forEach(s => { s.connected = false; s.connectTime = 0; });
        startTime = now;
      }

      animationId = requestAnimationFrame(animate);
    }

    init();
    animationId = requestAnimationFrame(animate);
    window.addEventListener('resize', () => init());
    return () => { cancelAnimationFrame(animationId); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}
