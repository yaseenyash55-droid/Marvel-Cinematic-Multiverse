"use client";

import { useRef } from "react";
import { signals } from "@/lib/signals";
import { useRaf } from "@/lib/useRaf";
import styles from "./footer.module.css";

/**
 * The closing footer — rises from the bottom after the title reveal, driven by
 * `signals.footer`. Minimal + elegant, in the same dark-green cinematic language.
 * Links are placeholders for now.
 */
import { useExperience } from "@/lib/store";

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

const NAV = ["Overview", "Universe", "SuperHeroes / Super Villains", "Trailers"];
const SOCIAL = [
  { name: "Instagram", url: "https://www.instagram.com/comi.ccast?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { name: "Telegram", url: "https://t.me/doom5129" },
  { name: "YouTube", url: "https://www.youtube.com/@comiccast-ymy" }
];

export default function SiteFooter() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const footRef = useRef<HTMLElement>(null);
  const setActiveGallery = useExperience((s) => s.setActiveGallery);

  useRaf(() => {
    const foot = signals.footer;
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (foot <= 0.0006) {
      if (wrap.style.visibility !== "hidden") wrap.style.visibility = "hidden";
      return;
    }
    wrap.style.visibility = "visible";
    if (footRef.current) {
      footRef.current.style.transform = `translateY(${((1 - foot) * 100).toFixed(2)}%)`;
      footRef.current.style.opacity = smoothstep(0, 0.25, foot).toFixed(3);
    }
  });

  return (
    <div className={styles.wrap} ref={wrapRef} style={{ visibility: "hidden" }}>
      <footer className={styles.footer} ref={footRef} style={{ opacity: 0 }}>
        <span className={styles.glow} />
        <div className={styles.inner}>
          <div className={styles.brand}>
            <span className={styles.mark}>
              Doomsday<span>.</span>
            </span>
            <span className={styles.tag}>A scroll-driven cinematic concept experience.</span>
          </div>

          <nav>
            <div className={styles.colHead}>Explore</div>
            <div className={styles.links}>
              {NAV.map((l) => (
                <a 
                  key={l} 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveGallery(l);
                  }}
                >
                  {l}
                </a>
              ))}
            </div>
          </nav>

          <div>
            <div className={styles.colHead}>Follow</div>
            <div className={styles.social}>
              {SOCIAL.map((l) => (
                <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.rule} />
        <div className={styles.base}>
          <span>© 2026 Comic Cast. All rights reserved.</span>
          <span>Built as a cinematic web experience.</span>
        </div>
      </footer>
    </div>
  );
}
