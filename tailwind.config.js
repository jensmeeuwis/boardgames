/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        'boardgameList-height': 'calc(100% - 64px)',
      },
    },
  },
  plugins: [],
}