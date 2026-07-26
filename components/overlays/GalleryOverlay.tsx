"use client";

import { useRef, useEffect } from "react";
import { useExperience } from "@/lib/store";
import styles from "./gallery.module.css";
import { motion, AnimatePresence } from "framer-motion";

import CustomVideoPlayer from "../ui/CustomVideoPlayer";

/**
 * GalleryOverlay
 * Appears when a header navigation item is clicked.
 * Uses a horizontal scrolling layout similar to HorizontalReel, with keyboard support.
 */
export default function GalleryOverlay() {
  const activeGallery = useExperience((s) => s.activeGallery);
  const setActiveGallery = useExperience((s) => s.setActiveGallery);
  const trackRef = useRef<HTMLDivElement>(null);

  // Close gallery with Escape key, navigate with arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeGallery) return;
      if (e.key === "Escape") {
        setActiveGallery(null);
      } else if (e.key === "ArrowRight" && trackRef.current) {
        trackRef.current.scrollBy({ left: 400, behavior: 'smooth' });
      } else if (e.key === "ArrowLeft" && trackRef.current) {
        trackRef.current.scrollBy({ left: -400, behavior: 'smooth' });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGallery, setActiveGallery]);

  // Horizontal scroll wheel support
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (activeGallery && trackRef.current) {
        trackRef.current.scrollLeft += e.deltaY;
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeGallery]);

  // Placeholder data for galleries
  const getGalleryItems = (category: string) => {
    if (category === "Overview") {
      return [
        { 
          id: 0, 
          title: "About the Developer", 
          desc: "Hi! I am the creator of this project. This is a showcase of my frontend engineering and creative coding skills.", 
          imgSrc: "/videos/char-doom-poster.jpg",
          videoSrc: null
        },
        { 
          id: 1, 
          title: "Project Vision", 
          desc: "Built to push the boundaries of cinematic web experiences, using Next.js, Framer Motion, and custom styling.", 
          imgSrc: "/videos/title-reveal-poster.jpg",
          videoSrc: null
        },
        { 
          id: 2, 
          title: "Avengers: Doomsday", 
          desc: "A stunning interactive tribute to the upcoming epic crossover event in the Marvel Cinematic Universe.", 
          imgSrc: "/videos/finale-poster.jpg",
          videoSrc: null
        }
      ];
    }

    if (category === "Universe") {
      return [
        { 
          id: 0, 
          title: "Earth 616 (Avengers)", 
          desc: "The sacred timeline. Home to Earth's mightiest heroes.", 
          imgSrc: "/images/earth_616_real.jpg",
          videoSrc: null
        },
        { 
          id: 1, 
          title: "Earth 838 (Fantastic 4)", 
          desc: "A universe watched over by the Illuminati.", 
          imgSrc: "/images/earth_838_real.jpg",
          videoSrc: null
        },
        { 
          id: 2, 
          title: "X-Men Universe", 
          desc: "A world where mutants fight for a peaceful coexistence.", 
          imgSrc: "/images/x_men_real.jpg",
          videoSrc: null
        }
      ];
    }

    if (category === "SuperHeroes / Super Villains") {
      return [
        { id: 0, title: "Captain America", desc: "The First Avenger. A symbol of freedom and liberty.", imgSrc: "/images/cap.jpg", videoSrc: null },
        { id: 1, title: "Iron Man", desc: "Genius, billionaire, playboy, philanthropist.", imgSrc: "/images/ironman.jpg", videoSrc: null },
        { id: 2, title: "Thor", desc: "The God of Thunder, wielder of Mjolnir.", imgSrc: "/images/thor.jpg", videoSrc: null },
        { id: 3, title: "Spider-Man", desc: "Your friendly neighborhood wall-crawler.", imgSrc: "/images/spidey.jpg", videoSrc: null },
        { id: 4, title: "Wolverine", desc: "The best there is at what he does.", imgSrc: "/images/wolverine.jpg", videoSrc: null },
        { id: 5, title: "Doctor Doom", desc: "The supreme monarch of Latveria and master of science and magic.", imgSrc: "/images/doom.jpg", videoSrc: null },
        { id: 6, title: "Doctor Strange", desc: "The Sorcerer Supreme and Master of the Mystic Arts.", imgSrc: "/images/strange.jpg", videoSrc: null },
        { id: 7, title: "Mister Fantastic", desc: "The smartest man alive, leader of the Fantastic Four.", imgSrc: "/images/mrfantastic.jpg", videoSrc: null }
      ];
    }

    if (category === "Trailers") {
      return [
        { id: 0, title: "Marvel Intro", desc: "The cinematic beginning.", videoSrc: "/videos/marvel-intro-seq.mp4", imgSrc: null },
        { id: 1, title: "Title Reveal", desc: "The road to Doomsday.", videoSrc: "/videos/title-reveal.mp4", imgSrc: null },
        { id: 2, title: "Hero Sequence", desc: "Earth's mightiest stand together.", videoSrc: "/videos/hero-seq-v2.mp4", imgSrc: null },
        { id: 3, title: "The Finale", desc: "The ultimate showdown.", videoSrc: "/videos/finale-seq.mp4", imgSrc: null },
      ];
    }

    const count = category === "Trailers" ? 4 : 3;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      title: `${category} Item 0${i + 1}`,
      desc: `Explore the incredible ${category.toLowerCase()} of the Marvel Universe.`,
      videoSrc: null,
      imgSrc: null
    }));
  };

  return (
    <AnimatePresence>
      {activeGallery && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className={styles.header}>
            <h2 className={styles.title}>{activeGallery}</h2>
            <button className={styles.closeBtn} onClick={() => setActiveGallery(null)}>
              CLOSE ✕
            </button>
          </div>

          <div className={styles.trackContainer}>
            <div className={styles.track} ref={trackRef}>
              {getGalleryItems(activeGallery).map((item, i) => (
                <motion.div
                  key={item.id}
                  className={styles.card}
                  initial={{ opacity: 0, x: 100, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.7, type: "spring", bounce: 0.3 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(0, 255, 156, 0.8)", boxShadow: "0 0 30px rgba(0, 255, 156, 0.3)" }}
                >
                  <div className={styles.cardImagePlaceholder}>
                    {item.videoSrc ? (
                      <CustomVideoPlayer src={item.videoSrc} autoPlay={true} />
                    ) : item.imgSrc ? (
                      <img src={item.imgSrc} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span>[ {item.title} Media ]</span>
                    )}
                  </div>
                  <div className={styles.cardInfo}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className={styles.instructions}>
            Use mouse wheel, touch, or arrow keys to scroll horizontally. Press ESC to close.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
