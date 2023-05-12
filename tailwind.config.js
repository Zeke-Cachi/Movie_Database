/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./index.html"
  ],
  theme: {
    colors: {
      'movieBlue': '#1A2E3D',
      'movieBlueHover': '#213a4d',
      'background': '#c7c6c6',
      'shadow': '#acabab',
      'cardbg': '#c7c6c6',
      'yellow-rating' : '#F9f15b', 
      'green-rating' : '#71f95b',
      'red-rating' : '	#FF0000'
    },
    extend: {
      boxShadow: {
        'solidShadow': '10000px 10000px 10000px rgba(0, 0, 0, 1s)',
    },},
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
],
}

