/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [],
  theme: {
    colors: {
      mainColor: "#8D7EFD",
      subColor: "#7165CA",
      black: "#1E1E20",
      white: "#F7F7F7",
      gray: "#3D3C41",
      pink: "#F4B5FA",
      mint: "#A6EEF6",
      yellow: "#FFFFB2",
      subGray: "#BDC0C4",
      error: "#FF5F58",
    },
    extend: {
      fontFamily: {
        display: ["Fira Sans Condensed", "sans-serif"],
        // fira: ["Fira Sans Condensed", "sans-serif"],
      },
      fontSize: {
        xl: "32px",
        lg: "24px",
        md: "20px",
        base: "18px",
        sm: "16px",
        xs: "14px",
        caption: "12px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
