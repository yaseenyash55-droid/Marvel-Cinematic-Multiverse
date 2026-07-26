"use client";

import { useRef } from "react";
import { signals } from "@/lib/signals";
import { useRaf } from "@/lib/useRaf";
import styles from "./cast.module.css";
import { motion } from "framer-motion";

const CAST = [
  { id: 1, name: "Robert Downey Jr.", role: "Doctor Doom", img: "https://image.tmdb.org/t/p/w500/5qHNjhtjMD4YWH3UP0rm4tKwxIQ.jpg" },
  { id: 2, name: "Pedro Pascal", role: "Mr. Fantastic", img: "https://image.tmdb.org/t/p/w500/lrsjncoCGfsIrcxoEhaVNEfsPpo.jpg" },
  { id: 3, name: "Vanessa Kirby", role: "Invisible Woman", img: "https://image.tmdb.org/t/p/w500/zluWlhTqC9gYntV2LdFf6zLqAvo.jpg" },
  { id: 4, name: "Joseph Quinn", role: "Human Torch", img: "https://image.tmdb.org/t/p/w500/n5E8EhwB9xQ5F9X8U9YQYpZJ1oJ.jpg" },
  { id: 5, name: "Ebon Moss-Bachrach", role: "The Thing", img: "https://image.tmdb.org/t/p/w500/7aD8hV5x9YfFvJ9iCjYk5Qf9M5N.jpg" },
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
