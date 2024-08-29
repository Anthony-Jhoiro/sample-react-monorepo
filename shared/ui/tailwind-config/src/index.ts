import { PresetsConfig } from 'tailwindcss/types/config';
import CatppuccinPlugin from '@catppuccin/tailwindcss';

import * as TailwindAnimatePlugin from 'tailwindcss-animate';

const config: PresetsConfig = {
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'rgb(var(--ctp-pink))',
        input: 'rgb(var(--ctp-overlay0))',
        ring: 'rgb(var(--ctp-blue))',
        background: 'rgb(var(--ctp-base))',
        foreground: 'rgb(var(--ctp-text))',

        primary: {
          DEFAULT: 'rgb(var(--ctp-blue))',
          foreground: 'rgb(var(--ctp-base))',
        },
        secondary: {
          DEFAULT: 'rgb(var(--ctp-flamingo))',
          foreground: 'rgb(var(--ctp-base))',
        },
        destructive: {
          DEFAULT: 'rgb(var(--ctp-red))',
          foreground: 'rgb(var(--ctp-base))',
        },
        muted: {
          DEFAULT: 'rgb(var(--ctp-mantle))',
          foreground: 'rgb(var(--ctp-text))',
        },
        accent: {
          DEFAULT: 'rgb(var(--ctp-yellow))',
          foreground: 'rgb(var(--ctp-base))',
        },
        popover: {
          DEFAULT: 'rgb(var(--ctp-overlay0))',
          foreground: 'rgb(var(--ctp-text))',
        },
        card: {
          DEFAULT: 'rgb(var(--ctp-overlay1))',
          foreground: 'rgb(var(--ctp-text))',
        },
      },
      borderRadius: {
        lg: `0.5rem`,
        md: `calc(0.5rem - 2px)`,
        sm: 'calc(0.5rem - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [TailwindAnimatePlugin, CatppuccinPlugin],
};

export default config;
