'use client';

import { useEffect, useRef } from 'react';

// Pattern A: DNA螺旋 — 合格への道筋が二重螺旋のように絡み合う
export default function HeroBgPatternA() {
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

    function animate(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, c.width, c.height);
      const t = now * 0.0005;

      // Grid dots
      for (let x = 0; x < c.width; x += 50) {
        for (let y = 0; y < c.height; y += 50) {
          ctx.beginPath();
          ctx.arc(x, y, 0.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(154, 7, 26, 0.03)';
          ctx.fill();
        }
      }

      // Double helix
      const centerX = c.width * 0.5;
      const amplitude = c.width * 0.15;
      const segments = 80;
      const verticalSpan = c.height * 0.9;
      const startY = c.height * 0.05;

      for (let strand = 0; strand < 2; strand++) {
        const phase = strand * Math.PI;
        ctx.beginPath();
        for (let i = 0; i <= segments; i++) {
          const progress = i / segments;
          const y = startY + progress * verticalSpan;
          const wave = Math.sin(progress * Math.PI * 4 + t + phase) * amplitude;
          const x = centerX + wave;
          const alpha = 0.04 + Math.sin(progress * Math.PI) * 0.04;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = strand === 0 ? 'rgba(154, 7, 26, 0.08)' : 'rgba(201, 168, 76, 0.06)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Cross bars between strands
      for (let i = 0; i < segments; i += 4) {
        const progress = i / segments;
        const y = startY + progress * verticalSpan;
        const x1 = centerX + Math.sin(progress * Math.PI * 4 + t) * amplitude;
        const x2 = centerX + Math.sin(progress * Math.PI * 4 + t + Math.PI) * amplitude;
        const barAlpha = 0.03 + Math.sin(progress * Math.PI) * 0.02;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = `rgba(154, 7, 26, ${barAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Node at intersection
        const midX = (x1 + x2) / 2;
        ctx.beginPath();
        ctx.arc(midX, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(154, 7, 26, ${barAlpha * 1.5})`;
        ctx.fill();
      }

      // Floating labels
      const labels = [
        { text: '目標設定', y: 0.15 },
        { text: '現状分析', y: 0.35 },
        { text: '計画立案', y: 0.55 },
        { text: '実行・改善', y: 0.75 },
      ];
      labels.forEach((label, i) => {
        const fadeIn = Math.sin(t * 0.5 + i * 1.2) * 0.5 + 0.5;
        ctx.font = '12px sans-serif';
        ctx.fillStyle = `rgba(154, 7, 26, ${0.06 * fadeIn})`;
        ctx.textAlign = 'center';
        ctx.fillText(label.text, centerX, c.height * label.y);
      });

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}
