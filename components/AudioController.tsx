'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { Pause, Play, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioControllerProps {
  isPlaying: boolean;
  onToggle: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export default function AudioController({
  isPlaying,
  onToggle,
  audioRef,
}: AudioControllerProps) {
  const [visible, setVisible] = useState(false);

  // Reveal after a short delay so it doesn't flash immediately
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <button
            onClick={onToggle}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full
              bg-near-black/80 backdrop-blur-md border border-gold-400/20
              text-ivory-300/80 hover:text-ivory-100 hover:border-gold-400/50
              transition-all duration-300 group"
          >
            {/* animated note icon */}
            <Music size={13} className="text-gold-300 opacity-70" />

            {/* track label */}
            <span className="font-body text-[0.65rem] tracking-widest uppercase select-none">
              Love Story
            </span>

            {/* waveform bars when playing */}
            <span className="flex items-end gap-[2px] h-4 w-5">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="block w-[3px] rounded-full bg-gold-300"
                  style={{
                    height: isPlaying ? undefined : '4px',
                    animation: isPlaying
                      ? `waveBar${i} 0.8s ease-in-out ${(i - 1) * 0.15}s infinite alternate`
                      : 'none',
                    transition: 'height 0.3s ease',
                  }}
                />
              ))}
            </span>

            {/* play/pause icon */}
            <span className="ml-1 opacity-60 group-hover:opacity-100 transition-opacity">
              {isPlaying ? <Pause size={11} /> : <Play size={11} />}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
