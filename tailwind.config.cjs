/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 2s  1",
        "side-ways-bound": "bounce 1s infinite",
      },
    },
  },
  plugins: [],
};
