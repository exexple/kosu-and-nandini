// ============================================================
//  data/story.ts
//  Edit THIS file to personalise the entire website.
//  ============================================================

export interface Photo {
  src: string;
  alt: string;
  caption: string;
}

export interface Video {
  src: string;
  poster?: string;
  caption: string;
  subcaption?: string;
}

export interface TimelineItem {
  chapter: string;
  title: string;
  description: string;
}

export interface StoryData {
  couple: {
    name1: string;
    name2: string;
    anniversaryDate: string;   // e.g. "September 26, 2025"
    anniversaryPeriod: string; // e.g. "September 2025 – September 2026"
  };
  intro: {
    eyebrow: string;
    headline: string;
    subline: string;
    cta: string;
  };
  beginning: {
    prelude: string;
    names: string;
    date: string;
    copy: string;
  };
  photos: Photo[];
  videos: Video[];
  timeline: {
    heading: string;
    subheading: string;
    items: TimelineItem[];
  };
  letter: {
    salutation: string;
    body: string;
    sign: string;
  };
  finale: {
    lines: string[];
    title: string;
    names: string;
    closing: string;
  };
  creator: string;
}

export const story: StoryData = {
  // ─── The couple ────────────────────────────────────────────
  couple: {
    name1: '[NAME 1]',
    name2: '[NAME 2]',
    anniversaryDate: '[ANNIVERSARY DATE]',         // e.g. "September 26, 2025"
    anniversaryPeriod: '[ANNIVERSARY PERIOD]',     // e.g. "September 2025 – September 2026"
  },

  // ─── Intro / opening screen ────────────────────────────────
  intro: {
    eyebrow: 'Some stories are meant to be remembered.',
    headline: 'One year of theirs.',
    subline: 'A love story, told in moments.',
    cta: 'Begin their story',
  },

  // ─── Scene 1 — The beginning ───────────────────────────────
  beginning: {
    prelude: 'One year ago…',
    names: 'kosu & butki',
    date: 'september 20',
    copy: 'The beginning of something neither of them knew would become this beautiful.',
  },

  // ─── Photos (6 total) ──────────────────────────────────────
  photos: [
    {
      src: '/images/photo-01.webp',
      alt: 'The first photograph — the beginning.',
      caption: 'Where it all began.',
    },
    {
      src: '/images/photo-02.webp',
      alt: 'A quiet moment together.',
      caption: 'Some moments need no explanation.',
    },
    {
      src: '/images/photo-03.webp',
      alt: 'An ordinary day made extraordinary.',
      caption: 'The ones you almost forget to photograph.',
    },
    {
      src: '/images/photo-04.webp',
      alt: 'A full frame of a shared moment.',
      caption: 'Here. Present. Together.',
    },
    {
      src: '/images/photo-05.webp',
      alt: 'A softer, slower moment.',
      caption: 'The kind of stillness that stays.',
    },
    {
      src: '/images/photo-06.webp',
      alt: 'The final photograph — one year later.',
      caption: 'One year, and everything it holds.',
    },
  ],

  // ─── Videos (4 total, all muted) ───────────────────────────
  videos: [
    {
      src: '/videos/memory-01.mp4',
      poster: '/images/photo-01.webp',
      caption: 'A moment worth keeping.',
      subcaption: 'Some things are better in motion.',
    },
    {
      src: '/videos/memory-02.mp4',
      poster: '/images/photo-02.webp',
      caption: 'The kind of memory that needs no explanation.',
      subcaption: 'Just them, being them.',
    },
    {
      src: '/videos/memory-03.mp4',
      poster: '/images/photo-03.webp',
      caption: 'Caught between laughter and something warmer.',
      subcaption: 'The real ones.',
    },
    {
      src: '/videos/memory-04.mp4',
      poster: '/images/photo-05.webp',
      caption: 'And somehow, one year later…',
      subcaption: 'Still here. Still them.',
    },
  ],

  // ─── Timeline ──────────────────────────────────────────────
  timeline: {
    heading: 'A year in little things.',
    subheading: 'The chapters that built something real.',
    items: [
      {
        chapter: '01',
        title: 'The beginning',
        description:
          "A first hello that turned into hours. The kind of conversation you don't want to end.",
      },
      {
        chapter: '02',
        title: 'The inside jokes',
        description:
          'The ones only they understand. The language built out of shared seconds and accidental laughter.',
      },
      {
        chapter: '03',
        title: 'The ordinary moments',
        description:
          'Long drives. Grocery runs. Staying in. The quiet that felt like home.',
      },
      {
        chapter: '04',
        title: 'The memories',
        description:
          'The trips, the plans, the photos that captured something impossible to explain.',
      },
      {
        chapter: '05',
        title: 'One year later',
        description:
          'Still choosing each other. Still finding new reasons. Still building the story.',
      },
    ],
  },

  // ─── Letter ────────────────────────────────────────────────
  letter: {
    salutation: 'To two of my favourite people,',
    body: `sooo hiii, your lovely steve here. i genuinely don\'t know what to say at this point but i\'m
    
    soooo happy for you guys. kudos to both of you, to two of my fav people. thanks you guys for adopting me
    
    hehehe, forever glad that i was able to witness you guys completing a year, ofcs we\'ve got a lot more to 
    
    come and i will alway hope for the best cause i gotta be the cool uncle for your kids hehehe, bet i\'ll be 
    
    coolest they\'ll ever meet and the we\'ll sit together and recall all the moments we spent together with
    
    you guys being the love birds and me being the 3rd wheel aka your adopted child hehe. i\'ll forever pray
    
    for you guys. once again, happy anniversary✨🎀`,
    sign: '— Manas',
  },

  // ─── Finale ────────────────────────────────────────────────
  finale: {
    lines: ['365 days.', 'Countless memories.', 'One beautiful story.'],
    title: 'Happy 1st Anniversary',
    names: 'prachurjya & nandini',
    closing:
      'Here\'s to everything that came before,\nand everything still waiting to be written.',
  },

  // ─── Creator credit ────────────────────────────────────────
  creator: 'manas',
};
