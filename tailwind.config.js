/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#040814',
        panel: '#0b1530',
        accent: '#2be4ff',
        'accent-soft': '#78f0ff',
      },
      boxShadow: {
        glow: '0 0 30px rgba(43, 228, 255, 0.25)',
      },
    },
  },
  plugins: [],
}
