'use client';

import { useEffect, useRef } from 'react';

// Pattern T3: Waterfall Cascade — 合格から逆算ツリーが滝のように流れ落ちる
export default function HeroBgT3() {
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

    interface TreeNode {
      label: string;
      xFrac: number;
      yFrac: number;
      children: number[];
      depth: number;
      color: 'burgundy' | 'gold' | 'gray';
    }

    const nodes: TreeNode[] = [];

    nodes.push({ label: '合格', xFrac: 0.5, yFrac: 0.08, children: [], depth: 0, color: 'burgundy' });

    const subjects = [
      { label: '英語', x: 0.18 },
      { label: '世界史', x: 0.39 },
      { label: '国語', x: 0.61 },
      { label: '小論文', x: 0.82 },
    ];
    subjects.forEach((s, i) => {
      const idx = nodes.length;
      nodes.push({ label: s.label, xFrac: s.x, yFrac: 0.32, children: [], depth: 1, color: i % 2 === 0 ? 'burgundy' : 'gold' });
      nodes[0].children.push(idx);
    });

    const subTopics: { parent: number; items: { label: string; x: number }[] }[] = [
      { parent: 1, items: [{ label: '単語', x: 0.10 }, { label: '文法', x: 0.18 }, { label: '長文読解', x: 0.26 }] },
      { parent: 2, items: [{ label: '通史', x: 0.34 }, { label: '過去問演習', x: 0.44 }] },
      { parent: 3, items: [{ label: '現代文', x: 0.55 }, { label: '古文', x: 0.67 }] },
      { parent: 4, items: [{ label: '論述構成', x: 0.82 }] },
    ];
    subTopics.forEach((group) => {
      group.items.forEach((item) => {
        const idx = nodes.length;
        nodes.push({ label: item.label, xFrac: item.x, yFrac: 0.58, children: [], depth: 2, color: 'gray' });
        nodes[group.parent].children.push(idx);
      });
    });

    const deepItems: { parent: number; items: { label: string; x: number }[] }[] = [
      { parent: 5, items: [{ label: '英単語帳', x: 0.07 }, { label: '多読', x: 0.13 }] },
      { parent: 7, items: [{ label: '精読演習', x: 0.23 }, { label: '速読訓練', x: 0.30 }] },
      { parent: 8, items: [{ label: '古代〜中世', x: 0.33 }, { label: '近現代', x: 0.40 }] },
    ];
    deepItems.forEach((group) => {
      group.items.forEach((item) => {
        const idx = nodes.length;
        nodes.push({ label: item.label, xFrac: item.x, yFrac: 0.80, children: [], depth: 3, color: 'gold' });
        nodes[group.parent].children.push(idx);
      });
    });

    interface Edge { from: number; to: number; depth: number; }
    const edges: Edge[] = [];
    nodes.forEach((node, i) => {
      node.children.forEach((child) => {
        edges.push({ from: i, to: child, depth: node.depth });
      });
    });

    // Rain particles that fall along branches
    interface RainDrop {
      x: number;
      yFrac: number;
      speed: number;
      alpha: number;
      edgeIdx: number;
    }
    const rainDrops: RainDrop[] = [];

    // Orbiting dots at endpoints
    interface OrbitDot {
      nodeIdx: number;
      angle: number;
      radius: number;
      speed: number;
    }
    const orbitDots: OrbitDot[] = [];
    nodes.forEach((node, i) => {
      if (node.children.length === 0) {
        for (let d = 0; d < 2; d++) {
          orbitDots.push({
            nodeIdx: i,
            angle: Math.random() * Math.PI * 2,
            radius: 10 + Math.random() * 6,
            speed: 0.8 + Math.random() * 0.6,
          });
        }
      }
    });

    function getColor(color: 'burgundy' | 'gold' | 'gray', alpha: number): string {
      if (color === 'burgundy') return `rgba(154, 7, 26, ${alpha})`;
      if (color === 'gold') return `rgba(201, 168, 76, ${alpha})`;
      return `rgba(80, 80, 80, ${alpha})`;
    }

    let startTime = 0;

    function animate(now: number) {
      if (!ctx) return;
      if (!startTime) startTime = now;
      const elapsed = (now - startTime) * 0.001;
      ctx.clearRect(0, 0, c.width, c.height);

      // Wave-based reveal: each depth level appears together
      const cycleDuration = 16;
      const cycleTime = elapsed % cycleDuration;

      const maxDepth = 3;
      for (let d = 0; d <= maxDepth; d++) {
        const waveTime = d * 2.5; // each level starts 2.5s after previous
        const waveProgress = Math.max(0, Math.min(1, (cycleTime - waveTime) / 1.5));
        if (waveProgress <= 0) continue;

        // Draw edges at this depth
        edges.forEach((edge) => {
          if (edge.depth !== d) return;
          const fromNode = nodes[edge.from];
          const toNode = nodes[edge.to];
          const x1 = fromNode.xFrac * c.width;
          const y1 = fromNode.yFrac * c.height;
          const x2 = toNode.xFrac * c.width;
          const y2 = toNode.yFrac * c.height;

          // Draw with waterfall effect — top-to-bottom reveal
          const drawY = y1 + (y2 - y1) * waveProgress;
          const drawX = x1 + (x2 - x1) * waveProgress;

          const alpha = 0.08 + (1 - d / 3) * 0.07;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          // Curved path for waterfall feel
          const cpx = (x1 + drawX) * 0.5;
          const cpy = y1 + (drawY - y1) * 0.3;
          ctx.quadraticCurveTo(cpx, cpy, drawX, drawY);
          ctx.strokeStyle = getColor(fromNode.color, alpha * waveProgress);
          ctx.lineWidth = Math.max(1, 3.5 - d * 0.7);
          ctx.stroke();

          // Spawn rain drops along completed edges
          if (waveProgress >= 1 && Math.random() < 0.005) {
            rainDrops.push({
              x: x1 + (x2 - x1) * Math.random(),
              yFrac: 0,
              speed: 0.4 + Math.random() * 0.3,
              alpha: 0.06 + Math.random() * 0.06,
              edgeIdx: edges.indexOf(edge),
            });
          }
        });

        // Draw nodes at this depth
        nodes.forEach((node, i) => {
          if (node.depth !== d) return;
          // Nodes at depth d appear when depth d-1 edges are done
          const nodeWaveTime = d === 0 ? 0 : (d - 1) * 2.5 + 1.5;
          const nodeProgress = Math.max(0, Math.min(1, (cycleTime - nodeWaveTime) / 1.0));
          if (nodeProgress <= 0) return;

          const x = node.xFrac * c.width;
          const y = node.yFrac * c.height;
          const baseRadius = node.depth === 0 ? 18 : node.depth === 1 ? 12 : node.depth === 2 ? 8 : 6;
          const radius = baseRadius * nodeProgress;

          // Root glow
          if (node.depth === 0) {
            const glowPulse = Math.sin(elapsed * 1.2) * 0.3 + 0.7;
            ctx.beginPath();
            ctx.arc(x, y, radius + 15 * glowPulse, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(154, 7, 26, ${0.04 * glowPulse})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, y, radius + 8 * glowPulse, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(154, 7, 26, ${0.06 * glowPulse})`;
            ctx.fill();
          }

          // Node circle
          const fillAlpha = node.depth === 0 ? 0.18 : 0.10 + (1 - node.depth / 3) * 0.06;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = getColor(node.color, fillAlpha * nodeProgress);
          ctx.fill();

          // Label
          if (nodeProgress > 0.5) {
            const labelAlpha = Math.min(1, (nodeProgress - 0.5) * 2);
            const fontSize = node.depth === 0 ? 16 : node.depth === 1 ? 14 : 12;
            ctx.font = `${node.depth === 0 ? 'bold ' : ''}${fontSize}px "Noto Sans JP", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const textAlpha = (node.depth === 0 ? 0.2 : 0.12 + (1 - node.depth / 3) * 0.05) * labelAlpha;
            ctx.fillStyle = getColor(node.color, textAlpha);
            ctx.fillText(node.label, x, y - radius - 10);
          }
        });
      }

      // Update and draw rain drops
      for (let i = rainDrops.length - 1; i >= 0; i--) {
        const drop = rainDrops[i];
        drop.yFrac += drop.speed * 0.016;
        if (drop.yFrac > 1) { rainDrops.splice(i, 1); continue; }

        const edge = edges[drop.edgeIdx];
        const fromNode = nodes[edge.from];
        const toNode = nodes[edge.to];
        const edgeX1 = fromNode.xFrac * c.width;
        const edgeX2 = toNode.xFrac * c.width;
        // Rain follows the edge's x range with slight randomness
        const px = edgeX1 + (edgeX2 - edgeX1) * drop.yFrac + Math.sin(elapsed * 3 + i) * 2;
        const py = (fromNode.yFrac + (toNode.yFrac - fromNode.yFrac) * drop.yFrac) * c.height;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, py + 6);
        ctx.strokeStyle = `rgba(201, 168, 76, ${drop.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw orbiting dots at leaf nodes
      orbitDots.forEach((od) => {
        const node = nodes[od.nodeIdx];
        const nodeWaveTime = (node.depth - 1) * 2.5 + 1.5;
        const nodeProgress = Math.max(0, Math.min(1, (cycleTime - nodeWaveTime) / 1.0));
        if (nodeProgress < 1) return;

        od.angle += od.speed * 0.016;
        const x = node.xFrac * c.width + Math.cos(od.angle) * od.radius;
        const y = node.yFrac * c.height + Math.sin(od.angle) * od.radius;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${0.12})`;
        ctx.fill();
      });

      if (rainDrops.length > 80) rainDrops.splice(0, rainDrops.length - 80);

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}
