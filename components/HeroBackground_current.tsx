'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  label: string;
  reached: boolean;
  reachedAt: number;
  size: number;
}

interface Edge {
  from: number;
  to: number;
  progress: number;
  startTime: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const c = canvas;
    let animationId: number;
    let startTime = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = [];

    function resize() {
      const parent = c.parentElement;
      if (!parent) return;
      c.width = parent.offsetWidth;
      c.height = parent.offsetHeight;
    }

    function init() {
      resize();
      const w = c.width;
      const h = c.height;
      const isMobile = w < 768;

      // Build a path from "Goal" (top-right) back to "Now" (bottom-left)
      // Representing reverse-engineering from goal to current position
      if (isMobile) {
        nodes = [
          { x: w * 0.75, y: h * 0.15, label: '合格', reached: false, reachedAt: 0, size: 8 },
          { x: w * 0.85, y: h * 0.27, label: '', reached: false, reachedAt: 0, size: 4 },
          { x: w * 0.7, y: h * 0.38, label: '', reached: false, reachedAt: 0, size: 4 },
          { x: w * 0.9, y: h * 0.49, label: '', reached: false, reachedAt: 0, size: 4 },
          { x: w * 0.75, y: h * 0.60, label: '', reached: false, reachedAt: 0, size: 4 },
          { x: w * 0.85, y: h * 0.72, label: '現在地', reached: false, reachedAt: 0, size: 8 },
        ];
      } else {
        nodes = [
          { x: w * 0.88, y: h * 0.18, label: '合格', reached: false, reachedAt: 0, size: 10 },
          { x: w * 0.78, y: h * 0.30, label: '', reached: false, reachedAt: 0, size: 5 },
          { x: w * 0.85, y: h * 0.44, label: '', reached: false, reachedAt: 0, size: 5 },
          { x: w * 0.72, y: h * 0.56, label: '', reached: false, reachedAt: 0, size: 5 },
          { x: w * 0.82, y: h * 0.70, label: '', reached: false, reachedAt: 0, size: 5 },
          { x: w * 0.75, y: h * 0.84, label: '現在地', reached: false, reachedAt: 0, size: 10 },
        ];
      }

      edges = [];
      for (let i = 0; i < nodes.length - 1; i++) {
        edges.push({ from: i, to: i + 1, progress: 0, startTime: 800 + i * 600 });
      }

      particles = [];
      startTime = performance.now();
    }

