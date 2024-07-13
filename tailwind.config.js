const colors = require('tailwindcss/colors')
export default {
  mode: 'jit',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      "xs": "320px",

      'sm': '640px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',

    },
    extend: {

      keyframes: {

        shinePulse: {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
        SlidefromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        SlidefromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        appear: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        diagonalSlide: {
          '0%': { transform: 'translate3d(100%, 100%, 0)', opacity: '0' },
          '10%': { transform: 'translate3d(90%, 90%, 0)', opacity: '0' },
          '20%': { transform: 'translate3d(80%, 80%, 0)', opacity: '0' },
          '30%': { transform: 'translate3d(70%, 70%, 0)', opacity: '0' },
          '100%': { transform: 'translate3d(0, 0, 0)', opacity: '1' },
        },
        spinOpacitychange: {
          '0%': { opacity: '0', transform: 'rotate(0deg)' },
          '100%': { opacity: '1', transform: 'rotate(360deg)' },
        },
      },
      animation: {
        "spinOpacitychange": "spinOpacitychange 1s ease-in-out infinite ",
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
      "MediumBlue": "#E7ECFF",

    },

  },
  plugins: [],
}
