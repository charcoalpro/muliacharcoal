import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0f3d2e',
          'primary-hover': '#0a2a1f',
          accent: '#c9a24b',
          dark: '#0a1f17',
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
};
