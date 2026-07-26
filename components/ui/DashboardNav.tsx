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
];

export default function DashboardNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  useRaf(() => {
    // Determine active section based on scroll progress
    const s = signals.scroll;
    let idx = 0;
    if (s > 0.95) idx = 7; // Title/Footer
    else if (s > 0.8) idx = 6; // Saga/MCU
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
    </nav>
  );
}
