'use client';

import { useEffect, useRef } from 'react';

// Pattern T5: Construction Blueprint — 設計図のようにツリーが描かれていく
export default function HeroBgT5() {
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

      const cycleDuration = 18;
      const cycleTime = elapsed % cycleDuration;

      // Draw background grid dots
      const gridSpacing = 30;
      const gridAlpha = 0.03 + Math.sin(elapsed * 0.2) * 0.01;
      for (let gx = gridSpacing; gx < c.width; gx += gridSpacing) {
        for (let gy = gridSpacing; gy < c.height; gy += gridSpacing) {
          ctx.beginPath();
          ctx.arc(gx, gy, 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(80, 80, 80, ${gridAlpha})`;
          ctx.fill();
        }
      }

      // Phase 1: Dashed "planned" lines appear (0-6s)
      // Phase 2: Solid "confirmed" lines draw over them (3-12s)
      // Phase 3: Annotations appear (8-16s)

      edges.forEach((edge, ei) => {
        const fromNode = nodes[edge.from];
        const toNode = nodes[edge.to];
        const x1 = fromNode.xFrac * c.width;
        const y1 = fromNode.yFrac * c.height;
        const x2 = toNode.xFrac * c.width;
        const y2 = toNode.yFrac * c.height;

        const edgeDelay = edge.depth * 2 + (ei % 3) * 0.4;

        // Phase 1: Dashed planned line
        const dashedStart = edgeDelay;
        const dashedProgress = Math.max(0, Math.min(1, (cycleTime - dashedStart) / 1.5));
        if (dashedProgress > 0) {
          const dx2 = x1 + (x2 - x1) * dashedProgress;
          const dy2 = y1 + (y2 - y1) * dashedProgress;

          ctx.beginPath();
          ctx.setLineDash([6, 4]);
          ctx.moveTo(x1, y1);
          ctx.lineTo(dx2, dy2);
          ctx.strokeStyle = getColor(fromNode.color, 0.06);
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Phase 2: Solid confirmed line draws over
        const solidStart = edgeDelay + 2;
        const solidProgress = Math.max(0, Math.min(1, (cycleTime - solidStart) / 1.2));
        if (solidProgress > 0) {
          const sx2 = x1 + (x2 - x1) * solidProgress;
          const sy2 = y1 + (y2 - y1) * solidProgress;

          const alpha = 0.08 + (1 - edge.depth / 3) * 0.07;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(sx2, sy2);
          ctx.strokeStyle = getColor(fromNode.color, alpha);
          ctx.lineWidth = Math.max(1, 3 - edge.depth * 0.6);
          ctx.stroke();

          // Drawing head glow
          if (solidProgress < 1) {
            ctx.beginPath();
            ctx.arc(sx2, sy2, 4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(201, 168, 76, ${0.15})`;
            ctx.fill();
          }
        }

        // Measurement lines between connected nodes (annotations)
        const annotStart = edgeDelay + 3.5;
        const annotProgress = Math.max(0, Math.min(1, (cycleTime - annotStart) / 0.8));
        if (annotProgress > 0 && solidProgress >= 1) {
          // Small tick marks at midpoint
          const mx = (x1 + x2) * 0.5;
          const my = (y1 + y2) * 0.5;
          const dx = x2 - x1;
          const dy = y2 - y1;
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len > 0) {
            const nx = -dy / len * 5;
            const ny = dx / len * 5;

            ctx.beginPath();
            ctx.moveTo(mx - nx, my - ny);
            ctx.lineTo(mx + nx, my + ny);
            ctx.strokeStyle = `rgba(80, 80, 80, ${0.06 * annotProgress})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Small distance number
            const dist = Math.round(len / 10);
            ctx.font = '8px monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = `rgba(80, 80, 80, ${0.06 * annotProgress})`;
            ctx.fillText(`${dist}`, mx + nx * 2, my + ny * 2);
          }
        }
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const nodeDelay = node.depth * 2;
        const nodeProgress = Math.max(0, Math.min(1, (cycleTime - nodeDelay) / 1.0));
        if (nodeProgress <= 0) return;

        const x = node.xFrac * c.width;
        const y = node.yFrac * c.height;
        const baseRadius = node.depth === 0 ? 18 : node.depth === 1 ? 12 : node.depth === 2 ? 8 : 6;

        // Phase 1: Dashed circle outline (planned)
        const dashedNodeProgress = Math.max(0, Math.min(1, (cycleTime - nodeDelay) / 0.8));
        if (dashedNodeProgress > 0) {
          ctx.beginPath();
          ctx.setLineDash([3, 3]);
          ctx.arc(x, y, baseRadius + 2, 0, Math.PI * 2 * dashedNodeProgress);
          ctx.strokeStyle = getColor(node.color, 0.06);
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Phase 2: Solid fill (confirmed)
        const solidNodeDelay = nodeDelay + 1.5;
        const solidNodeProgress = Math.max(0, Math.min(1, (cycleTime - solidNodeDelay) / 0.6));
        if (solidNodeProgress > 0) {
          const fillAlpha = (node.depth === 0 ? 0.18 : 0.10 + (1 - node.depth / 3) * 0.06) * solidNodeProgress;
          ctx.beginPath();
          ctx.arc(x, y, baseRadius * solidNodeProgress, 0, Math.PI * 2);
          ctx.fillStyle = getColor(node.color, fillAlpha);
          ctx.fill();

          // Crosshair marker inside node
          const ch = baseRadius * 0.5;
          ctx.beginPath();
          ctx.moveTo(x - ch, y);
          ctx.lineTo(x + ch, y);
          ctx.moveTo(x, y - ch);
          ctx.lineTo(x, y + ch);
          ctx.strokeStyle = getColor(node.color, fillAlpha * 0.5);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        // Label
        const labelDelay = solidNodeDelay + 0.5;
        const labelProgress = Math.max(0, Math.min(1, (cycleTime - labelDelay) / 0.5));
        if (labelProgress > 0) {
          const fontSize = node.depth === 0 ? 16 : node.depth === 1 ? 14 : 12;
          ctx.font = `${node.depth === 0 ? 'bold ' : ''}${fontSize}px "Noto Sans JP", sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const textAlpha = (node.depth === 0 ? 0.2 : 0.12 + (1 - node.depth / 3) * 0.05) * labelProgress;
          ctx.fillStyle = getColor(node.color, textAlpha);
          ctx.fillText(node.label, x, y - baseRadius - 10);

          // Small annotation bracket/number next to label
          if (node.depth > 0) {
            ctx.font = '8px monospace';
            ctx.textAlign = 'left';
            ctx.fillStyle = `rgba(80, 80, 80, ${0.05 * labelProgress})`;
            ctx.fillText(`[${i}]`, x + baseRadius + 4, y + 3);
          }
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
