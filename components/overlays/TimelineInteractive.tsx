"use client";

import { useRef } from "react";
import { signals } from "@/lib/signals";
import { useRaf } from "@/lib/useRaf";
import styles from "./timeline.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import VideoModal from "../ui/VideoModal";

/**
 * Interactive Timeline with video placeholders
 */
export default function TimelineInteractive() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string } | null>(null);

  useRaf(() => {
    const m = signals.mcu;
    const layer = layerRef.current;
    if (!layer) return;

    if (m <= 0.0008 || m >= 0.9996) {
      if (layer.style.visibility !== "hidden") layer.style.visibility = "hidden";
      return;
    }
    layer.style.visibility = "visible";
    
    const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
    const smoothstep = (a: number, b: number, x: number) => {
      const t = clamp01((x - a) / (b - a));
      return t * t * (3 - 2 * t);
    };
    layer.style.opacity = (smoothstep(0, 0.05, m) * (1 - smoothstep(0.94, 1.0, m))).toFixed(3);
  });

  const timelineEvents = [
    { year: "2008", title: "Iron Man", desc: "The dawn of a new era. Tony Stark builds his first suit.", videoSrc: null },
    { year: "2012", title: "The Avengers", desc: "Earth's mightiest heroes assemble in New York.", videoSrc: "/videos/avengers-2012.mp4" },
    { year: "2015", title: "Age of Ultron", desc: "Artificial intelligence goes rogue.", videoSrc: "/videos/ultron-2015.mp4" },
    { year: "2018", title: "Infinity War", desc: "The snap heard around the universe.", videoSrc: "/videos/infinity-war-2018.mp4" },
    { year: "2019", title: "Endgame", desc: "Whatever it takes to bring them back.", videoSrc: "/videos/endgame-2019.mp4" },
    { year: "2026", title: "Doomsday", desc: "A new threat emerges from the shadows. The Multiverse will shatter.", videoSrc: "/videos/doomsday-2026.mp4" },
  ];

  return (
    <>
      <div className="mcu-layer" ref={layerRef} style={{ opacity: 0, visibility: "hidden", pointerEvents: "auto", overflowY: "auto" }} data-lenis-prevent="true">
        <div className={styles.timelineContainer} style={{ paddingTop: '80px' }}>
          <div className={styles.timelineWrapper}>
            <h2 className={styles.timelineHeader}>
              <span className={styles.timelineTitleGlow}>The Road to Doomsday</span>
            </h2>
            
            <div style={{ width: '100%', maxWidth: '1400px', margin: '40px auto 60px auto', textAlign: 'center' }}>
              <img 
                src="/images/timeline_infographic.jpg" 
                alt="Complete Marvel Chronological Timeline"
                style={{
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: '16px', 
                  boxShadow: '0 20px 60px rgba(0,255,156,0.15)',
                  border: '1px solid rgba(0, 255, 156, 0.2)',
                  imageRendering: 'high-quality',
                  objectFit: 'contain'
                }} 
              />
            </div>
            
            <div className={styles.timelineNodes}>
              {timelineEvents.map((ev, idx) => (
                <motion.div 
                  key={idx} 
                  className={styles.timelineNode}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.4 }}
                  whileHover={{ scale: 1.03, boxShadow: "0px 0px 30px rgba(0, 255, 156, 0.4)" }}
                >
                  <div className={styles.nodeYear}>{ev.year}</div>
                  <div className={styles.nodeContent}>
                    <h3 className={styles.nodeTitle}>{ev.title}</h3>
                    <p className={styles.nodeDesc}>{ev.desc}</p>
                    
                    {ev.videoSrc && (
                      <button 
                        className={styles.watchBtn} 
                        onClick={() => setSelectedVideo({ src: ev.videoSrc!, title: ev.title })}
                        style={{ marginTop: '15px', padding: '10px 20px', background: 'rgba(0, 255, 156, 0.2)', color: '#00ff9c', border: '1px solid rgba(0, 255, 156, 0.5)', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Space Grotesk', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                      >
                        ▶ Watch Trailer
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <span className={styles.fade} style={{ pointerEvents: "none" }} />
      </div>

      <VideoModal 
        isOpen={!!selectedVideo} 
        videoSrc={selectedVideo?.src || null} 
        title={selectedVideo?.title} 
        onClose={() => setSelectedVideo(null)} 
      />
    </>
  );
}
