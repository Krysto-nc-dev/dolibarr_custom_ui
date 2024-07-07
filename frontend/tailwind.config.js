module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primaryColor: 'var(--primaryColor)', // #64B5F6 (Lighter Blue)
        secondaryColor: 'var(--secondaryColor)', // #6A1B9A (Deep Purple)
        accentColor: 'var(--accentColor)', // #F06292 (Pink)
        textColor: 'var(--textColor)', // #202124 (Dark Gray)
        backgroundColor: 'var(--backgroundColor)', // #F1F3F4 (Light Gray)
        highlightColor: 'var(--highlightColor)', // #FFA726 (Orange)
        mutedColor: 'var(--mutedColor)', // #9E9E9E (Medium Gray)
        dangerColor: 'var(--dangerColor)', // #D32F2F (Red)
        warningColor: 'var(--warningColor)', // #FF8F00 (Amber)
        successColor: 'var(--successColor)', // #388E3C (Green)
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
