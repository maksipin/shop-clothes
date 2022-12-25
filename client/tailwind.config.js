/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        "slide-card": "bottom, 0.5s",
      },
      spacing: {
        500: "500px",
        600: "600px",
      },
      keyframes: {
        slideCard: {
          "0%": { opacity: "0" },
          "25%": { opacity: "0.9" },
          "50%": { opacity: "1" },
          "75%": { opacity: "0.9" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        // slideText: "slideText 3s ease-in-out infinite",
        slideCard: "slideCard 8s linear infinite",
      },
      transitionDelay: {
        "3s": "3000ms",
        "5s": "5000ms",
        "6s": "6000ms",
        "9s": "9000ms",
      },
    },
    minWidth: {
      "250px": "250px",
    },
    fontFamily: {
      navlink: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
