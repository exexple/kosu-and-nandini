'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { story } from '@/data/story';
import { useInView } from '@/hooks/useInView';

export default function BeginningScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.15 });
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax on photo
  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduce ? ['0%', '0%'] : ['-6%', '6%']);

  const slideUp = (delay = 0) => ({
    initial: shouldReduce ? {} : { opacity: 0, y: 32 },
    animate: isInView ? { opacity: 1, y: 0 } : (shouldReduce ? {} : { opacity: 0, y: 32 }),
    transition: { duration: 1.4, delay, ease: [0.25, 0.1, 0.25, 1] },
  });

  const fadeIn = (delay = 0) => ({
    initial: shouldReduce ? {} : { opacity: 0 },
    animate: isInView ? { opacity: 1 } : (shouldReduce ? {} : { opacity: 0 }),
    transition: { duration: 1.6, delay, ease: 'easeOut' },
  });

  const photo = story.photos[0];

  return (
    <section
      id="beginning"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center
        py-24 px-6 overflow-hidden"
      aria-labelledby="beginning-heading"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 60%, rgba(139,26,60,0.07) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
        {/* Chapter marker */}
        <motion.p {...fadeIn(0)} className="chapter-label">
          — Chapter 01 —
        </motion.p>

        {/* Prelude */}
        <motion.p
          {...slideUp(0.1)}
          className="font-display text-xl sm:text-2xl italic text-ivory-200/70
            font-normal tracking-wide"
        >
          {story.beginning.prelude}
        </motion.p>

        {/* Names — hero display */}
        <motion.h2
          id="beginning-heading"
          {...slideUp(0.3)}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-normal
            text-ivory-100 leading-tight tracking-tight"
        >
          {story.beginning.names}
        </motion.h2>

        {/* Date */}
        <motion.p
          {...fadeIn(0.5)}
          className="font-body text-xs tracking-[0.3em] uppercase text-gold-300/70"
        >
          {story.beginning.date}
        </motion.p>

        {/* Gold rule */}
        <motion.span {...fadeIn(0.6)} className="gold-divider my-2" aria-hidden />

        {/* Supporting copy */}
        <motion.p
          {...slideUp(0.7)}
          className="font-body text-base sm:text-lg text-ivory-300/60 leading-relaxed
            max-w-md font-light"
        >
          {story.beginning.copy}
        </motion.p>

        {/* Photo 01 — cinematic reveal */}
        <motion.div
          {...fadeIn(1.0)}
          className="relative w-full mt-10 vignette overflow-hidden rounded-sm"
          style={{ aspectRatio: '3/4', maxHeight: '65vh' }}
        >
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover scale-105"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            {/* Fallback */}
            <div className="img-fallback absolute inset-0 -z-10" aria-hidden />
          </motion.div>

          {/* Bottom caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-6"
            style={{
              background: 'linear-gradient(to top, rgba(13,11,9,0.8), transparent)',
            }}>
            <p className="font-body text-xs tracking-widest uppercase text-ivory-300/60">
              {photo.caption}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
