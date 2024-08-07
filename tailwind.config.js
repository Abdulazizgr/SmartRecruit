/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
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
