/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      keyframes: {
        zoomInSpin: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '100%': { transform: 'rotate(360deg) scale(1.5)' },
        },
        zoomOutSpin: {
          '0%': { transform: 'rotate(360deg) scale(1.5)' },
          '100%': { transform: 'rotate(0deg) scale(1)' },},
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          fadeOut: {
            '0%': { opacity: 1 },
            '100%': { opacity: 0 },
        },
      },
      animation: {
        zoomInSpin: 'zoomInSpin 0.5s ease-in-out',
        zoomOutSpin: 'zoomOutSpin 0.5s ease-in-out',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        fadeOut: 'fadeOut 0.5s ease-in forwards',
      },
      whiteSpace: {
        'pre-wrap': 'pre-wrap',
      },
      colors: {
        palette: {
          500:'#EBF4F6',
          600: '#37B7C3',
          700: '#088395', // Example color, adjust based on your design
          800: '#071952'  // Example color, adjust based on your design
        },
        primary: '#071952',
        secondary: '#088395',
        accent: '#00b7eb',
        background: '#EBF4F6',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'light'
    ]
    
  },
}
