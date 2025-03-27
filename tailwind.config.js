/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      height: {
        "boardgameList-height": "calc(100% - 64px)",
      },
      colors: {
        button: "#2c2f44",
        border: "#505263",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
};
