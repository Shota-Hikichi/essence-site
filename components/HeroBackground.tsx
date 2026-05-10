'use client';

import { useEffect, useRef } from 'react';

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const c = canvas;
    let animationId: number;

    interface TreeNode {
      label: string;
      xFrac: number;
      yFrac: number;
      color: 'root' | 'subject' | 'exam' | 'book' | 'schedule';
      depth: number;
    }

    interface TreeEdge {
      from: number;
      to: number;
    }

    let nodes: TreeNode[] = [];
    let edges: TreeEdge[] = [];
    let growStartTime = 0;
    let grown = false;
    const growDuration = 3000;

    function buildTree() {
      nodes = [];
      edges = [];
      const isMobile = c.width < 768;

      function addNode(label: string, x: number, y: number, color: TreeNode['color'], depth: number): number {
        nodes.push({ label, xFrac: x, yFrac: y, color, depth });
        return nodes.length - 1;
      }
      function addEdge(from: number, to: number) {
        edges.push({ from, to });
      }

      if (isMobile) {
        // Mobile: simplified tree, positioned in the upper area (above content)
        const root = addNode('合格', 0.50, 0.42, 'root', 0);

        const eng = addNode('英語', 0.15, 0.30, 'subject', 1);
        const hist = addNode('世界史', 0.40, 0.28, 'subject', 1);
        const jpn = addNode('国語', 0.65, 0.30, 'subject', 1);
        const essay = addNode('小論文', 0.88, 0.28, 'subject', 1);
        addEdge(root, eng); addEdge(root, hist); addEdge(root, jpn); addEdge(root, essay);

        const e1 = addNode('過去問', 0.08, 0.18, 'exam', 2);
        const e2 = addNode('単語', 0.22, 0.16, 'exam', 2);
        addEdge(eng, e1); addEdge(eng, e2);

        const h1 = addNode('通史', 0.34, 0.16, 'exam', 2);
        const h2 = addNode('一問一答', 0.48, 0.18, 'exam', 2);
        addEdge(hist, h1); addEdge(hist, h2);

        const j1 = addNode('現代文', 0.58, 0.18, 'exam', 2);
        const j2 = addNode('古文', 0.72, 0.16, 'exam', 2);
        addEdge(jpn, j1); addEdge(jpn, j2);

        const s1 = addNode('論述', 0.82, 0.18, 'exam', 2);
        const s2 = addNode('要約', 0.95, 0.16, 'exam', 2);
        addEdge(essay, s1); addEdge(essay, s2);

        // Layer 3: some books
        addEdge(e1, addNode('', 0.04, 0.08, 'book', 3));
        addEdge(e2, addNode('', 0.18, 0.06, 'book', 3));
        addEdge(h1, addNode('', 0.30, 0.06, 'book', 3));
        addEdge(h2, addNode('', 0.44, 0.08, 'book', 3));
        addEdge(j1, addNode('', 0.56, 0.08, 'book', 3));
        addEdge(j2, addNode('', 0.68, 0.06, 'book', 3));
        addEdge(s1, addNode('', 0.80, 0.08, 'book', 3));
        addEdge(s2, addNode('', 0.92, 0.06, 'book', 3));

      } else {
        // Desktop: full tree
        const root = addNode('合格', 0.50, 0.88, 'root', 0);

        const eng = addNode('英語', 0.15, 0.68, 'subject', 1);
        const hist = addNode('世界史', 0.38, 0.68, 'subject', 1);
        const jpn = addNode('国語', 0.62, 0.68, 'subject', 1);
        const essay = addNode('小論文', 0.85, 0.68, 'subject', 1);
        addEdge(root, eng); addEdge(root, hist); addEdge(root, jpn); addEdge(root, essay);

        const engExam = addNode('過去問演習', 0.08, 0.50, 'exam', 2);
        const histExam = addNode('過去問演習', 0.32, 0.50, 'exam', 2);
        const jpnExam = addNode('過去問演習', 0.56, 0.50, 'exam', 2);
        const essayExam = addNode('過去問分析', 0.80, 0.50, 'exam', 2);
        addEdge(eng, engExam); addEdge(hist, histExam); addEdge(jpn, jpnExam); addEdge(essay, essayExam);

        const engExtra1 = addNode('英作文対策', 0.22, 0.50, 'exam', 2);
        addEdge(eng, engExtra1);

        const engBook1 = addNode('ターゲット1900', 0.03, 0.34, 'book', 3);
        const engBook2 = addNode('Vintage文法', 0.13, 0.32, 'book', 3);
        const engBook3 = addNode('長文500', 0.23, 0.34, 'book', 3);
        addEdge(engExam, engBook1); addEdge(engExam, engBook2); addEdge(engExtra1, engBook3);

        const histBook1 = addNode('ナビゲーター', 0.28, 0.32, 'book', 3);
        const histBook2 = addNode('一問一答', 0.37, 0.34, 'book', 3);
        const histBook3 = addNode('世界史100題', 0.44, 0.32, 'book', 3);
        addEdge(histExam, histBook1); addEdge(histExam, histBook2); addEdge(histExam, histBook3);

        const jpnBook1 = addNode('古文単語315', 0.50, 0.34, 'book', 3);
        const jpnBook2 = addNode('現代文アクセス', 0.60, 0.32, 'book', 3);
        const jpnBook3 = addNode('漢文速答法', 0.68, 0.34, 'book', 3);
        addEdge(jpnExam, jpnBook1); addEdge(jpnExam, jpnBook2); addEdge(jpnExam, jpnBook3);

        const essayBook1 = addNode('要約トレーニング', 0.76, 0.32, 'book', 3);
        const essayBook2 = addNode('論述構成ドリル', 0.88, 0.34, 'book', 3);
        addEdge(essayExam, essayBook1); addEdge(essayExam, essayBook2);

        const method1 = addNode('朝30分 単語暗記', 0.03, 0.18, 'schedule', 4);
        const method2 = addNode('1日1単元 文法', 0.13, 0.16, 'schedule', 4);
        const method3 = addNode('週3題 長文演習', 0.23, 0.18, 'schedule', 4);
        addEdge(engBook1, method1); addEdge(engBook2, method2); addEdge(engBook3, method3);

        const method4 = addNode('毎日100問 反復', 0.30, 0.16, 'schedule', 4);
        const method5 = addNode('週末 通史総復習', 0.40, 0.18, 'schedule', 4);
        addEdge(histBook1, method4); addEdge(histBook2, method4); addEdge(histBook3, method5);

        const method6 = addNode('毎日50語 復習', 0.50, 0.18, 'schedule', 4);
        const method7 = addNode('週3題 精読', 0.62, 0.16, 'schedule', 4);
        addEdge(jpnBook1, method6); addEdge(jpnBook2, method7); addEdge(jpnBook3, method7);

        const method8 = addNode('隔日1題 執筆', 0.78, 0.18, 'schedule', 4);
        const method9 = addNode('添削→翌日復習', 0.90, 0.16, 'schedule', 4);
        addEdge(essayBook1, method8); addEdge(essayBook2, method9);

        const sched1 = addNode('朝: 単語・暗記', 0.10, 0.05, 'schedule', 5);
        const sched2 = addNode('午前: 過去問演習', 0.30, 0.03, 'schedule', 5);
        const sched3 = addNode('午後: 文法・読解', 0.55, 0.05, 'schedule', 5);
        const sched4 = addNode('夜: 復習・小論文', 0.78, 0.03, 'schedule', 5);
        addEdge(method1, sched1); addEdge(method2, sched1);
        addEdge(method3, sched2); addEdge(method5, sched2);
        addEdge(method6, sched3); addEdge(method7, sched3);
        addEdge(method8, sched4); addEdge(method9, sched4);
      }
    }

    function resize() {
      const parent = c.parentElement;
      if (!parent) return;
      c.width = parent.offsetWidth;
      c.height = parent.offsetHeight;
      buildTree();
    }

    resize();

    const colorMap: Record<string, string> = {
      root: '154, 7, 26',
      subject: '154, 7, 26',
      exam: '120, 80, 40',
      book: '201, 168, 76',
      schedule: '100, 100, 100',
    };
    const alphaMap: Record<string, number> = { root: 0.12, subject: 0.10, exam: 0.07, book: 0.06, schedule: 0.05 };
    const sizeMap: Record<string, number> = { root: 7, subject: 4, exam: 3, book: 2.5, schedule: 2 };

    function animate(now: number) {
      if (!ctx) return;
      if (growStartTime === 0) growStartTime = now;
      ctx.clearRect(0, 0, c.width, c.height);
      const t = now * 0.0005;
      const elapsed = now - growStartTime;

      const maxDepth = c.width < 768 ? 3 : 5;
      const growProgress = grown ? 999 : Math.min((elapsed / growDuration) * (maxDepth + 2), maxDepth + 2);
      if (!grown && growProgress >= maxDepth + 2) grown = true;

      // Draw edges
      edges.forEach((edge, ei) => {
        const fromNode = nodes[edge.from];
        const toNode = nodes[edge.to];
        const edgeDepth = Math.max(fromNode.depth, toNode.depth);
        const visible = growProgress - edgeDepth * 0.9;
        if (visible <= 0) return;
        const frac = Math.min(1, visible);

        const x1 = fromNode.xFrac * c.width;
        const y1 = fromNode.yFrac * c.height;
        const x2Full = toNode.xFrac * c.width;
        const y2Full = toNode.yFrac * c.height;
        const x2 = x1 + (x2Full - x1) * frac;
        const y2 = y1 + (y2Full - y1) * frac;

        const baseAlpha = alphaMap[toNode.color] || 0.05;
        const wave = grown ? Math.sin(t * 0.8 + ei * 0.3) * 0.3 + 0.7 : 1;
        const alpha = baseAlpha * frac * wave;
        const color = colorMap[toNode.color] || '100,100,100';

        const cx = (x1 + x2) / 2;
        const cy = y1 + (y2 - y1) * 0.3;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(cx, cy, x2, y2);
        ctx.strokeStyle = `rgba(${color}, ${alpha * 0.8})`;
        ctx.lineWidth = Math.max(0.5, 1.8 - edgeDepth * 0.25);
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const visible = growProgress - node.depth * 0.9;
        if (visible <= 0) return;
        const frac = Math.min(1, visible);

        const x = node.xFrac * c.width;
        const y = node.yFrac * c.height;

        const pulse = grown
          ? Math.sin(t * 0.6 + i * 0.4) * 0.3 + 0.7
          : (Math.sin(t * 1.2 + i * 0.5) * 0.5 + 0.5);

        const baseAlpha = alphaMap[node.color] || 0.05;
        const alpha = baseAlpha * frac * (grown ? pulse : 1);
        const color = colorMap[node.color] || '100,100,100';
        const size = sizeMap[node.color] || 2;

        // Glow for root/subject
        if (node.color === 'root' || node.color === 'subject') {
          const glowPulse = grown ? pulse : (Math.sin(t + i) * 0.5 + 0.5);
          ctx.beginPath();
          ctx.arc(x, y, size * 3 + glowPulse * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${alpha * 0.12})`;
          ctx.fill();
        }

        // Node dot
        ctx.beginPath();
        ctx.arc(x, y, size + (grown ? pulse * 0.5 : pulse * 0.8), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();

        // Label
        if (frac >= 0.8 && node.label) {
          const labelFrac = Math.min(1, (frac - 0.8) / 0.2);
          const labelAlpha = baseAlpha * 0.8 * labelFrac * (grown ? pulse : 1);
          const isMobile = c.width < 768;
          const fontSize = node.color === 'root' ? (isMobile ? 11 : 13) : node.color === 'subject' ? (isMobile ? 9 : 11) : (isMobile ? 8 : node.color === 'exam' ? 10 : 9);
          const fontWeight = (node.color === 'root' || node.color === 'subject') ? '600 ' : '';
          ctx.font = `${fontWeight}${fontSize}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillStyle = `rgba(${color}, ${labelAlpha})`;
          const labelY = (node.depth <= 1) ? y + size + (isMobile ? 10 : 14) : y - size - (isMobile ? 3 : 5);
          ctx.fillText(node.label, x, labelY);
        }
      });

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    window.addEventListener('resize', () => { resize(); grown = false; growStartTime = 0; });
    return () => { cancelAnimationFrame(animationId); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}
