'use client';

import { useEffect, useRef } from 'react';

// Pattern T4: Breathing Organism — 常に表示、呼吸するように脈動するツリー
export default function HeroBgT4() {
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

    // Sibling connection pairs (nodes at same depth with same parent)
    interface SiblingLink { a: number; b: number; }
    const siblingLinks: SiblingLink[] = [];
    nodes.forEach((node) => {
      for (let i = 0; i < node.children.length; i++) {
        for (let j = i + 1; j < node.children.length; j++) {
          siblingLinks.push({ a: node.children[i], b: node.children[j] });
        }
      }
    });

    function getColor(color: 'burgundy' | 'gold' | 'gray', alpha: number): string {
      if (color === 'burgundy') return `rgba(154, 7, 26, ${alpha})`;
      if (color === 'gold') return `rgba(201, 168, 76, ${alpha})`;
      return `rgba(80, 80, 80, ${alpha})`;
    }

    function animate(now: number) {
      if (!ctx) return;
      const t = now * 0.001;
      ctx.clearRect(0, 0, c.width, c.height);

      // Global breathing rhythm — slow, meditative
      const breathCycle = Math.sin(t * 0.4) * 0.5 + 0.5; // 0-1, ~15s full cycle
      const breathFast = Math.sin(t * 0.8) * 0.5 + 0.5;

      // Opacity wave traveling from root to leaves
      const wavePhase = (t * 0.3) % 1; // slow wave

      // Draw edges with breathing thickness
      edges.forEach((edge, ei) => {
        const fromNode = nodes[edge.from];
        const toNode = nodes[edge.to];
        const x1 = fromNode.xFrac * c.width;
        const y1 = fromNode.yFrac * c.height;
        const x2 = toNode.xFrac * c.width;
        const y2 = toNode.yFrac * c.height;

        // Wave from root to leaf — based on average depth position
        const avgDepth = (edge.depth + 0.5) / 4;
        const waveOffset = Math.sin((t * 0.5 - avgDepth * 2) * Math.PI) * 0.5 + 0.5;

        const baseAlpha = 0.06 + (1 - edge.depth / 3) * 0.06;
        const alpha = baseAlpha + waveOffset * 0.04;
        const baseWidth = Math.max(1, 3.5 - edge.depth * 0.7);
        const width = baseWidth * (0.7 + breathCycle * 0.6);

        // Organic curved line
        const cpx = (x1 + x2) * 0.5 + Math.sin(t * 0.3 + ei) * 5;
        const cpy = (y1 + y2) * 0.5 + Math.cos(t * 0.25 + ei) * 3;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(cpx, cpy, x2, y2);
        ctx.strokeStyle = getColor(fromNode.color, alpha);
        ctx.lineWidth = width;
        ctx.stroke();
      });

      // Draw sibling connection lines — appear and disappear rhythmically
      siblingLinks.forEach((link, li) => {
        const nodeA = nodes[link.a];
        const nodeB = nodes[link.b];
        // Rhythmic visibility: each link on its own cycle
        const linkPhase = Math.sin(t * 0.35 + li * 1.7) * 0.5 + 0.5;
        if (linkPhase < 0.3) return; // invisible most of the time

        const fadeAlpha = (linkPhase - 0.3) / 0.7; // 0-1 when visible
        const x1 = nodeA.xFrac * c.width;
        const y1 = nodeA.yFrac * c.height;
        const x2 = nodeB.xFrac * c.width;
        const y2 = nodeB.yFrac * c.height;

        ctx.beginPath();
        ctx.setLineDash([4, 6]);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(201, 168, 76, ${0.05 * fadeAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw nodes with breathing expand/contract
      nodes.forEach((node, i) => {
        const x = node.xFrac * c.width;
        const y = node.yFrac * c.height;

        // Each node breathes on a slightly different phase
        const nodeBreath = Math.sin(t * 0.5 + i * 0.4 + node.depth * 0.8) * 0.5 + 0.5;

        // Opacity wave from root downward
        const depthNorm = node.depth / 3;
        const opacityWave = Math.sin((t * 0.4 - depthNorm * 1.5) * Math.PI) * 0.5 + 0.5;

        const baseRadius = node.depth === 0 ? 18 : node.depth === 1 ? 12 : node.depth === 2 ? 8 : 6;
        const radius = baseRadius * (0.8 + nodeBreath * 0.4); // expand and contract

        const baseFillAlpha = node.depth === 0 ? 0.14 : 0.08 + (1 - node.depth / 3) * 0.06;
        const fillAlpha = baseFillAlpha + opacityWave * 0.04;

        // Outer aura
        ctx.beginPath();
        ctx.arc(x, y, radius + 6 + nodeBreath * 6, 0, Math.PI * 2);
        ctx.fillStyle = getColor(node.color, fillAlpha * 0.3);
        ctx.fill();

        // Main node
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = getColor(node.color, fillAlpha);
        ctx.fill();

        // Label — always visible, breathing opacity
        const fontSize = node.depth === 0 ? 16 : node.depth === 1 ? 14 : 12;
        ctx.font = `${node.depth === 0 ? 'bold ' : ''}${fontSize}px "Noto Sans JP", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const textAlpha = (node.depth === 0 ? 0.18 : 0.10 + (1 - node.depth / 3) * 0.05) * (0.7 + opacityWave * 0.3);
        ctx.fillStyle = getColor(node.color, textAlpha);
        ctx.fillText(node.label, x, y - radius - 10);
      });

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}
