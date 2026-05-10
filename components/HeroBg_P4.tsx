'use client';

import { useEffect, useRef } from 'react';

// Pattern P4: Orbital System — 科目が中心目標の周りを軌道のように周回
export default function HeroBgP4() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const c = canvas;
    let animationId: number;

    function resize() {
      const parent = c.parentElement;
      if (!parent) return;
      c.width = parent.offsetWidth;
      c.height = parent.offsetHeight;
    }

    resize();

    // Orbit definitions
    const orbits = [
      { radiusFrac: 0.12, speed: 0.4, dots: 2, color: 'burgundy' as const, tilt: 0.15 },
      { radiusFrac: 0.20, speed: -0.25, dots: 3, color: 'gold' as const, tilt: -0.1 },
      { radiusFrac: 0.28, speed: 0.18, dots: 2, color: 'gray' as const, tilt: 0.08 },
      { radiusFrac: 0.36, speed: -0.12, dots: 4, color: 'burgundy' as const, tilt: -0.05 },
      { radiusFrac: 0.44, speed: 0.09, dots: 3, color: 'gold' as const, tilt: 0.12 },
    ];

    // Connection events (pairs of orbits that occasionally connect)
    const connections = [
      { orbitA: 0, dotA: 0, orbitB: 1, dotB: 1 },
      { orbitA: 1, dotA: 0, orbitB: 2, dotB: 0 },
      { orbitA: 2, dotA: 1, orbitB: 3, dotB: 0 },
      { orbitA: 3, dotA: 2, orbitB: 4, dotB: 1 },
    ];

    function animate(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, c.width, c.height);
      const t = now * 0.0005;

      // Center point (slightly right of center)
      const cx = c.width * 0.55;
      const cy = c.height * 0.48;
      const baseRadius = Math.min(c.width, c.height);

      // Draw orbit rings
      orbits.forEach((orbit) => {
        const r = orbit.radiusFrac * baseRadius;
        const tiltY = orbit.tilt;

        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.02) {
          const ox = cx + Math.cos(a) * r;
          const oy = cy + Math.sin(a) * r * (1 - Math.abs(tiltY));
          if (a === 0) ctx.moveTo(ox, oy);
          else ctx.lineTo(ox, oy);
        }
        ctx.closePath();

        let ringColor: string;
        if (orbit.color === 'burgundy') ringColor = 'rgba(154, 7, 26, 0.04)';
        else if (orbit.color === 'gold') ringColor = 'rgba(201, 168, 76, 0.04)';
        else ringColor = 'rgba(150, 150, 150, 0.04)';

        ctx.strokeStyle = ringColor;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Compute dot positions for connections
      const dotPositions: { x: number; y: number }[][] = [];

      orbits.forEach((orbit, oi) => {
        const r = orbit.radiusFrac * baseRadius;
        const positions: { x: number; y: number }[] = [];

        for (let d = 0; d < orbit.dots; d++) {
          const angle = t * orbit.speed + (d / orbit.dots) * Math.PI * 2;
          const dx = cx + Math.cos(angle) * r;
          const dy = cy + Math.sin(angle) * r * (1 - Math.abs(orbit.tilt));
          positions.push({ x: dx, y: dy });

          // Draw dot
          const pulse = Math.sin(t * 1.5 + oi + d) * 0.5 + 0.5;
          const dotR = 2 + pulse * 1.5;
          let dotColor: string;
          const alpha = 0.06 + pulse * 0.04;
          if (orbit.color === 'burgundy') dotColor = `rgba(154, 7, 26, ${alpha})`;
          else if (orbit.color === 'gold') dotColor = `rgba(201, 168, 76, ${alpha})`;
          else dotColor = `rgba(150, 150, 150, ${alpha})`;

          ctx.beginPath();
          ctx.arc(dx, dy, dotR, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();
        }

        dotPositions.push(positions);
      });

      // Draw connections (thin lines between orbiting dots)
      connections.forEach((conn) => {
        const posA = dotPositions[conn.orbitA]?.[conn.dotA];
        const posB = dotPositions[conn.orbitB]?.[conn.dotB];
        if (!posA || !posB) return;

        const dist = Math.sqrt((posA.x - posB.x) ** 2 + (posA.y - posB.y) ** 2);
        const maxDist = 0.3 * baseRadius;
        if (dist > maxDist) return;

        const connAlpha = 0.03 * (1 - dist / maxDist);
        ctx.beginPath();
        ctx.moveTo(posA.x, posA.y);
        ctx.lineTo(posB.x, posB.y);
        ctx.strokeStyle = `rgba(154, 7, 26, ${connAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Center goal node
      const centerPulse = Math.sin(t * 0.8) * 0.5 + 0.5;
      const cAlpha = 0.05 + centerPulse * 0.03;

      ctx.beginPath();
      ctx.arc(cx, cy, 6 + centerPulse * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(154, 7, 26, ${cAlpha})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 14 + centerPulse * 3, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201, 168, 76, ${cAlpha * 0.6})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(154, 7, 26, ${cAlpha * 0.8})`;
      ctx.fillText('目標', cx, cy + 28);

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}
