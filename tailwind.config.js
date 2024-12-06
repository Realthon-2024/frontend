/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FCCE56',
        textBox: '#FCFCFA',
        login: '#FCBA56'

      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),

  ],
}