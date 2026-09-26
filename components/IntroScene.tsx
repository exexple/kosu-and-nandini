'use client';

import { motion } from 'framer-motion';
import { story } from '@/data/story';
import { useReducedMotion } from 'framer-motion';

interface IntroSceneProps {
  onBegin: () => void;
}

export default function IntroScene({ onBegin }: IntroSceneProps) {
  const shouldReduce = useReducedMotion();

  const fade = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 1.6, delay, ease: 'easeOut' },
        };

  const slideUp = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.4, delay, ease: [0.25, 0.1, 0.25, 1] },
        };

  return (
    <section
      id="intro"
      className="relative min-h-screen flex flex-col items-center justify-center
        overflow-hidden bg-near-black"
      aria-label="Intro screen"
    >
      {/* Subtle radial ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 55%, rgba(139,26,60,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg mx-auto gap-8">
        {/* Eyebrow line */}
        <motion.p
          {...fade(0.4)}
          className="chapter-label"
        >
          {story.intro.eyebrow}
        </motion.p>

        {/* Thin gold rule */}
        <motion.span {...fade(0.8)} className="gold-divider" aria-hidden />

        {/* Main headline */}
        <motion.h1
          {...slideUp(1.0)}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-normal
            italic text-ivory-100 leading-tight tracking-tight"
        >
          {story.intro.headline}
        </motion.h1>

        {/* Subline */}
        <motion.p
          {...fade(1.6)}
          className="font-body text-sm tracking-widest uppercase text-ivory-300/50"
        >
          {story.intro.subline}
        </motion.p>

        {/* CTA button */}
        <motion.div {...slideUp(2.2)}>
          <button
            id="begin-story-btn"
            onClick={onBegin}
            className="mt-4 group relative inline-flex items-center gap-3
              px-8 py-4 border border-ivory-300/20
              font-body text-sm tracking-[0.2em] uppercase text-ivory-300/70
              hover:text-ivory-100 hover:border-gold-300/50
              transition-all duration-500 rounded-sm"
            aria-label="Begin their love story"
          >
            {/* hover shimmer */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100
                transition-opacity duration-500"
              style={{
                background:
                  'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,168,90,0.04), transparent)',
              }}
              aria-hidden
            />
            <span>{story.intro.cta}</span>
            <span className="text-gold-300 group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </button>
        </motion.div>

        {/* Bottom fade hint */}
        <motion.p
          {...fade(3.0)}
          className="font-body text-[0.6rem] tracking-widest uppercase
            text-ivory-300/25 mt-8"
        >
          Turn sound on for the full experience
        </motion.p>
      </div>

      {/* Bottom vignette */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            'linear-gradient(to bottom, transparent, var(--color-near-black))',
        }}
        aria-hidden
      />
    </section>
  );
}
