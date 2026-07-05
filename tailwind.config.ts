import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './features/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fff2f4',
        linen: '#ffd5db',
        roseSoft: '#fbc4cb',
        roseDeep: '#a95258',
        ink: '#2b2725',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(82, 50, 45, 0.12)',
        brutalInk: '4px 4px 0px 0px #2b2725',
        brutalRose: '4px 4px 0px 0px #a95258',
        brutalInkLg: '8px 8px 0px 0px #2b2725',
        brutalRoseLg: '8px 8px 0px 0px #a95258',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
