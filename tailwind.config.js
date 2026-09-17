const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        openSans: ['"Open Sans"', ...defaultTheme.fontFamily.serif],
        merriWeather: ['"Merriweather"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        site: {
          darkBlue: '#386982',
          lightBlue: '#59a7cf',
        },
      },
      backgroundImage: {
        'welcome-banner': "url('/images/homepage-banner.webp')",
      },
    },
  },
  plugins: [],
}
