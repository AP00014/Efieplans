/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
      extend: {
        colors: {
          primary: '#2563eb', // Blue-600
          darkbg: '#111827', // Gray-900
        }
      },
    },
    plugins: [],
  }