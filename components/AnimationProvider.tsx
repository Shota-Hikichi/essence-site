'use client';

import { useEffect, useRef } from 'react';

export default function AnimationProvider() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ===== CUSTOM CURSOR =====
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    // Smooth ring follow
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    };

    // Hover detection
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .btn, .plan-card, .service-card, .stat-card, .testimonial-card, .logo-item, .who-item')) {
        document.body.classList.add('cursor-hover');
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .btn, .plan-card, .service-card, .stat-card, .testimonial-card, .logo-item, .who-item')) {
        document.body.classList.remove('cursor-hover');
      }
    };

    // Click effect
    const onMouseDown = () => document.body.classList.add('cursor-click');
    const onMouseUp = () => document.body.classList.remove('cursor-click');

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    requestAnimationFrame(animateRing);

    // ===== SCROLL ANIMATIONS =====
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    // ===== PARALLAX SUBTLE =====
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    const onScroll = () => {
      const scrollY = window.scrollY;
      parallaxElements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.parallax || '0.1');
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
        (el as HTMLElement).style.transform = `translateY(${offset}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
