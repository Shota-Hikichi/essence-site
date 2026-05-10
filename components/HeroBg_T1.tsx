'use client';

import { useEffect, useRef } from 'react';

// Pattern T1: Flowing Growth — 合格から逆算ツリーが有機的に成長
export default function HeroBgT1() {
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

    // Tree structure: 合格 -> subjects -> sub-topics
    interface TreeNode {
      label: string;
      xFrac: number;
      yFrac: number;
      children: number[]; // indices into nodes array
      depth: number;
      color: 'burgundy' | 'gold' | 'gray';
    }

    const nodes: TreeNode[] = [];

    // Root: 合格 at top center
    nodes.push({ label: '合格', xFrac: 0.5, yFrac: 0.08, children: [], depth: 0, color: 'burgundy' });

    // Level 1: subjects spread across width
    const subjects = [
      { label: '英語', x: 0.18 },
      { label: '世界史', x: 0.39 },
      { label: '国語', x: 0.61 },
      { label: '小論文', x: 0.82 },
    ];
    const yLevel1 = 0.32;
    subjects.forEach((s, i) => {
      const idx = nodes.length;
      nodes.push({ label: s.label, xFrac: s.x, yFrac: yLevel1, children: [], depth: 1, color: i % 2 === 0 ? 'burgundy' : 'gold' });
      nodes[0].children.push(idx);
    });

    // Level 2: sub-topics
    const subTopics: { parent: number; items: { label: string; x: number }[] }[] = [
      { parent: 1, items: [{ label: '単語', x: 0.10 }, { label: '文法', x: 0.18 }, { label: '長文読解', x: 0.26 }] },
      { parent: 2, items: [{ label: '通史', x: 0.34 }, { label: '過去問演習', x: 0.44 }] },
      { parent: 3, items: [{ label: '現代文', x: 0.55 }, { label: '古文', x: 0.67 }] },
      { parent: 4, items: [{ label: '論述構成', x: 0.82 }] },
    ];
    const yLevel2 = 0.58;
    subTopics.forEach((group) => {
      group.items.forEach((item) => {
        const idx = nodes.length;
        nodes.push({ label: item.label, xFrac: item.x, yFrac: yLevel2, children: [], depth: 2, color: 'gray' });
        nodes[group.parent].children.push(idx);
      });
    });

    // Level 3: deeper sub-tasks for some nodes
    const deepItems: { parent: number; items: { label: string; x: number }[] }[] = [
      { parent: 5, items: [{ label: '英単語帳', x: 0.07 }, { label: '多読', x: 0.13 }] },
      { parent: 7, items: [{ label: '精読演習', x: 0.23 }, { label: '速読訓練', x: 0.30 }] },
      { parent: 8, items: [{ label: '古代〜中世', x: 0.33 }, { label: '近現代', x: 0.40 }] },
    ];
    const yLevel3 = 0.80;
    deepItems.forEach((group) => {
      group.items.forEach((item) => {
        const idx = nodes.length;
        nodes.push({ label: item.label, xFrac: item.x, yFrac: yLevel3, children: [], depth: 3, color: 'gold' });
        nodes[group.parent].children.push(idx);
      });
    });

    // Pre-compute edges
    interface Edge {
      from: number;
      to: number;
      depth: number;
    }
    const edges: Edge[] = [];
    nodes.forEach((node, i) => {
      node.children.forEach((child) => {
        edges.push({ from: i, to: child, depth: node.depth });
      });
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
      const elapsed = (now - startTime) * 0.001; // seconds
      ctx.clearRect(0, 0, c.width, c.height);

      // Growth cycle: tree grows over ~8 seconds, stays for 4, then restarts
      const cycleDuration = 14;
      const cycleTime = elapsed % cycleDuration;
      const growPhase = Math.min(1, cycleTime / 8); // 0->1 over 8 seconds

      // Draw edges with organic curve
      edges.forEach((edge) => {
        const depthDelay = edge.depth * 0.25;
        const edgeProgress = Math.max(0, Math.min(1, (growPhase * 4 - depthDelay * 1.5) ));
        if (edgeProgress <= 0) return;

        const fromNode = nodes[edge.from];
        const toNode = nodes[edge.to];

        const x1 = fromNode.xFrac * c.width;
        const y1 = fromNode.yFrac * c.height;
        const x2 = x1 + (toNode.xFrac * c.width - x1) * edgeProgress;
        const y2 = y1 + (toNode.yFrac * c.height - y1) * edgeProgress;

        // Control point for curve
        const cpx = (x1 + x2) * 0.5 + (toNode.xFrac - fromNode.xFrac) * c.width * 0.1;
        const cpy = (y1 + y2) * 0.5;

        const alpha = 0.08 + (1 - edge.depth / 3) * 0.07;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(cpx, cpy, x2, y2);
        ctx.strokeStyle = getColor(fromNode.color, alpha * edgeProgress);
        ctx.lineWidth = Math.max(1, 3.5 - edge.depth * 0.8);
        ctx.stroke();

        // Shimmer effect along the line
        const shimmerPos = (elapsed * 0.5 + edge.from * 0.3) % 1;
        if (edgeProgress >= 1) {
          const sx = x1 + (toNode.xFrac * c.width - x1) * shimmerPos;
          const sy = y1 + (toNode.yFrac * c.height - y1) * shimmerPos;
          ctx.beginPath();
          ctx.arc(sx, sy, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 168, 76, ${0.15 + Math.sin(elapsed * 3) * 0.05})`;
          ctx.fill();
        }
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const depthDelay = node.depth * 0.25;
        const nodeProgress = Math.max(0, Math.min(1, (growPhase * 4 - depthDelay * 1.5)));
        if (nodeProgress <= 0) return;

        const x = node.xFrac * c.width;
        const y = node.yFrac * c.height;

        // Bloom pulse when node appears
        const bloomTime = Math.max(0, nodeProgress - 0.5) * 2; // 0->1 in second half
        const pulse = Math.sin(elapsed * 2 + i) * 0.3 + 0.7;

        // Node circle
        const baseRadius = node.depth === 0 ? 18 : node.depth === 1 ? 12 : node.depth === 2 ? 8 : 6;
        const radius = baseRadius * nodeProgress * pulse;

        // Bloom ring
        if (bloomTime > 0 && bloomTime < 1) {
          const ringRadius = radius + (1 - bloomTime) * 20;
          ctx.beginPath();
          ctx.arc(x, y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = getColor(node.color, (1 - bloomTime) * 0.12);
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Fill node
        const fillAlpha = node.depth === 0 ? 0.18 : 0.10 + (1 - node.depth / 3) * 0.06;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = getColor(node.color, fillAlpha * nodeProgress);
        ctx.fill();

        // Glow for leaf nodes (gold)
        if (node.children.length === 0 && nodeProgress >= 1) {
          const glowPulse = Math.sin(elapsed * 1.5 + i * 0.7) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(x, y, radius + 4 + glowPulse * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 168, 76, ${0.04 + glowPulse * 0.04})`;
          ctx.fill();
        }

        // Label
        if (nodeProgress > 0.7) {
          const labelAlpha = Math.min(1, (nodeProgress - 0.7) / 0.3);
          const fontSize = node.depth === 0 ? 16 : node.depth === 1 ? 14 : 12;
          ctx.font = `${node.depth === 0 ? 'bold ' : ''}${fontSize}px "Noto Sans JP", sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const textAlpha = (node.depth === 0 ? 0.2 : 0.12 + (1 - node.depth / 3) * 0.06) * labelAlpha;
          ctx.fillStyle = getColor(node.color, textAlpha);
          ctx.fillText(node.label, x, y - radius - 10);
        }
      });

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}
