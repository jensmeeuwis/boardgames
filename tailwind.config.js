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
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
};
