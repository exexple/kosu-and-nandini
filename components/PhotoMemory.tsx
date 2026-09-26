'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Photo } from '@/data/story';
import { useInView } from '@/hooks/useInView';

interface PhotoMemoryProps {
  photo: Photo;
  index: number;     // 0-based: which photo is this in the photos array
  variant: 'framed' | 'editorial' | 'immersive' | 'hero' | 'anchor';
}

// ─── Variant: "framed" — printed photo treatment ─────────────
function FramedPhoto({ photo, isInView, shouldReduce }: {
  photo: Photo; isInView: boolean; shouldReduce: boolean | null;
}) {
  return (
    <div className="flex flex-col items-center gap-8 px-6 py-20 max-w-xl mx-auto">
      <motion.p
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={isInView ? { opacity: 1 } : (shouldReduce ? {} : { opacity: 0 })}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="chapter-label"
      >
        — A memory —
      </motion.p>

      {/* Printed photo frame */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 24, rotate: -0.8 }}
        animate={isInView ? { opacity: 1, y: 0, rotate: -0.8 } : (shouldReduce ? {} : { opacity: 0, y: 24, rotate: -0.8 })}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full bg-ivory-50 p-3 pb-12 shadow-2xl"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)' }}
      >
        <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 480px"
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="img-fallback absolute inset-0 -z-10" aria-hidden />
        </div>
        {/* Handwritten-style caption on the photo border */}
        <p className="absolute bottom-3 left-0 right-0 text-center font-display
          text-xs italic text-near-black/50 tracking-wide">
          {photo.caption}
        </p>
      </motion.div>
    </div>
  );
}

// ─── Variant: "editorial" — asymmetric layout ────────────────
function EditorialPhoto({ photo, isInView, shouldReduce }: {
  photo: Photo; isInView: boolean; shouldReduce: boolean | null;
}) {
  return (
    <div className="relative px-6 py-20 flex flex-col md:flex-row items-center gap-8
      max-w-4xl mx-auto">

      {/* Offset image */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, x: -32 }}
        animate={isInView ? { opacity: 1, x: 0 } : (shouldReduce ? {} : { opacity: 0, x: -32 })}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full md:w-3/5 vignette overflow-hidden rounded-sm"
        style={{ aspectRatio: '3/4' }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          loading="lazy"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="img-fallback absolute inset-0 -z-10" aria-hidden />
      </motion.div>

      {/* Side text */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, x: 24 }}
        animate={isInView ? { opacity: 1, x: 0 } : (shouldReduce ? {} : { opacity: 0, x: 24 })}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col gap-4 md:w-2/5 text-left"
      >
        <span className="chapter-label">— A moment —</span>
        <p className="font-display text-2xl sm:text-3xl italic text-ivory-200 leading-snug">
          {photo.caption}
        </p>
        <span className="gold-divider !mx-0 w-10" aria-hidden />
      </motion.div>
    </div>
  );
}

// ─── Variant: "immersive" — full-width cinematic strip ───────
function ImmersivePhoto({ photo, isInView, shouldReduce, sectionRef }: {
  photo: Photo; isInView: boolean; shouldReduce: boolean | null;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], shouldReduce ? [1, 1, 1] : [1.06, 1.02, 1.06]);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'min(90vw, 75vh)' }}>
      <motion.div
        style={{ scale }}
        className="absolute inset-0 will-change-transform vignette"
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
        <div className="img-fallback absolute inset-0 -z-10" aria-hidden />
      </motion.div>

      {/* Caption centered */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={isInView ? { opacity: 1 } : (shouldReduce ? {} : { opacity: 0 })}
        transition={{ duration: 1.6, delay: 0.4 }}
        className="absolute inset-0 z-10 flex items-end justify-center pb-10 px-6"
      >
        <p className="font-display text-xl sm:text-2xl italic text-ivory-100/90
          text-center drop-shadow-lg max-w-sm">
          {photo.caption}
        </p>
      </motion.div>
    </div>
  );
}

// ─── Variant: "hero" — slower emotional hero ─────────────────
function HeroPhoto({ photo, isInView, shouldReduce }: {
  photo: Photo; isInView: boolean; shouldReduce: boolean | null;
}) {
  return (
    <div className="flex flex-col items-center py-20 px-6 gap-8 max-w-2xl mx-auto">
      <motion.p
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={isInView ? { opacity: 1 } : (shouldReduce ? {} : { opacity: 0 })}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="chapter-label"
      >
        — Still —
      </motion.p>

      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, scale: 0.97 }}
        animate={isInView ? { opacity: 1, scale: 1 } : (shouldReduce ? {} : { opacity: 0, scale: 0.97 })}
        transition={{ duration: 1.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full vignette overflow-hidden rounded-sm"
        style={{ aspectRatio: '4/5' }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 672px"
          loading="lazy"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="img-fallback absolute inset-0 -z-10" aria-hidden />
      </motion.div>

      <motion.p
        initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : (shouldReduce ? {} : { opacity: 0, y: 12 })}
        transition={{ duration: 1.4, delay: 0.8 }}
        className="font-display text-lg sm:text-xl italic text-ivory-300/60 text-center"
      >
        {photo.caption}
      </motion.p>
    </div>
  );
}

// ─── Variant: "anchor" — final visual anchor ─────────────────
function AnchorPhoto({ photo, isInView, shouldReduce }: {
  photo: Photo; isInView: boolean; shouldReduce: boolean | null;
}) {
  return (
    <div className="flex flex-col items-center py-20 px-6 gap-6 max-w-xl mx-auto">
      <motion.p
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={isInView ? { opacity: 1 } : (shouldReduce ? {} : { opacity: 0 })}
        transition={{ duration: 1.2 }}
        className="chapter-label"
      >
        — One year later —
      </motion.p>

      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : (shouldReduce ? {} : { opacity: 0, y: 32 })}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full vignette overflow-hidden rounded-sm"
        style={{ aspectRatio: '3/4' }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 560px"
          loading="lazy"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="img-fallback absolute inset-0 -z-10" aria-hidden />
      </motion.div>

      <motion.p
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={isInView ? { opacity: 1 } : (shouldReduce ? {} : { opacity: 0 })}
        transition={{ duration: 1.4, delay: 0.6 }}
        className="font-display text-lg sm:text-xl italic text-ivory-300/60 text-center"
      >
        {photo.caption}
      </motion.p>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────
export default function PhotoMemory({ photo, index, variant }: PhotoMemoryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  const shouldReduce = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id={`photo-${index + 1}`}
      aria-label={`Photo memory ${index + 1}`}
    >
      {variant === 'framed' && (
        <FramedPhoto photo={photo} isInView={isInView} shouldReduce={shouldReduce} />
      )}
      {variant === 'editorial' && (
        <EditorialPhoto photo={photo} isInView={isInView} shouldReduce={shouldReduce} />
      )}
      {variant === 'immersive' && (
        <ImmersivePhoto photo={photo} isInView={isInView} shouldReduce={shouldReduce} sectionRef={sectionRef} />
      )}
      {variant === 'hero' && (
        <HeroPhoto photo={photo} isInView={isInView} shouldReduce={shouldReduce} />
      )}
      {variant === 'anchor' && (
        <AnchorPhoto photo={photo} isInView={isInView} shouldReduce={shouldReduce} />
      )}
    </section>
  );
}
