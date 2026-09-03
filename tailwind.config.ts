import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './features/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FDFBF7',
        'ink-soft': '#3E3A39',
        'sunset-peach': '#FFDAB9',
        'twilight-indigo': '#2C3E50',
        'accent-rose': '#E0BFB8',
        'gold-foil': '#D4AF37',

        // Backward compatibility mapping for existing components
        cream: '#FDFBF7',
        linen: '#FFDAB9',
        roseSoft: '#E0BFB8',
        roseDeep: '#a95258',
        ink: '#3E3A39',
      },
      boxShadow: {
        lift: '0 10px 30px -10px rgba(0,0,0,0.15)',
        tape: '0 2px 4px rgba(0,0,0,0.1)',
        soft: '0 24px 80px rgba(82, 50, 45, 0.12)',
        brutalInkLg: '0 10px 30px -10px rgba(0,0,0,0.12)',
        brutalRose: '0 10px 25px -5px rgba(224, 191, 184, 0.4)',
        brutalRoseLg: '0 20px 35px -10px rgba(224, 191, 184, 0.5)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        handwriting: ['var(--font-handwriting)', 'Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config;
