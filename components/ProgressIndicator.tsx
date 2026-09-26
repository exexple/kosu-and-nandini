'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface ProgressIndicatorProps {
  current: number;  // 1-based current section index
  total: number;
}

export default function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-6 right-5 z-40 flex flex-col items-end gap-2"
      role="navigation"
      aria-label="Story progress"
    >
      {/* Numeric indicator */}
      <p
        className="font-body text-[0.6rem] tracking-[0.2em] text-ivory-300/30 tabular-nums"
        aria-label={`Section ${current} of ${total}`}
      >
        {String(current).padStart(2, '0')}&nbsp;/&nbsp;{String(total).padStart(2, '0')}
      </p>

      {/* Thin progress bar */}
      <div
        className="h-[40px] w-[1px] bg-ivory-300/10 relative overflow-hidden"
        aria-hidden
      >
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gold-300/60"
          style={{ height: `${(current / total) * 100}%` }}
          animate={{ height: `${(current / total) * 100}%` }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}
