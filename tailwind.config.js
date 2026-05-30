/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components,libs,pages,hooks}/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          /* Logo palette */
          navy: '#2B2C86',
          pink: '#E6308A',
          'navy-dark': '#222370',
          'navy-deep': '#1A1B5E',
          'pink-light': '#FCE7F3',
          'pink-soft': '#F9A8D4',
          cream: '#F5F4FA',
          /* Legacy aliases — map old token names to logo colors */
          brown: '#2B2C86',
          carton: '#E6308A',
          purple: '#2B2C86',
          coral: '#E6308A',
          gold: '#E6308A',
          tan: '#2B2C86',
          yellow: '#FCE7F3',
          oxblood: '#9A1900',
          rose: '#F9A8D4',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'just-landed-scroll': 'just-landed-scroll 30s linear infinite',
      },
      keyframes: {
        'just-landed-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
