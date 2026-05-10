'use client';

import { useEffect, useRef } from 'react';

// Pattern P5: Data Flow — 情報の流れが上昇し、整理されていくデータビジュアライゼーション
export default function HeroBgP5() {
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

    // Stream definitions
    interface Stream {
      xFrac: number;
      speed: number;
      color: 'burgundy' | 'gold' | 'gray';
      particles: { yFrac: number; size: number; alpha: number }[];
      wobblePhase: number;
      wobbleAmp: number;
    }

    const streamCount = 14;
    const streams: Stream[] = [];
    const colors: ('burgundy' | 'gold' | 'gray')[] = ['burgundy', 'gold', 'gray'];

    for (let i = 0; i < streamCount; i++) {
      const particleCount = 8 + Math.floor(Math.random() * 6);
      const particles = [];
      for (let p = 0; p < particleCount; p++) {
        particles.push({
          yFrac: Math.random(),
          size: 0.5 + Math.random() * 1.5,
          alpha: 0.03 + Math.random() * 0.05,
        });
      }
      streams.push({
        xFrac: 0.06 + (i / (streamCount - 1)) * 0.88,
        speed: 0.03 + Math.random() * 0.04,
        color: colors[i % 3],
        particles,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleAmp: 2 + Math.random() * 4,
      });
    }

    // Horizontal connections between adjacent streams
    interface HConn {
      streamA: number;
      streamB: number;
      yFrac: number;
      phase: number;
    }

    const hConnections: HConn[] = [];
    for (let i = 0; i < streamCount - 1; i++) {
      if (Math.random() > 0.5) {
        hConnections.push({
          streamA: i,
          streamB: i + 1,
          yFrac: 0.2 + Math.random() * 0.6,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function animate(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, c.width, c.height);
      const t = now * 0.0005;

      // Draw streams
      streams.forEach((stream) => {
        const baseX = stream.xFrac * c.width;
        const wobble = Math.sin(t * 0.8 + stream.wobblePhase) * stream.wobbleAmp;
        const x = baseX + wobble;

        // Thin vertical line (the stream spine)
        let lineColor: string;
        if (stream.color === 'burgundy') lineColor = 'rgba(154, 7, 26, 0.03)';
        else if (stream.color === 'gold') lineColor = 'rgba(201, 168, 76, 0.03)';
        else lineColor = 'rgba(150, 150, 150, 0.03)';

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, c.height);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Particles flowing upward
        stream.particles.forEach((p) => {
          const animY = ((p.yFrac - t * stream.speed) % 1.0 + 1.0) % 1.0;
          const py = animY * c.height;
          const px = x + Math.sin(t + animY * 6) * 2;

          let pColor: string;
          if (stream.color === 'burgundy') pColor = `rgba(154, 7, 26, ${p.alpha})`;
          else if (stream.color === 'gold') pColor = `rgba(201, 168, 76, ${p.alpha})`;
          else pColor = `rgba(150, 150, 150, ${p.alpha})`;

          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = pColor;
          ctx.fill();
        });
      });

      // Horizontal connections
      hConnections.forEach((conn) => {
        const fadeIn = Math.sin(t * 0.6 + conn.phase) * 0.5 + 0.5;
        if (fadeIn < 0.3) return;

        const alpha = 0.03 * fadeIn;
        const streamA = streams[conn.streamA];
        const streamB = streams[conn.streamB];
        const xA = streamA.xFrac * c.width + Math.sin(t * 0.8 + streamA.wobblePhase) * streamA.wobbleAmp;
        const xB = streamB.xFrac * c.width + Math.sin(t * 0.8 + streamB.wobblePhase) * streamB.wobbleAmp;
        const y = conn.yFrac * c.height;

        ctx.beginPath();
        ctx.moveTo(xA, y);
        ctx.lineTo(xB, y);
        ctx.strokeStyle = `rgba(154, 7, 26, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Small dot at connection midpoint
        const midX = (xA + xB) / 2;
        ctx.beginPath();
        ctx.arc(midX, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${alpha * 1.5})`;
        ctx.fill();
      });

      // Merge/split visual: occasional V-shapes where streams converge
      const mergeY = ((t * 0.1) % 1.0) * c.height;
      for (let i = 0; i < streamCount - 2; i += 3) {
        const sA = streams[i];
        const sB = streams[i + 1];
        const xA = sA.xFrac * c.width;
        const xB = sB.xFrac * c.width;
        const midX = (xA + xB) / 2;

        const mergeAlpha = 0.03;
        ctx.beginPath();
        ctx.moveTo(xA, mergeY + 20);
        ctx.lineTo(midX, mergeY);
        ctx.lineTo(xB, mergeY + 20);
        ctx.strokeStyle = `rgba(150, 150, 150, ${mergeAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}
