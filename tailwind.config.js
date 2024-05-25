
const colors = require('tailwindcss/colors')
export default  {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
      plusjakartasans: ['"Plus Jakarta Sans"', 'sans-serif'],
 
    },
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
            "MediumBlue":"#E7ECFF"
    },
  },
  plugins: [],
}