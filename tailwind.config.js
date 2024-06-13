
const colors = require('tailwindcss/colors')
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      
      padding: {
        '2pct':'2%',
        '5pct':'5%',
        '15pct':'15%',
        '20pct': '20%',
        '30pct': '30%',
        '40pct': '40%',
        // Add more percentage values as needed
      },
      margin: {
        '2mct':'2%',
        '5mct':'5%',
        '20mct': '20%',
        '30mct': '30%',
        '40mct': '40%',
        // Add more percentage values as needed
      },
      width: {
        '45percent': '45%',
        '55percent':'55%',
        '30percent': '30%',
        '90percent':'90%',
        '70percent':'70%',
      },
      height:{
        '90percent':'90%',
      },
      keyframes: {

        SlidefromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        SlidefromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        appear: {
          '0%': {  opacity: '0' },
          '100%': { opacity: '1' },
        },
        diagonalSlide: {
          '0%': { transform: 'translateX(100%)',transform: 'translateY(100%)', opacity: '0' },
          '10%': { transform: 'translateX(90%)',transform: 'translateY(90%)', opacity: '0' },
          '20%': { transform: 'translateX(80%)',transform: 'translateY(80%)', opacity: '0' },
          '30%': { transform: 'translateX(70%)',transform: 'translateY(70%)', opacity: '0' },
          '100%': {transform: 'translateX(0)',transform: 'translateY(0)', opacity: '1' },
        }

      },
      animation: {
        "SlidefromLeft": 'SlidefromLeft 1s ease-in-out',
        "SlidefromRight": 'SlidefromRight 1s ease-in-out',
        "HeaderfromRight": 'SlidefromRight 5s ease-in-out',
        "appear": 'appear 1s linear',
        "diagonalSlide": 'diagonalSlide 1s ease-in-out',
      },




    },
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
      plusjakartasans: ['"Plus Jakarta Sans"', 'sans-serif'],

    },
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
      "MediumBlue": "#E7ECFF"
    },
  },
  plugins: [],
}