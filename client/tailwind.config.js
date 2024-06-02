const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      Inter: ["Inter", "sans-serif"],
      Rubik: ["Rubik", "sans-serif"],
    },
  },
  plugins: [flowbite.plugin()],
};
