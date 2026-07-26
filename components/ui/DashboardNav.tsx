"use client";

import { useEffect, useState } from "react";
import { signals } from "@/lib/signals";
import { useRaf } from "@/lib/useRaf";
import styles from "./dashboard.module.css";

const SECTIONS = [
  { id: "Intro", label: "Intro", index: 0 },
  { id: "Hero", label: "Hero", index: 1 },
  { id: "Characters", label: "Characters", index: 2 },
  { id: "Story", label: "Story", index: 3 },
  { id: "Timeline", label: "Timeline", index: 4 },
  { id: "Finale", label: "Finale", index: 5 },
  { id: "Saga", label: "Saga", index: 6 },
  { id: "Title", label: "Title", index: 7 },
  { id: "Cast", label: "Cast", index: 8 },
];

export default function DashboardNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useRaf(() => {
    // Determine active section based on scroll progress
    const s = signals.scroll;
    let idx = 0;
    if (s > 0.95) idx = 8; // Cast/Footer
    else if (s > 0.86) idx = 7; // Title
    else if (s > 0.77) idx = 6; // Saga/MCU
    else if (s > 0.65) idx = 5; // Finale
    else if (s > 0.5) idx = 4; // Timeline (Reel)
    else if (s > 0.35) idx = 3; // Story
    else if (s > 0.25) idx = 2; // Characters
    else if (s > 0.1) idx = 1; // Hero
    
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    }
  });

  const jumpTo = (index: number) => {
    const sections = Array.from(document.querySelectorAll('.scroll-track section')) as HTMLElement[];
    if (sections[index]) {
      const top = sections[index].offsetTop;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.dashboard}>
      <button 
        className={styles.navBtn} 
        onClick={() => activeIndex > 0 && jumpTo(activeIndex - 1)}
        disabled={activeIndex === 0}
        aria-label="Previous Section"
      >
        {isMobile ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        )}
      </button>

      {SECTIONS.map((sec, i) => (
        <button
          key={sec.id}
          className={`${styles.dot} ${activeIndex === sec.index ? styles.active : ''}`}
          onClick={() => jumpTo(sec.index)}
          title={sec.label}
        >
          <span className={styles.label}>{sec.label}</span>
        </button>
      ))}

      <button 
        className={styles.navBtn} 
        onClick={() => activeIndex < SECTIONS.length - 1 && jumpTo(activeIndex + 1)}
        disabled={activeIndex === SECTIONS.length - 1}
        aria-label="Next Section"
      >
        {isMobile ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        )}
      </button>
    </nav>
  );
}
