/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#17B2E5',
          dark: '#0EA5C6'
        }
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(16,24,40,0.06), 0 1px 3px 0 rgba(16,24,40,0.10)'
      },
      borderRadius: {
        xl: '12px'
      }
    },
  },
  plugins: [],
};


