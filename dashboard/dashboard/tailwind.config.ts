import type { Config } from 'tailwindcss';
import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
// eslint-disable-next-line @nx/enforce-module-boundaries
import BaseConfig from '../../shared/ui/tailwind-config/src/index'

export default {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [BaseConfig],
} satisfies Config;
