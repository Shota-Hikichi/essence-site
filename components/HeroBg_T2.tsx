'use client';

import { useEffect, useRef } from 'react';

// Pattern T2: Electric Network — 合格から逆算ツリーが回路のように通電
export default function HeroBgT2() {
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

    interface Node {
      label: string;
      xFrac: number;
      yFrac: number;
      children: number[];
      depth: number;
      color: 'burgundy' | 'gold' | 'gray';
      activated: boolean;
      activateTime: number;
    }

    const nodes: Node[] = [];

    nodes.push({ label: '合格', xFrac: 0.5, yFrac: 0.08, children: [], depth: 0, color: 'burgundy', activated: false, activateTime: 0 });

    const subjects = [
      { label: '英語', x: 0.18 },
      { label: '世界史', x: 0.39 },
      { label: '国語', x: 0.61 },
      { label: '小論文', x: 0.82 },
    ];
    subjects.forEach((s, i) => {
      const idx = nodes.length;
      nodes.push({ label: s.label, xFrac: s.x, yFrac: 0.32, children: [], depth: 1, color: i % 2 === 0 ? 'burgundy' : 'gold', activated: false, activateTime: 0 });
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
        nodes.push({ label: item.label, xFrac: item.x, yFrac: 0.58, children: [], depth: 2, color: 'gray', activated: false, activateTime: 0 });
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
        nodes.push({ label: item.label, xFrac: item.x, yFrac: 0.80, children: [], depth: 3, color: 'gold', activated: false, activateTime: 0 });
        nodes[group.parent].children.push(idx);
      });
    });

    interface Edge {
      from: number;
      to: number;
      depth: number;
    }
    const edgeList: Edge[] = [];
    nodes.forEach((node, i) => {
      node.children.forEach((child) => {
        edgeList.push({ from: i, to: child, depth: node.depth });
      });
    });

    // Particles traveling along edges
    interface Particle {
      edgeIdx: number;
      progress: number;
      speed: number;
    }
    const particles: Particle[] = [];

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

      // Activation cycle: ~12 seconds total
      const cycleDuration = 14;
      const cycleTime = elapsed % cycleDuration;

      // Edges snap into place at specific times
      edgeList.forEach((edge, edgeIdx) => {
        const snapTime = edge.depth * 1.8 + (edgeIdx % 4) * 0.3;
        const timeSinceSnap = cycleTime - snapTime;
        if (timeSinceSnap < 0) return;

        const fromNode = nodes[edge.from];
        const toNode = nodes[edge.to];
        const x1 = fromNode.xFrac * c.width;
        const y1 = fromNode.yFrac * c.height;
        const x2 = toNode.xFrac * c.width;
        const y2 = toNode.yFrac * c.height;

        // Line draws instantly but has electric flash
        const flashIntensity = Math.max(0, 1 - timeSinceSnap * 2);
        const baseAlpha = 0.08 + (1 - edge.depth / 3) * 0.06;
        const alpha = baseAlpha + flashIntensity * 0.15;

        // Straight angular lines
        ctx.beginPath();
        // Go down vertically first, then horizontally (L-shaped path)
        const midY = y1 + (y2 - y1) * 0.6;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1, midY);
        ctx.lineTo(x2, midY);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = getColor(fromNode.color, alpha);
        ctx.lineWidth = Math.max(1, 3 - edge.depth * 0.6);
        ctx.stroke();

        // Electric flash glow along the line
        if (flashIntensity > 0) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1, midY);
          ctx.lineTo(x2, midY);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(201, 168, 76, ${flashIntensity * 0.25})`;
          ctx.lineWidth = 6 - edge.depth;
          ctx.stroke();
        }

        // Spawn particles along completed edges
        if (timeSinceSnap > 0.5 && Math.random() < 0.008) {
          particles.push({ edgeIdx, progress: 0, speed: 0.3 + Math.random() * 0.4 });
        }
      });

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed * 0.016;
        if (p.progress > 1) { particles.splice(i, 1); continue; }

        const edge = edgeList[p.edgeIdx];
        const fromNode = nodes[edge.from];
        const toNode = nodes[edge.to];
        const x1 = fromNode.xFrac * c.width;
        const y1 = fromNode.yFrac * c.height;
        const x2 = toNode.xFrac * c.width;
        const y2 = toNode.yFrac * c.height;
        const midY = y1 + (y2 - y1) * 0.6;

        // Particle follows L-shaped path
        let px: number, py: number;
        const totalLen = Math.abs(midY - y1) + Math.abs(x2 - x1) + Math.abs(y2 - midY);
        const seg1 = Math.abs(midY - y1) / totalLen;
        const seg2 = (Math.abs(midY - y1) + Math.abs(x2 - x1)) / totalLen;

        if (p.progress < seg1) {
          const t = p.progress / seg1;
          px = x1;
          py = y1 + (midY - y1) * t;
        } else if (p.progress < seg2) {
          const t = (p.progress - seg1) / (seg2 - seg1);
          px = x1 + (x2 - x1) * t;
          py = midY;
        } else {
          const t = (p.progress - seg2) / (1 - seg2);
          px = x2;
          py = midY + (y2 - midY) * t;
        }

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${0.2})`;
        ctx.fill();

        // Particle trail
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${0.06})`;
        ctx.fill();
      }

      // Draw nodes with expanding ring activation
      nodes.forEach((node, i) => {
        const activateTime = node.depth * 1.8 + 0.3;
        const timeSinceActivate = cycleTime - activateTime;
        if (timeSinceActivate < 0) return;

        const x = node.xFrac * c.width;
        const y = node.yFrac * c.height;

        const baseRadius = node.depth === 0 ? 16 : node.depth === 1 ? 11 : node.depth === 2 ? 7 : 5;

        // Expanding ring on activation
        if (timeSinceActivate < 1.5) {
          const ringProgress = timeSinceActivate / 1.5;
          const ringRadius = baseRadius + ringProgress * 25;
          ctx.beginPath();
          ctx.arc(x, y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = getColor(node.color, (1 - ringProgress) * 0.15);
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Node fill
        const fillAlpha = node.depth === 0 ? 0.18 : 0.10 + (1 - node.depth / 3) * 0.05;
        ctx.beginPath();
        ctx.arc(x, y, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = getColor(node.color, fillAlpha);
        ctx.fill();

        // Inner bright dot
        ctx.beginPath();
        ctx.arc(x, y, baseRadius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = getColor(node.color, fillAlpha * 1.5);
        ctx.fill();

        // Label
        if (timeSinceActivate > 0.3) {
          const labelAlpha = Math.min(1, (timeSinceActivate - 0.3) / 0.5);
          const fontSize = node.depth === 0 ? 16 : node.depth === 1 ? 14 : 12;
          ctx.font = `${node.depth === 0 ? 'bold ' : ''}${fontSize}px "Noto Sans JP", sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const textAlpha = (node.depth === 0 ? 0.2 : 0.12 + (1 - node.depth / 3) * 0.05) * labelAlpha;
          ctx.fillStyle = getColor(node.color, textAlpha);
          ctx.fillText(node.label, x, y - baseRadius - 10);
        }
      });

      // Keep particles list bounded
      if (particles.length > 60) particles.splice(0, particles.length - 60);

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}
