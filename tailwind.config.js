/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        didot: ['"GFS Didot"', 'serif'], 
      },
      fontWeight: {
        extrabold: 800,
        black: 900,
      },
    },
  },
  plugins: [],
}
