"use client";

import { motion, AnimatePresence } from "framer-motion";
import CustomVideoPlayer from "./CustomVideoPlayer";
import styles from "./video-modal.module.css";
import { useEffect } from "react";

interface VideoModalProps {
  isOpen: boolean;
  videoSrc: string | null;
  title?: string;
  onClose: () => void;
}

export default function VideoModal({ isOpen, videoSrc, title, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && videoSrc && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.modalBackdrop} onClick={onClose} />
          
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{title || "Watch Trailer"}</h3>
              <button className={styles.closeBtn} onClick={onClose}>✕</button>
            </div>
            <div className={styles.videoWrapper}>
              <CustomVideoPlayer src={videoSrc} autoPlay={true} startUnmuted={true} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
