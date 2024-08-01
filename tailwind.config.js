/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#071952',
        secondary: '#088395',
        accent: '#37B7C3',
        background: '#EBF4F6',
        
      }
      ,
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to top,#46B8EC, #112248)',
      },
    },
  },
  plugins: [],
}