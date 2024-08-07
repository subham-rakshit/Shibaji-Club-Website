import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      Inter: ["Inter", "sans-serif"],
      Rubik: ["Rubik", "sans-serif"],
      boxShadow: {
        "custom-light-dark":
          "-5px -5px 15px rgba(255, 255, 255, 0.1), 5px 5px 15px rgba(0, 0, 0, 0.35)",
        "custom-dark-light": "0 4px 6px rgba(255, 255, 255, 0.1)",
        "custom-inset":
          "inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff",
      },
      animation: {
        "move-x": "move-x 1s ease-in-out infinite",
        lighting: "lighting 1s infinite",
        scroll: "scroll 10s linear infinite",
      },
      keyframes: {
        "move-x": {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(10px)" },
          "100%": { transform: "translateX(0)" },
        },
        lighting: {
          "0%": { opacity: 0, transform: "scaleX(0)" },
          "50%": { opacity: 1, transform: "scaleX(1)" },
          "100%": { opacity: 0, transform: "scaleX(0)" },
        },
        scroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};
