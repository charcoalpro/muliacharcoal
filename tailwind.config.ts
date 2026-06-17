import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import { company } from './src/config/company';

// Brand utility colors derive from the single source of truth in
// `/src/config/company.ts`. Edit the hex values there, never here.
const brand = company.brandAssets.colors;

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: brand.primary,
          'primary-hover': brand.primaryHover,
          accent: brand.accent,
          // Darker gold for accent-colored TEXT on light backgrounds: the
          // placeholder `accent` (#c9a24b) is ~2:1 on white and fails WCAG AA.
          // `accent-strong` (#8a6d1f, ~4.9:1) keeps the gold identity at AA.
          'accent-strong': brand.accentStrong,
          dark: brand.dark,
        },
        neutral: colors.slate,
        success: '#16a34a',
        error: '#dc2626',
        warning: '#ea580c',
        info: '#2563eb',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
} satisfies Config;
