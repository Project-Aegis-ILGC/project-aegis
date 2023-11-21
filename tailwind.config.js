/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./app/index.js", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
      fontSize: {
        sm: '10px',
        md: '15px',
        mdd: '17px',
        lg: '20px',
        xl: '25px'
      },
      extend: {
        colors: {
          'primary': "#FAFAFC",
          'secondary': "#e1e4f7",
          'tertiary': "#F7F4EA",
          'blue-prim': "#55a9ed",
          "gray": "##d1cbcb"
        },
        
      },
    },
    plugins: [],
  }