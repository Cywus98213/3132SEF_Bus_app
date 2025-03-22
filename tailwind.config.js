/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        colors: {
          primary: '#f3f3f3',
          secondary: '#151312',
          accent: '#fff4dc',
          highlight: '#2940b1', //selected blue
          not_highlight: '#808080',
          font_primary:'#1F2024',
          font_secondary: '#FFFFFF',
          danger: 'DE3241'
        }

    },
  },
  plugins: [],
}