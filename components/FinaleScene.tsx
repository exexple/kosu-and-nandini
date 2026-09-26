'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { story } from '@/data/story';
import { useInView } from '@/hooks/useInView';

export default function FinaleScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.08 });
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduce ? [1, 1, 1] : [1.08, 1.02, 1.08]
  );

  const imageOpacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0.6]);

  const fade = (delay = 0) => ({
    initial: shouldReduce ? {} : { opacity: 0 },
    animate: isInView ? { opacity: 1 } : (shouldReduce ? {} : { opacity: 0 }),
    transition: { duration: 1.6, delay, ease: 'easeOut' },
  });

  const slideUp = (delay = 0) => ({
    initial: shouldReduce ? {} : { opacity: 0, y: 28 },
    animate: isInView ? { opacity: 1, y: 0 } : (shouldReduce ? {} : { opacity: 0, y: 28 }),
    transition: { duration: 1.4, delay, ease: [0.25, 0.1, 0.25, 1] },
  });

  const photo = story.photos[5]; // Last photo

  return (
    <section
      ref={sectionRef}
      id="finale"
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-labelledby="finale-heading"
    >
      {/* Full-bleed background photo */}
      <div className="absolute inset-0 will-change-transform">
        <motion.div
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="absolute inset-0"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                'linear-gradient(135deg, #1a1410 0%, #2a1f18 50%, #1a1410 100%)',
            }}
            aria-hidden
          />
        </motion.div>

        {/* Full overlay darkening */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(13,11,9,0.4) 0%, rgba(13,11,9,0.55) 50%, rgba(13,11,9,0.85) 100%)',
          }}
          aria-hidden
        />

        {/* Vignette edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(13,11,9,0.6) 100%)',
          }}
          aria-hidden
        />
      </div>

      {/* Content — vertically centered */}
      <div className="relative z-10 flex flex-col items-center justify-center
        min-h-screen px-6 py-24 text-center gap-8">

        {/* Countdown lines */}
        <div className="flex flex-col items-center gap-3">
          {story.finale.lines.map((line, i) => (
            <motion.p
              key={i}
              {...fade(0.2 + i * 0.25)}
              className="font-body text-sm sm:text-base tracking-[0.25em] uppercase
                text-ivory-300/60"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Gold rule */}
        <motion.span {...fade(1.0)} className="gold-divider" aria-hidden />

        {/* Main title */}
        <motion.h2
          id="finale-heading"
          {...slideUp(1.1)}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-normal italic
            text-ivory-100 leading-tight tracking-tight"
        >
          {story.finale.title}
        </motion.h2>

        {/* Names */}
        <motion.p
          {...slideUp(1.4)}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-normal
            text-ivory-100 tracking-tight"
        >
          {story.finale.names}
        </motion.p>

        {/* Gold rule */}
        <motion.span {...fade(1.6)} className="gold-divider" aria-hidden />

        {/* Closing message */}
        <motion.p
          {...fade(1.8)}
          className="font-body text-sm sm:text-base text-ivory-300/60 leading-loose
            max-w-xs sm:max-w-sm whitespace-pre-line"
        >
          {story.finale.closing}
        </motion.p>

        {/* Creator credit */}
        <motion.p
          {...fade(2.4)}
          className="font-body text-[0.65rem] tracking-widest uppercase
            text-ivory-300/25 mt-12"
        >
          Made with love, by {story.creator}
        </motion.p>
      </div>
    </section>
  );
}
