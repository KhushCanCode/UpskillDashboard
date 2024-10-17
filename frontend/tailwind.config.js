/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        lightgreen: {
          DEFAULT: '#252724', // Dark greenish-gray
        },
        darkgreen: {
          DEFAULT: '#1b1d1a', // Very dark greenish-gray
        },
        stone: {
          DEFAULT: '#2f312e', // Dark grayish-green
        },
        txtcolor: {
          DEFAULT: '#ababab', // Light gray
        },
      },
    },
  },
  plugins: [],
}