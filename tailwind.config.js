/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        '12': '1.2rem',
        '24': '2.4rem',
        '36': '3.6rem'
      },
    },
  },
  plugins: [],
}
