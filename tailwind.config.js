/** @type {import('tailwindcss').Config} */
import animations from '@midudev/tailwind-animations'

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // Clorofila palette
        wood: {
          50:  "#faf7f2",
          100: "#f5f0e8",
          200: "#ede8dc",
          300: "#e0d5c5",
          400: "#c8a96e",
          500: "#a87d45",
          600: "#8a7055",
          700: "#5c4a30",
          800: "#3d3020",
          900: "#2c2416",
        },
        forest: {
          300: "#8ab87a",
          400: "#6fa05a",
          500: "#5a7a4a",
          600: "#4a6a3a",
          700: "#3a5a2a",
        },
      },

      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },

      keyframes: {
        fadeInImage: {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        fadeIn: {
          "0%":   { opacity: "0", transform: "translateY(-4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        popupFade: {
          "0%":   { opacity: "0", transform: "translateY(20px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        floatSoft: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-6px)" },
        },
        sink: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(4px)" },
        },
      },

      animation: {
        fadeInImage: "fadeInImage 0.5s ease-out forwards",
        fadeIn:      "fadeIn 0.25s ease-in-out",
        popupFade:   "popupFade 0.4s ease-out",
        floatSoft:   "floatSoft 3s ease-in-out infinite",
        sink:        "sink 3s ease-in-out infinite",
      },
    },
  },

  darkMode: "class",

  plugins: [
    animations,
  ],
};
