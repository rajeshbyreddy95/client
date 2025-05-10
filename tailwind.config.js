/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Match all React components
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        yellow: {
          300: '#FDE68A',
          400: '#FACC15',
        },
        pink: {
          500: '#EC4899',
          600: '#DB2777',
        },
        red: {
          500: '#EF4444',
          600: '#DC2626',
        },
        blue: {
          500: '#3B82F6',
          600: '#2563EB',
        },
        teal: {
          500: '#14B8A6',
        },
        gray: {
          100: '#F3F4F6',
          200: '#E5E7EB',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
};