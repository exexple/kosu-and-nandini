'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { story } from '@/data/story';
import { useInView } from '@/hooks/useInView';

export default function LetterScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  const shouldReduce = useReducedMotion();

  const fade = (delay = 0) => ({
    initial: shouldReduce ? {} : { opacity: 0 },
    animate: isInView ? { opacity: 1 } : (shouldReduce ? {} : { opacity: 0 }),
    transition: { duration: 1.4, delay, ease: 'easeOut' },
  });

  const slideUp = (delay = 0) => ({
    initial: shouldReduce ? {} : { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : (shouldReduce ? {} : { opacity: 0, y: 24 }),
    transition: { duration: 1.4, delay, ease: [0.25, 0.1, 0.25, 1] },
  });

  return (
    <section
      ref={sectionRef}
      id="letter"
      className="relative py-24 sm:py-32 px-6 overflow-hidden"
      aria-labelledby="letter-heading"
    >
      {/* Very subtle warm background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139,26,60,0.04), transparent 80%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-start gap-8">
        {/* Chapter marker */}
        <motion.p {...fade(0)} className="chapter-label self-center">
          — A personal note —
        </motion.p>

        {/* Decorative corner */}
        <motion.div {...fade(0.2)} className="self-center" aria-hidden>
          <span className="font-display text-4xl text-gold-300/20 select-none leading-none">"</span>
        </motion.div>

        {/* Salutation */}
        <motion.h2
          id="letter-heading"
          {...slideUp(0.3)}
          className="font-display text-xl sm:text-2xl italic text-ivory-200 font-normal leading-snug"
        >
          {story.letter.salutation}
        </motion.h2>

        {/* Gold rule */}
        <motion.span {...fade(0.4)} className="gold-divider !mx-0 w-12" aria-hidden />

        {/* Letter body */}
        <motion.div {...fade(0.5)} className="w-full">
          <p className="letter-body">{story.letter.body}</p>
        </motion.div>

        {/* Signature */}
        <motion.p
          {...slideUp(0.7)}
          className="font-display text-base italic text-ivory-300/60 mt-4 self-end"
        >
          {story.letter.sign}
        </motion.p>

        {/* Closing quote */}
        <motion.div {...fade(0.8)} className="self-center" aria-hidden>
          <span className="font-display text-4xl text-gold-300/20 select-none leading-none">"</span>
        </motion.div>
      </div>
    </section>
  );
}
