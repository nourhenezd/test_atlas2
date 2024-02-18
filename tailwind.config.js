const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
        icon: ['frc-navicon', 'sans-serif'],
      },
      fontWeight: {
        thin: 100,
        normal: 400,
        bold: 700,
        black: 900,
      },
      backgroundImage: {
        map: " url('/images/mapimage.jpg')",
        mapsmall: " url('/images/mapimage_sm.jpg')",
      },
      dropShadow: {
        ls: '4px 4px 8px black',
      },
      width: {
        nav: '74px',
      },
      height: {
        nav: '17px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
