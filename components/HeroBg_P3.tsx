'use client';

import { useEffect, useRef } from 'react';

// Pattern P3: Ascending Steps — 階段を描き、合格へ向かって上昇
export default function HeroBgP3() {
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

    const totalSteps = 12;

    function animate(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, c.width, c.height);
      const t = now * 0.0005;

      const marginX = c.width * 0.08;
      const marginY = c.height * 0.08;
      const usableW = c.width - marginX * 2;
      const usableH = c.height - marginY * 2;

      const stepW = usableW / totalSteps;
      const stepH = usableH / totalSteps;

      // Draw reveal
      const drawProgress = ((t * 0.12) % 1.0) * (totalSteps + 2);

      // Draw steps
      for (let i = 0; i < totalSteps; i++) {
        const visible = drawProgress - i;
        if (visible <= 0) continue;
        const frac = Math.min(1, visible);

        const x = marginX + i * stepW;
        const y = c.height - marginY - (i + 1) * stepH;
        const nextX = x + stepW;
        const nextY = y;

        // Horizontal part of step
        const hAlpha = 0.06 * frac;
        ctx.beginPath();
        ctx.moveTo(x, y + stepH);
        ctx.lineTo(x, y); // vertical riser
        ctx.lineTo(x + stepW * frac, y); // horizontal tread
        ctx.strokeStyle = `rgba(154, 7, 26, ${hAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Checkpoint marker at each step corner
        if (frac >= 1) {
          const markerAlpha = 0.04 + Math.sin(t + i * 0.8) * 0.02;
          ctx.beginPath();
          ctx.arc(nextX, nextY, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 168, 76, ${markerAlpha + 0.02})`;
          ctx.fill();

          // Subtle dashed guide line from checkpoint upward
          if (i % 3 === 0) {
            ctx.beginPath();
            ctx.moveTo(nextX, nextY);
            ctx.lineTo(nextX, nextY - 20);
            ctx.strokeStyle = `rgba(150, 150, 150, ${markerAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.setLineDash([2, 3]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Step number
            ctx.font = '9px monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = `rgba(150, 150, 150, ${markerAlpha})`;
            ctx.fillText(`${i + 1}`, nextX, nextY - 24);
          }
        }
      }

      // Traveling dot
      const dotProgress = ((t * 0.2) % 1.0);
      const dotStep = dotProgress * totalSteps;
      const dotStepIdx = Math.floor(dotStep);
      const dotStepFrac = dotStep - dotStepIdx;

      if (dotStepIdx < totalSteps) {
        const sx = marginX + dotStepIdx * stepW;
        const sy = c.height - marginY - (dotStepIdx + 1) * stepH;

        let dotX: number, dotY: number;
        if (dotStepFrac < 0.5) {
          // On the horizontal tread
          const hFrac = dotStepFrac * 2;
          dotX = sx + hFrac * stepW;
          dotY = sy;
        } else {
          // On the vertical riser (going up)
          dotX = sx + stepW;
          dotY = sy - (dotStepFrac - 0.5) * 2 * stepH + stepH;
        }

        // Glow
        const gradient = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 12);
        gradient.addColorStop(0, 'rgba(201, 168, 76, 0.12)');
        gradient.addColorStop(1, 'rgba(201, 168, 76, 0)');
        ctx.beginPath();
        ctx.arc(dotX, dotY, 12, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Dot core
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(154, 7, 26, 0.10)';
        ctx.fill();
      }

      // "合格" label at top-right of stairs
      const goalX = marginX + totalSteps * stepW;
      const goalY = c.height - marginY - totalSteps * stepH;
      const goalPulse = Math.sin(t * 1.2) * 0.5 + 0.5;
      const goalAlpha = 0.05 + goalPulse * 0.04;

      // Goal circle
      ctx.beginPath();
      ctx.arc(goalX, goalY, 8 + goalPulse * 3, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201, 168, 76, ${goalAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(154, 7, 26, ${goalAlpha})`;
      ctx.fillText('合格', goalX, goalY - 16);

      // "現在地" label at start
      const startX = marginX;
      const startY = c.height - marginY;
      const startAlpha = 0.05 + Math.sin(t * 0.8) * 0.02;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(150, 150, 150, ${startAlpha})`;
      ctx.fillText('現在地', startX + 20, startY + 18);

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}
