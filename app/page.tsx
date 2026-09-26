'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroScene from '@/components/IntroScene';
import BeginningScene from '@/components/BeginningScene';
import PhotoMemory from '@/components/PhotoMemory';
import VideoMemory from '@/components/VideoMemory';
import Timeline from '@/components/Timeline';
import LetterScene from '@/components/LetterScene';
import FinaleScene from '@/components/FinaleScene';
import AudioController from '@/components/AudioController';
import ProgressIndicator from '@/components/ProgressIndicator';
import { story } from '@/data/story';

function useSectionProgress(total: number) {
  const [current, setCurrent] = useState(1);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setCurrent(idx + 1);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all section sentinel elements after mount
    const ids = [
      'intro', 'beginning',
      'photo-2', 'video-1', 'photo-3', 'video-2',
      'photo-4', 'video-3', 'photo-5', 'video-4',
      'photo-6', 'timeline', 'letter', 'finale',
    ];

    const els: HTMLElement[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        els.push(el);
      }
    });
    sectionRefs.current = els;

    return () => observer.disconnect();
  }, []);

  return current;
}

// ─── Media sequence ──────────────────────────────────────────
// Layout: Photo01(beginning) → Photo02(framed) → Video01 →
//         Photo03(editorial) → Video02 → Photo04(immersive) →
//         Video03 → Photo05(hero) → Video04 → Photo06(anchor)

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSection = useSectionProgress(14);

  // Initialise audio element once on client
  useEffect(() => {
    const audio = new Audio('/audio/love-story.mp3');
    audio.loop = true;
    audio.preload = 'none';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const handleBegin = useCallback(() => {
    setStarted(true);
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => setIsPlaying(true)).catch(() => {
      // Autoplay blocked — still show the experience
    });
  }, []);

  const handleToggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  return (
    <main className="relative film-grain">
      {/* ── Intro overlay ──────────────────────────────────── */}
      <AnimatePresence>
        {!started && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100]"
          >
            <IntroScene onBegin={handleBegin} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main scrollable story ───────────────────────────── */}
      <AnimatePresence>
        {started && (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.4 }}
          >
            {/* Floating UI */}
            <ProgressIndicator current={currentSection} total={14} />
            <AudioController
              isPlaying={isPlaying}
              onToggle={handleToggle}
              audioRef={audioRef}
            />

            {/* ── Scene 1: The Beginning (includes Photo 01) ── */}
            <BeginningScene />

            {/* Vertical separator */}
            <div className="section-rule" aria-hidden />

            {/* ── Photo 02 — Framed ─────────────────────────── */}
            <PhotoMemory photo={story.photos[1]} index={1} variant="framed" />

            <div className="section-rule" aria-hidden />

            {/* ── Video 01 ──────────────────────────────────── */}
            <VideoMemory video={story.videos[0]} index={0} />

            <div className="section-rule" aria-hidden />

            {/* ── Photo 03 — Editorial ──────────────────────── */}
            <PhotoMemory photo={story.photos[2]} index={2} variant="editorial" />

            <div className="section-rule" aria-hidden />

            {/* ── Video 02 ──────────────────────────────────── */}
            <VideoMemory video={story.videos[1]} index={1} />

            <div className="section-rule" aria-hidden />

            {/* ── Photo 04 — Immersive ──────────────────────── */}
            <PhotoMemory photo={story.photos[3]} index={3} variant="immersive" />

            <div className="section-rule" aria-hidden />

            {/* ── Video 03 ──────────────────────────────────── */}
            <VideoMemory video={story.videos[2]} index={2} />

            <div className="section-rule" aria-hidden />

            {/* ── Photo 05 — Hero ───────────────────────────── */}
            <PhotoMemory photo={story.photos[4]} index={4} variant="hero" />

            <div className="section-rule" aria-hidden />

            {/* ── Video 04 ──────────────────────────────────── */}
            <VideoMemory video={story.videos[3]} index={3} />

            <div className="section-rule" aria-hidden />

            {/* ── Timeline ──────────────────────────────────── */}
            <Timeline />

            <div className="section-rule" aria-hidden />

            {/* ── Personal Letter ───────────────────────────── */}
            <LetterScene />

            {/* ── Finale (includes Photo 06 as background) ── */}
            <FinaleScene />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
