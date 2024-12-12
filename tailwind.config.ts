/* eslint-disable prettier/prettier */
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        silkscreen: 'var(--font-silk-screen)',
        junkyard: 'var(--font-junkyard-calibo)',
      },
      cursor: {
        default: 'url(../../public/assets/images/cursor.svg), default',
        pointer: 'url(../../public/assets/images/cursor-hover.svg), pointer',
      }
    },
  },
  plugins: [],
} satisfies Config;
