/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // override default
      },
      fontWeight: {
        extrabold: 800,
        black: 900,
      },
    },
  },
  plugins: [],
}
