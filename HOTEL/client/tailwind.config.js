/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E23744', // Zomato Red
        secondary: '#ED5A6B',
        dark: '#1C1C1C',
        light: '#FFFFFF',
        gray: {
          100: '#F4F4F5',
          200: '#E4E4E7',
          800: '#27272A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
