/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['AntonSC', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'], 
        lilita: ['LilitaOne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

