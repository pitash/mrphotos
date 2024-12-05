/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c19b76', // The gold/brown color from your original theme
        secondary: '#222222', // The dark text color
      },
      fontFamily: {
        mukta: ['Mukta', 'sans-serif'],
        josefin: ['Josefin Sans', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}