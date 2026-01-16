//module.exports = {
// content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
// theme: {
//  extend: {},
//},
//plugins: [],
//}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#2b7cee",
        "background-light": "#f6f7f8",
        "background-dark": "#101822",
      },
      fontFamily: {
        "display": ["Lexend", "sans-serif"], // La fuente del diseño
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Necesitas instalar esto: npm i -D @tailwindcss/forms
  ],
}
