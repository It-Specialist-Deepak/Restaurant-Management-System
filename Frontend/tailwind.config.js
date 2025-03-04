/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'beige': {
          100: '#f5f1e9',
        },
        'brown': {
          500: '#d4a373',
          600: '#b08562',
          700: '#8f6a4f',
        },
      },
      animation: {
        fadeIn: "fadeIn 1.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};