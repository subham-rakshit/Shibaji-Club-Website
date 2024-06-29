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
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};
