'use client';

import { useEffect, useRef } from 'react';

// Pattern P2: Branching Tree — 学習計画が枝分かれして成長するマインドマップ
export default function HeroBgP2() {
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

    // Pre-compute a tree structure
    interface Branch {
      x1Frac: number; y1Frac: number;
      x2Frac: number; y2Frac: number;
      depth: number;
      label?: string;
      color: 'burgundy' | 'gold' | 'gray';
    }

    const branches: Branch[] = [];
    const labels = ['英語', '数学', '国語', '理科', '社会', '小論文', '面接', '共通テスト'];

    function buildTree(
      x: number, y: number, angle: number, len: number, depth: number, maxDepth: number
    ) {
      if (depth > maxDepth) return;
      const x2 = x + Math.cos(angle) * len;
      const y2 = y + Math.sin(angle) * len;
      const colors: ('burgundy' | 'gold' | 'gray')[] = ['burgundy', 'gold', 'gray'];
      const branch: Branch = {
        x1Frac: x, y1Frac: y,
        x2Frac: x2, y2Frac: y2,
        depth,
        color: colors[depth % 3],
      };
      if (depth === maxDepth && labels.length > 0) {
        branch.label = labels.shift();
      }
      branches.push(branch);

      const spread = 0.45 - depth * 0.05;
      const shrink = 0.68;
      buildTree(x2, y2, angle - spread, len * shrink, depth + 1, maxDepth);
      buildTree(x2, y2, angle + spread, len * shrink, depth + 1, maxDepth);
      if (depth < 2) {
        buildTree(x2, y2, angle, len * shrink * 0.8, depth + 1, maxDepth);
      }
    }

    // Build from bottom-center upward (angle = -PI/2 = upward)
    buildTree(0.5, 0.92, -Math.PI / 2, 0.18, 0, 4);

    function animate(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, c.width, c.height);
      const t = now * 0.0005;

      // Growth reveal: branches appear over time based on depth
      const growProgress = ((t * 0.15) % 1.0) * 6; // cycles through 0-6

      branches.forEach((br) => {
        const branchVisible = growProgress - br.depth * 0.8;
        if (branchVisible <= 0) return;
        const drawFrac = Math.min(1, branchVisible);

        const x1 = br.x1Frac * c.width;
        const y1 = br.y1Frac * c.height;
        const x2Full = br.x2Frac * c.width;
        const y2Full = br.y2Frac * c.height;
        const x2 = x1 + (x2Full - x1) * drawFrac;
        const y2 = y1 + (y2Full - y1) * drawFrac;

        const alphaBase = 0.08 - br.depth * 0.012;
        const alpha = Math.max(0.02, alphaBase);

        let rgba: string;
        if (br.color === 'burgundy') rgba = `rgba(154, 7, 26, ${alpha})`;
        else if (br.color === 'gold') rgba = `rgba(201, 168, 76, ${alpha})`;
        else rgba = `rgba(150, 150, 150, ${alpha})`;

        // Draw branch line
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = rgba;
        ctx.lineWidth = Math.max(0.5, 2 - br.depth * 0.3);
        ctx.stroke();

        // Node at branch start
        if (br.depth > 0) {
          ctx.beginPath();
          ctx.arc(x1, y1, 2 - br.depth * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = rgba;
          ctx.fill();
        }

        // Leaf circle and label at endpoints
        if (drawFrac >= 1 && br.label) {
          const pulse = Math.sin(t * 1.5 + br.depth) * 0.5 + 0.5;
          const leafR = 4 + pulse * 2;
          const leafAlpha = 0.04 + pulse * 0.04;

          ctx.beginPath();
          ctx.arc(x2Full, y2Full, leafR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 168, 76, ${leafAlpha})`;
          ctx.fill();

          // Label
          const labelAlpha = 0.05 + pulse * 0.04;
          ctx.font = '11px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = `rgba(154, 7, 26, ${labelAlpha})`;
          ctx.fillText(br.label, x2Full, y2Full - leafR - 4);
        }
      });

      // Root node at bottom center
      const rootX = 0.5 * c.width;
      const rootY = 0.92 * c.height;
      const rootPulse = Math.sin(t) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(rootX, rootY, 5 + rootPulse * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(154, 7, 26, ${0.06 + rootPulse * 0.03})`;
      ctx.fill();
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(154, 7, 26, ${0.06 + rootPulse * 0.02})`;
      ctx.fillText('学習計画', rootX, rootY + 18);

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}
