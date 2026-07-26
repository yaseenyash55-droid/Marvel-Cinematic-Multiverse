"use client";

import { useRef } from "react";
import { signals } from "@/lib/signals";
import { useRaf } from "@/lib/useRaf";
import styles from "./cast.module.css";
import { motion } from "framer-motion";

const CAST = [
  { id: 1, name: "Robert Downey Jr.", role: "Doctor Doom", img: "https://upload.wikimedia.org/wikipedia/commons/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg" },
  { id: 2, name: "Pedro Pascal", role: "Mr. Fantastic", img: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Pedro_Pascal_by_Gage_Skidmore.jpg" },
  { id: 3, name: "Vanessa Kirby", role: "Invisible Woman", img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Vanessa_Kirby_in_2024.jpg" },
  { id: 4, name: "Joseph Quinn", role: "Human Torch", img: "https://upload.wikimedia.org/wikipedia/commons/6/69/Joseph_Quinn_by_Gage_Skidmore.jpg" },
  { id: 5, name: "Ebon Moss-Bachrach", role: "The Thing", img: "https://upload.wikimedia.org/wikipedia/commons/d/db/Ebon_Moss-Bachrach_%2834710185121%29_%28cropped%29.jpg" },
];

export default function CastOverlay() {
  const layerRef = useRef<HTMLDivElement>(null);

  useRaf(() => {
    const c = signals.cast;
    const layer = layerRef.current;
    if (!layer) return;

    if (c <= 0.001 || c >= 0.999) {
      if (layer.style.visibility !== "hidden") layer.style.visibility = "hidden";
      return;
    }
    layer.style.visibility = "visible";
    
    const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
    const smoothstep = (a: number, b: number, x: number) => {
      const t = clamp01((x - a) / (b - a));
      return t * t * (3 - 2 * t);
    };
    
    layer.style.opacity = (smoothstep(0, 0.05, c) * (1 - smoothstep(0.95, 1.0, c))).toFixed(3);
  });

  return (
    <div className={styles.layer} ref={layerRef} style={{ opacity: 0, visibility: "hidden" }}>
      <div className={styles.container}>
        <h2 className={styles.title}>The Cast</h2>
        <div className={styles.grid}>
          {CAST.map((actor, idx) => (
            <motion.div 
              key={actor.id} 
              className={styles.card}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
            >
              <img src={actor.img} alt={actor.name} className={styles.image} />
              <div className={styles.overlay}>
                <h3 className={styles.name}>{actor.name}</h3>
                <p className={styles.role}>{actor.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
