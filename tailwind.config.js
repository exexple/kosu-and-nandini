/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50:  '#fdfbf7',
          100: '#faf5ed',
          200: '#f4ead8',
          300: '#ecdcc0',
          400: '#e0c99a',
          500: '#d4b576',
        },
        burgundy: {
          50:  '#fdf2f4',
          100: '#fae0e5',
          200: '#f5c0cb',
          300: '#ec94a7',
          400: '#de607b',
          500: '#c93459',
          600: '#a82248',
          700: '#8c1a3c',
          800: '#6e1531',
          900: '#4a0e20',
          950: '#2e0814',
        },
        'near-black': '#0d0b09',
        'film-dark': '#1a1410',
        gold: {
          100: '#f5e6c8',
          200: '#e8cc94',
          300: '#d4a85a',
          400: '#b8882e',
          500: '#8a6520',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'grain':       'grain 0.8s steps(1) infinite',
        'pulse-slow':  'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'fade-in':     'fadeIn 1.2s ease forwards',
        'slide-up':    'slideUp 1s ease forwards',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%':      { transform: 'translate(-2%,-3%)' },
          '20%':      { transform: 'translate(3%,2%)' },
          '30%':      { transform: 'translate(-1%,3%)' },
          '40%':      { transform: 'translate(2%,-1%)' },
          '50%':      { transform: 'translate(-3%,1%)' },
          '60%':      { transform: 'translate(1%,-2%)' },
          '70%':      { transform: 'translate(-2%,2%)' },
          '80%':      { transform: 'translate(3%,-3%)' },
          '90%':      { transform: 'translate(-1%,1%)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'vignette': 'radial-gradient(ellipse at center, transparent 50%, rgba(13,11,9,0.7) 100%)',
        'grain-overlay': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
};
