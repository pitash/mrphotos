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
        primary: '#0f172a', // Dark blue (Tailwind's blue-950)
        secondary: '#222222',
        accent: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        mukta: ['Mukta', 'sans-serif'],
        josefin: ['Josefin Sans', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        bombes: ['bombes-webfont', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}