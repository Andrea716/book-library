/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // You can change this to 'media' if preferred
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lilac: {
          100: '#E0C2E2', // Very light lilac
          300: '#C68CD8', // Light lilac for the button
          400: '#B472C1', // A darker lilac for hover effect
        },
      },
    },
  },
  plugins: [],
}
