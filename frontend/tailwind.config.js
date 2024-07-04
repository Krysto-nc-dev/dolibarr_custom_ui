// module.exports = {
//   purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {
//       colors: {
//         softBlue: 'hsl(231, 69%, 60%)',
//         softRed: 'hsl(0, 94%, 66%)',
//         grayishBlue: 'hsl(229, 8%, 60%)',
//         veryDarkBlue: 'hsl(229, 31%, 21%)',
//       },
//       fontFamily: {
//         sans: ['Rubik', 'sans-serif'],
//       },
//     },
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        softBlue: 'var(--softBlue)',
        softRed: 'var(--softRed)',
        grayishBlue: 'var(--grayishBlue)',
        veryDarkBlue: 'var(--veryDarkBlue)',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
