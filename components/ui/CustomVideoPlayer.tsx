"use client";

import { useRef, useState } from "react";
import styles from "./video-player.module.css";
import { motion } from "framer-motion";

interface CustomVideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  startUnmuted?: boolean;
}

export default function CustomVideoPlayer({ src, poster, autoPlay = true, startUnmuted = false }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(!startUnmuted); // Muted by default unless startUnmuted is true
  const [isTheatreMode, setIsTheatreMode] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const [volumeLevel, setVolumeLevel] = useState(100);
  const [brightness, setBrightness] = useState(100);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolumeLevel(val);
    
    if (!audioCtxRef.current && videoRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContext();
      gainNodeRef.current = audioCtxRef.current.createGain();
      try {
        sourceNodeRef.current = audioCtxRef.current.createMediaElementSource(videoRef.current);
        sourceNodeRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(audioCtxRef.current.destination);
      } catch (err) {
        console.error("Audio context already created", err);
      }
    }
    
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = val / 100;
    }

    if (val > 0 && isMuted) {
      setIsMuted(false);
      if (videoRef.current) videoRef.current.muted = false;
    }
  };

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightness(Number(e.target.value));
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen().catch(err => {
          console.error("Error attempting to enable fullscreen:", err);
        });
      }
    }
  };

  const toggleTheatreMode = () => {
    setIsTheatreMode(!isTheatreMode);
  };

  return (
    <div 
      className={styles.container}
      style={isTheatreMode ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        borderRadius: 0,
        backgroundColor: '#000'
      } : {}}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={styles.video}
        style={{ filter: `brightness(${brightness}%)` }}
        autoPlay={autoPlay}
        muted={isMuted}
        loop
        playsInline
      />
      <div className={styles.controlsOverlay}>
        <div className={styles.controlsBar}>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.controlBtn} 
            onClick={() => skip(-10)}
            title="Backward 10s"
          >
            ⏪
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.controlBtn} 
            onClick={togglePlay}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶️"}
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.controlBtn} 
            onClick={() => skip(10)}
            title="Forward 10s"
          >
            ⏩
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.controlBtn} 
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? "🔇" : "🔊"}
          </motion.button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            <label style={{ fontSize: '14px' }}>☀️</label>
            <input 
              type="range" 
              min="20" max="200" 
              value={brightness} 
              onChange={handleBrightnessChange} 
              style={{ width: '80px', cursor: 'pointer' }}
              title="Brightness"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '10px' }}>
            <label style={{ fontSize: '14px' }}>🔊</label>
            <input 
              type="range" 
              min="0" max="200" 
              value={volumeLevel} 
              onChange={handleVolumeChange} 
              style={{ width: '80px', cursor: 'pointer' }}
              title="Volume (0 - 200%)"
            />
            <span style={{ fontSize: '12px', minWidth: '36px', textAlign: 'right' }}>{volumeLevel}%</span>
          </div>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.controlBtn} 
            onClick={toggleTheatreMode}
            title={isTheatreMode ? "Exit Theatre Mode" : "Theatre Mode"}
            style={{ marginLeft: '10px' }}
          >
            {isTheatreMode ? "✖️" : "🎦"}
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.controlBtn} 
            onClick={toggleFullScreen}
            title="Full Screen"
          >
            ⛶
          </motion.button>
        </div>
      </div>
    </div>
  );
}
