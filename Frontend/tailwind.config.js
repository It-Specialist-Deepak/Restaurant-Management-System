/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1.5s ease-out",
        typing: "typing 6s steps(20) infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        typing: {
          "0%": { width: "0" },
          "20%": { width: "100%" },
          "80%": { width: "100%" },
          "100%": { width: "0" }
        }
      }
    }
  },
  plugins: []
};