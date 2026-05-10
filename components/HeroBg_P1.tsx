'use client';

import { useEffect, useRef } from 'react';

// Pattern P1: Blueprint Grid — 設計図のグリッドが中心から外側へ展開
export default function HeroBgP1() {
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

    // Node pulse states
    const pulseNodes: { gx: number; gy: number; phase: number }[] = [];
    for (let i = 0; i < 12; i++) {
      pulseNodes.push({
        gx: Math.floor(Math.random() * 30),
        gy: Math.floor(Math.random() * 30),
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Measurement lines
    const measurements = [
      { x1Frac: 0.15, y1Frac: 0.25, x2Frac: 0.35, y2Frac: 0.25, label: '120' },
      { x1Frac: 0.6, y1Frac: 0.4, x2Frac: 0.6, y2Frac: 0.6, label: '85' },
      { x1Frac: 0.7, y1Frac: 0.15, x2Frac: 0.85, y2Frac: 0.15, label: '96' },
      { x1Frac: 0.2, y1Frac: 0.65, x2Frac: 0.2, y2Frac: 0.8, label: '72' },
    ];

    function animate(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, c.width, c.height);
      const t = now * 0.0005;

      const spacing = 60;
      const cx = c.width / 2;
      const cy = c.height / 2;
      const maxDist = Math.sqrt(cx * cx + cy * cy);

      // Expanding reveal radius (loops)
      const revealRadius = (((t * 0.3) % 1.0) * maxDist * 1.5);

      // Draw grid lines
      const cols = Math.ceil(c.width / spacing) + 1;
      const rows = Math.ceil(c.height / spacing) + 1;
      const offsetX = (c.width % spacing) / 2;
      const offsetY = (c.height % spacing) / 2;

      // Vertical lines
      for (let i = 0; i < cols; i++) {
        const x = offsetX + i * spacing;
        const dist = Math.abs(x - cx);
        const alpha = dist < revealRadius ? Math.max(0, 0.04 - (dist / maxDist) * 0.03) : 0;
        if (alpha > 0) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, c.height);
          ctx.strokeStyle = `rgba(150, 150, 150, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Horizontal lines
      for (let j = 0; j < rows; j++) {
        const y = offsetY + j * spacing;
        const dist = Math.abs(y - cy);
        const alpha = dist < revealRadius ? Math.max(0, 0.04 - (dist / maxDist) * 0.03) : 0;
        if (alpha > 0) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(c.width, y);
          ctx.strokeStyle = `rgba(150, 150, 150, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Node dots at intersections
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * spacing;
          const y = offsetY + j * spacing;
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (dist < revealRadius) {
            const baseAlpha = 0.05;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(154, 7, 26, ${baseAlpha})`;
            ctx.fill();
          }
        }
      }

      // Pulsing nodes
      pulseNodes.forEach((pn) => {
        const x = offsetX + (pn.gx % cols) * spacing;
        const y = offsetY + (pn.gy % rows) * spacing;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        if (dist < revealRadius) {
          const pulse = Math.sin(t * 2 + pn.phase) * 0.5 + 0.5;
          const r = 2 + pulse * 3;
          const alpha = 0.04 + pulse * 0.06;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(154, 7, 26, ${alpha})`;
          ctx.fill();

          // Outer ring
          ctx.beginPath();
          ctx.arc(x, y, r + 4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(201, 168, 76, ${alpha * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      // Measurement lines
      measurements.forEach((m, idx) => {
        const fadeIn = Math.max(0, Math.min(1, Math.sin(t * 0.4 + idx * 1.5) * 0.5 + 0.5));
        const alpha = 0.06 * fadeIn;
        const x1 = m.x1Frac * c.width;
        const y1 = m.y1Frac * c.height;
        const x2 = m.x2Frac * c.width;
        const y2 = m.y2Frac * c.height;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(201, 168, 76, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // End ticks
        const isHoriz = Math.abs(y2 - y1) < 2;
        const tickLen = 6;
        if (isHoriz) {
          ctx.beginPath();
          ctx.moveTo(x1, y1 - tickLen); ctx.lineTo(x1, y1 + tickLen);
          ctx.moveTo(x2, y2 - tickLen); ctx.lineTo(x2, y2 + tickLen);
        } else {
          ctx.beginPath();
          ctx.moveTo(x1 - tickLen, y1); ctx.lineTo(x1 + tickLen, y1);
          ctx.moveTo(x2 - tickLen, y2); ctx.lineTo(x2 + tickLen, y2);
        }
        ctx.strokeStyle = `rgba(201, 168, 76, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Label
        const lx = (x1 + x2) / 2;
        const ly = (y1 + y2) / 2 - 6;
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = `rgba(150, 150, 150, ${alpha * 1.2})`;
        ctx.fillText(m.label, lx, ly);
      });

      // Cross-hair at center
      const crossAlpha = 0.05 + Math.sin(t) * 0.02;
      ctx.beginPath();
      ctx.moveTo(cx - 20, cy); ctx.lineTo(cx + 20, cy);
      ctx.moveTo(cx, cy - 20); ctx.lineTo(cx, cy + 20);
      ctx.strokeStyle = `rgba(154, 7, 26, ${crossAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Center circle
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(154, 7, 26, ${crossAlpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}
