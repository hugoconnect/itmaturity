/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include .tsx files
  ],
  theme: {
    extend: {
      colors: {
        hugo: {
          primary: '#148699',
          anchor: '#c9a085',
          accent: '#56707c',
          light: '#eff5f7', // Optional: light backgrounds
          dark: '#2b3e4b',  // Optional: deep headers, footers
        },
      },
    },
  },
  plugins: [],
}

