'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { story } from '@/data/story';
import { useInView } from '@/hooks/useInView';

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.08 });
  const shouldReduce = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative py-24 sm:py-32 px-6 overflow-hidden"
      aria-labelledby="timeline-heading"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(139,26,60,0.05), transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-16">
        {/* Section heading */}
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.p
            initial={shouldReduce ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : (shouldReduce ? {} : { opacity: 0 })}
            transition={{ duration: 1.2 }}
            className="chapter-label"
          >
            — Their story —
          </motion.p>

          <motion.h2
            id="timeline-heading"
            initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : (shouldReduce ? {} : { opacity: 0, y: 24 })}
            transition={{ duration: 1.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display text-3xl sm:text-4xl font-normal italic text-ivory-100"
          >
            {story.timeline.heading}
          </motion.h2>

          <motion.p
            initial={shouldReduce ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : (shouldReduce ? {} : { opacity: 0 })}
            transition={{ duration: 1.4, delay: 0.3 }}
            className="font-body text-sm text-ivory-300/50 tracking-wide"
          >
            {story.timeline.subheading}
          </motion.p>

          <motion.span
            initial={shouldReduce ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : (shouldReduce ? {} : { opacity: 0 })}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="gold-divider mt-2"
            aria-hidden
          />
        </div>

        {/* Timeline items */}
        <ol className="relative flex flex-col gap-0 w-full" aria-label="Year timeline">
          {/* Vertical line */}
          <div
            className="absolute left-[28px] sm:left-[36px] top-0 bottom-0 w-px"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(212,168,90,0.25) 10%, rgba(212,168,90,0.25) 90%, transparent)',
            }}
            aria-hidden
          />

          {story.timeline.items.map((item, i) => (
            <TimelineItem
              key={item.chapter}
              item={item}
              index={i}
              isInView={isInView}
              shouldReduce={shouldReduce}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
  isInView,
  shouldReduce,
}: {
  item: (typeof story.timeline.items)[number];
  index: number;
  isInView: boolean;
  shouldReduce: boolean | null;
}) {
  return (
    <motion.li
      initial={shouldReduce ? {} : { opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : (shouldReduce ? {} : { opacity: 0, x: -16 })}
      transition={{
        duration: 1.2,
        delay: 0.2 + index * 0.18,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative flex gap-6 sm:gap-8 pb-12 last:pb-0"
    >
      {/* Chapter dot */}
      <div className="flex-none flex flex-col items-center" style={{ width: 56 }}>
        <div
          className="w-[14px] h-[14px] rounded-full border border-gold-300/60
            bg-near-black flex items-center justify-center"
          style={{ marginTop: 2 }}
          aria-hidden
        >
          <div className="w-[5px] h-[5px] rounded-full bg-gold-300/70" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 pt-0.5 pb-2">
        <span className="chapter-label">Chapter {item.chapter}</span>
        <h3 className="font-display text-xl sm:text-2xl font-normal italic text-ivory-100">
          {item.title}
        </h3>
        <p className="font-body text-sm text-ivory-300/55 leading-relaxed max-w-xs sm:max-w-sm">
          {item.description}
        </p>
      </div>
    </motion.li>
  );
}
