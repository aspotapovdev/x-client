/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        cornflower: {
          50: '#f2f9fd',
          100: '#e5f1f9',
          200: '#c5e3f2',
          300: '#8ecae6',
          400: '#58b2d8',
          500: '#3298c5',
          600: '#237ba6',
          700: '#1d6187',
          800: '#1c5370',
          900: '#1c465e',
          950: '#132d3e',
        },
      },
    },
  },
  plugins: [],
};
