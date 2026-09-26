'use client';

import { useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Video } from '@/data/story';
import { useInView } from '@/hooks/useInView';

interface VideoMemoryProps {
  video: Video;
  index: number; // 0-based
}

export default function VideoMemory({ video, index }: VideoMemoryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduce = useReducedMotion();

  // Viewport-aware playback via IntersectionObserver
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.play().catch(() => {
              // Autoplay blocked — silently ignore
            });
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, []);

  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id={`video-${index + 1}`}
      className="relative py-16 sm:py-24 px-6"
      aria-label={`Video memory ${index + 1}: ${video.caption}`}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
        {/* Chapter label */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : (shouldReduce ? {} : { opacity: 0 })}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="chapter-label"
        >
          — Memory {String(index + 1).padStart(2, '0')} —
        </motion.p>

        {/* Video container */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : (shouldReduce ? {} : { opacity: 0, scale: 0.98 })}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full video-wrapper vignette rounded-sm overflow-hidden"
          style={{ aspectRatio: '9/16', maxHeight: '80vh' }}
        >
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}
            muted
            playsInline
            loop
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
            aria-label={video.caption}
          />

          {/* Fallback background if video fails */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                'linear-gradient(135deg, #1a1410 0%, #2a1f18 50%, #1a1410 100%)',
            }}
            aria-hidden
          />

          {/* Ambient bottom gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/3 z-10 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(13,11,9,0.7), transparent)',
            }}
            aria-hidden
          />
        </motion.div>

        {/* Caption */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : (shouldReduce ? {} : { opacity: 0, y: 12 })}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <p className="font-display text-lg sm:text-xl italic text-ivory-200/80">
            {video.caption}
          </p>
          {video.subcaption && (
            <p className="font-body text-xs tracking-widest uppercase text-ivory-300/40">
              {video.subcaption}
            </p>
          )}
          <span className="gold-divider mt-2" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
