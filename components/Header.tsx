'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './header.module.css';

const navItems = [
  { href: '/#services', label: 'サービス' },
  { href: '/#flow', label: 'ご利用の流れ' },
  { href: '/#plans', label: 'プラン' },
  { href: '/lab', label: 'Essence Lab' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contact', label: 'お問い合わせ' },
];

const BOOKING_URL = 'https://qyzxk47dyy.jp.larksuite.com/scheduler/176525bd10e971ba';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`} id="header">
        <div className="container">
          <Link href="/" className="logo">
            <span className="logo-text">ESSENCE</span>
          </Link>

          {/* Desktop nav - hidden via inline media query */}
          <nav className={`desktop-nav ${styles.desktopNav}`}>
            {navItems.map(item => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
            <a href={BOOKING_URL} className="nav-cta">無料相談</a>
          </nav>

          {/* Mobile hamburger - always in DOM */}
          <button
            className={`mobile-hamburger ${styles.hamburger}${menuOpen ? ' active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span className="hamburger-line line-1" />
            <span className="hamburger-line line-2" />
            <span className="hamburger-line line-3" />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div className={`mobile-overlay${menuOpen ? ' open' : ''}`}>
        <div className="mobile-overlay-backdrop" onClick={() => setMenuOpen(false)} />
        <div className="mobile-overlay-content">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              style={{ animationDelay: menuOpen ? `${i * 0.06}s` : '0s' }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={BOOKING_URL}
            className="mobile-nav-cta"
            style={{ animationDelay: menuOpen ? `${navItems.length * 0.06}s` : '0s' }}
            onClick={() => setMenuOpen(false)}
          >
            無料相談
          </a>
        </div>
      </div>
    </>
  );
}
