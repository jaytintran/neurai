/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00f3ff',
          pink: '#ff00ff',
          purple: '#b026ff',
        },
        cyber: {
          dark: '#0a0a0f',
          light: '#1a1a2e',
        }
      },
      boxShadow: {
        neon: '0 0 10px rgba(0, 243, 255, 0.5), 0 0 20px rgba(0, 243, 255, 0.3), 0 0 30px rgba(0, 243, 255, 0.1)',
        'neon-pink': '0 0 10px rgba(255, 0, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.3), 0 0 30px rgba(255, 0, 255, 0.1)',
      },
    },
  },
  plugins: [],
}