    function drawDashedCircle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, opacity: number) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(154, 7, 26, ${opacity * 0.15})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    function animate(now: number) {
      if (!ctx) return;
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, c.width, c.height);

      // Draw subtle grid dots
      const gridSize = 40;
      for (let x = 0; x < c.width; x += gridSize) {
        for (let y = 0; y < c.height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 0.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(154, 7, 26, 0.04)';
          ctx.fill();
        }
      }

      // === LEFT SIDE: Floating keywords + expanding rings ===
      const isMobile = c.width < 768;
      const leftCenterX = isMobile ? c.width * 0.15 : c.width * 0.12;
      const leftCenterY = isMobile ? c.height * 0.42 : c.height * 0.42;

      // Expanding concentric rings (pulsing outward)
      const ringCount = 3;
      for (let i = 0; i < ringCount; i++) {
        const cycleTime = 4000;
        const offset = i * (cycleTime / ringCount);
        const ringProgress = ((elapsed + offset) % cycleTime) / cycleTime;
        const ringRadius = 20 + ringProgress * (isMobile ? 80 : 140);
        const ringOpacity = (1 - ringProgress) * 0.06;
        ctx.beginPath();
        ctx.arc(leftCenterX, leftCenterY, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(154, 7, 26, ${ringOpacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Floating keywords that fade in/out
      if (!isMobile) {
        const keywords = [
          { text: '逆算', x: 0.06, y: 0.24, delay: 0 },
          { text: '計画', x: 0.14, y: 0.35, delay: 1200 },
          { text: '分析', x: 0.04, y: 0.50, delay: 2400 },
          { text: '実行', x: 0.15, y: 0.63, delay: 3600 },
          { text: '改善', x: 0.07, y: 0.76, delay: 4800 },
        ];
        keywords.forEach((kw) => {
          const kwCycle = 6000;
          const kwElapsed = (elapsed - kw.delay + kwCycle) % kwCycle;
          let kwOpacity = 0;
          if (kwElapsed < 1000) kwOpacity = kwElapsed / 1000;
          else if (kwElapsed < 4000) kwOpacity = 1;
          else if (kwElapsed < 5000) kwOpacity = 1 - (kwElapsed - 4000) / 1000;
          kwOpacity *= 0.08;
          const floatY = Math.sin(elapsed * 0.001 + kw.delay) * 5;
          ctx.font = '600 14px sans-serif';
          ctx.fillStyle = `rgba(154, 7, 26, ${kwOpacity})`;
          ctx.textAlign = 'center';
          ctx.fillText(kw.text, c.width * kw.x, c.height * kw.y + floatY);
        });

        // Thin vertical timeline line on left
        const lineX = c.width * 0.03;
        const lineTop = c.height * 0.18;
        const lineBottom = c.height * 0.85;
        const lineProgress = Math.min(elapsed / 3000, 1);
        const lineEased = 1 - Math.pow(1 - lineProgress, 3);
        ctx.beginPath();
        ctx.moveTo(lineX, lineTop);
        ctx.lineTo(lineX, lineTop + (lineBottom - lineTop) * lineEased);
        ctx.strokeStyle = 'rgba(154, 7, 26, 0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Small tick marks on the timeline
        const ticks = 5;
        for (let i = 0; i < ticks; i++) {
          const tickY = lineTop + (lineBottom - lineTop) * (i / (ticks - 1));
          const tickDelay = 500 + i * 500;
          if (elapsed > tickDelay) {
            const tickOpacity = Math.min((elapsed - tickDelay) / 800, 1) * 0.1;
            ctx.beginPath();
            ctx.moveTo(lineX - 4, tickY);
            ctx.lineTo(lineX + 4, tickY);
            ctx.strokeStyle = `rgba(154, 7, 26, ${tickOpacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      } else {
        // Mobile: simpler left decoration - small floating dots
        const dotPositions = [
          { x: 0.08, y: 0.15 }, { x: 0.15, y: 0.25 },
          { x: 0.05, y: 0.4 }, { x: 0.12, y: 0.55 },
        ];
        dotPositions.forEach((d, i) => {
          const floatY = Math.sin(elapsed * 0.0015 + i * 1.5) * 4;
          const dotOpacity = 0.06 + Math.sin(elapsed * 0.002 + i) * 0.03;
          ctx.beginPath();
          ctx.arc(c.width * d.x, c.height * d.y + floatY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(154, 7, 26, ${dotOpacity})`;
          ctx.fill();
          // small ring
          ctx.beginPath();
          ctx.arc(c.width * d.x, c.height * d.y + floatY, 8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(154, 7, 26, ${dotOpacity * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });
      }

      // Draw edges (lines connecting nodes) with animation
      edges.forEach((edge) => {
        if (elapsed < edge.startTime) return;
        const edgeElapsed = elapsed - edge.startTime;
        edge.progress = Math.min(edgeElapsed / 800, 1);
        const eased = 1 - Math.pow(1 - edge.progress, 3);

        const fromNode = nodes[edge.from];
        const toNode = nodes[edge.to];
        const currentX = fromNode.x + (toNode.x - fromNode.x) * eased;
        const currentY = fromNode.y + (toNode.y - fromNode.y) * eased;

        // Draw line
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = `rgba(154, 7, 26, ${0.12 * eased})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw dashed remaining path
        if (edge.progress < 1) {
          ctx.beginPath();
          ctx.moveTo(currentX, currentY);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.strokeStyle = 'rgba(154, 7, 26, 0.05)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 6]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Mark node as reached
        if (edge.progress >= 1 && !nodes[edge.to].reached) {
          nodes[edge.to].reached = true;
          nodes[edge.to].reachedAt = now;
          // Spawn particles
          for (let i = 0; i < 5; i++) {
            particles.push({
              x: toNode.x, y: toNode.y,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              life: 0, maxLife: 40 + Math.random() * 20,
            });
          }
        }
      });

      // Mark first node immediately
      if (!nodes[0].reached && elapsed > 400) {
        nodes[0].reached = true;
        nodes[0].reachedAt = now;
      }

      // Draw nodes
      nodes.forEach((node, i) => {
        const nodeVisible = i === 0 ? elapsed > 200 : node.reached || elapsed > edges[Math.max(0, i - 1)]?.startTime;
        if (!nodeVisible) return;

        const nodeOpacity = node.reached ? 1 : 0.3;
        const pulseScale = node.reached ? 1 + Math.sin((now - node.reachedAt) * 0.003) * 0.15 : 1;

        // Outer ring
        drawDashedCircle(ctx, node.x, node.y, node.size * 3 * pulseScale, nodeOpacity);

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * pulseScale, 0, Math.PI * 2);
        if (node.reached) {
          ctx.fillStyle = i === 0 ? 'rgba(154, 7, 26, 0.2)' : i === nodes.length - 1 ? 'rgba(15, 157, 110, 0.2)' : 'rgba(154, 7, 26, 0.1)';
        } else {
          ctx.fillStyle = 'rgba(154, 7, 26, 0.05)';
        }
        ctx.fill();

        // Inner dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = i === 0 ? `rgba(154, 7, 26, ${0.4 * nodeOpacity})` : i === nodes.length - 1 ? `rgba(15, 157, 110, ${0.4 * nodeOpacity})` : `rgba(154, 7, 26, ${0.25 * nodeOpacity})`;
        ctx.fill();

        // Label
        if (node.label && node.reached) {
          const labelAge = now - node.reachedAt;
          const labelOpacity = Math.min(labelAge / 500, 0.25);
          ctx.font = '11px sans-serif';
          ctx.fillStyle = `rgba(154, 7, 26, ${labelOpacity})`;
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y - node.size * 2 - 6);
        }
      });

      // Draw & update particles
      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const alpha = (1 - p.life / p.maxLife) * 0.2;
        if (alpha <= 0) return false;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${alpha})`;
        ctx.fill();
        return true;
      });

      // Loop: restart animation after all edges complete
      const totalDuration = edges[edges.length - 1].startTime + 800 + 3000;
      if (elapsed > totalDuration) {
        nodes.forEach(n => { n.reached = false; n.reachedAt = 0; });
        edges.forEach(e => { e.progress = 0; });
        particles = [];
        startTime = now;
      }

      animationId = requestAnimationFrame(animate);
    }

    init();
    animationId = requestAnimationFrame(animate);

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
