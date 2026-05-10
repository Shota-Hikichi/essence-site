'use client';

import { useEffect, useRef } from 'react';

// Pattern C: 波紋＋収束 — 複数の波紋が広がり、一点（合格）に収束していく
export default function HeroBgPatternC() {
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

    interface Ripple {
      x: number; y: number; radius: number; maxRadius: number;
      speed: number; startTime: number; color: string;
    }

    let ripples: Ripple[] = [];
    let startTime = 0;

    function init() {
      startTime = performance.now();
      ripples = [];
    }

    function spawnRipple(now: number) {
      const side = Math.random();
      let x: number, y: number;
      if (side < 0.25) { x = Math.random() * c.width; y = -20; }
      else if (side < 0.5) { x = Math.random() * c.width; y = c.height + 20; }
      else if (side < 0.75) { x = -20; y = Math.random() * c.height; }
      else { x = c.width + 20; y = Math.random() * c.height; }

      const colors = ['154, 7, 26', '201, 168, 76', '100, 100, 120'];
      ripples.push({
        x, y, radius: 0,
        maxRadius: 80 + Math.random() * 120,
        speed: 0.3 + Math.random() * 0.4,
        startTime: now,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Convergence target point
    const targetX = () => c.width * 0.82;
    const targetY = () => c.height * 0.22;

    // Flowing particles that move toward the target
    interface FlowParticle {
      x: number; y: number; speed: number; size: number; alpha: number;
    }
    let flowParticles: FlowParticle[] = [];

    function spawnFlowParticle() {
      const angle = Math.random() * Math.PI * 2;
      const dist = 200 + Math.random() * 300;
      flowParticles.push({
        x: targetX() + Math.cos(angle) * dist,
        y: targetY() + Math.sin(angle) * dist,
        speed: 0.3 + Math.random() * 0.5,
        size: 1 + Math.random() * 1.5,
        alpha: 0.02 + Math.random() * 0.04,
      });
    }

    let lastRipple = 0;
    let lastParticle = 0;

    function animate(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, c.width, c.height);

      // Spawn ripples periodically
      if (now - lastRipple > 800) {
        spawnRipple(now);
        lastRipple = now;
        if (ripples.length > 15) ripples.shift();
      }

      // Spawn flow particles
      if (now - lastParticle > 150) {
        spawnFlowParticle();
        lastParticle = now;
        if (flowParticles.length > 40) flowParticles.shift();
      }

      // Grid dots
      for (let x = 0; x < c.width; x += 50) {
        for (let y = 0; y < c.height; y += 50) {
          ctx.beginPath();
          ctx.arc(x, y, 0.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(154, 7, 26, 0.025)';
          ctx.fill();
        }
      }

      // Draw ripples
      ripples.forEach(ripple => {
        ripple.radius += ripple.speed;
        const life = ripple.radius / ripple.maxRadius;
        if (life > 1) return;
        const alpha = (1 - life) * 0.06;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ripple.color}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      ripples = ripples.filter(r => r.radius / r.maxRadius <= 1);

      // Draw convergence target
      const tx = targetX();
      const ty = targetY();
      const pulse = Math.sin(now * 0.003) * 0.02 + 0.06;

      // Target rings
      for (let i = 0; i < 3; i++) {
        const ringRadius = 10 + i * 15 + Math.sin(now * 0.002 + i) * 3;
        ctx.beginPath();
        ctx.arc(tx, ty, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(154, 7, 26, ${0.04 - i * 0.01})`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([2, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Target core
      ctx.beginPath();
      ctx.arc(tx, ty, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(154, 7, 26, ${pulse})`;
      ctx.fill();

      // Label
      ctx.font = '11px sans-serif';
      ctx.fillStyle = `rgba(154, 7, 26, 0.12)`;
      ctx.textAlign = 'center';
      ctx.fillText('合格', tx, ty - 20);

      // Draw flow particles moving toward target
      flowParticles.forEach(p => {
        const dx = tx - p.x;
        const dy = ty - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 3) {
          p.x += (dx / dist) * p.speed;
          p.y += (dy / dist) * p.speed;
        }
        const closeness = Math.max(0, 1 - dist / 400);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.5 + closeness * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha + closeness * 0.03})`;
        ctx.fill();

        // Trail line to target (very faint)
        if (dist < 200) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(tx, ty);
          ctx.strokeStyle = `rgba(154, 7, 26, ${0.01 * closeness})`;
          ctx.lineWidth = 0.3;
          ctx.stroke();
        }
      });
      flowParticles = flowParticles.filter(p => {
        const dx = tx - p.x;
        const dy = ty - p.y;
        return Math.sqrt(dx * dx + dy * dy) > 5;
      });

      // Bottom-left label
      ctx.font = '11px sans-serif';
      ctx.fillStyle = 'rgba(154, 7, 26, 0.06)';
      ctx.textAlign = 'center';
      ctx.fillText('現在地', c.width * 0.15, c.height * 0.82);

      animationId = requestAnimationFrame(animate);
    }

    init();
    animationId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}
