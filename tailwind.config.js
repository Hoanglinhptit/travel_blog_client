/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "3xl": "1920px",
        "2xl": "1535px",
        xl: "1280px",
        lg: "1024px",
        sm: "639px",
        md: "767px",
      },
      maxWidth: "100%",
    },
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
    },
    screens: {
      "3xl": { max: "1920px" },
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1280px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "836px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      exsm: { max: "380px" },
    },
  },
  plugins: [],
};
