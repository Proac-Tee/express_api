/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        ms: "600px",
        sms: "700px",
        md: "768px",
        mlg: "850px",
        lg: "976px",
        xl: "1440px",
      },

      colors: {
        primary: "#0087E6",
        primary_light: "#D2E2FF",
        primary_dark: "#00498E",
        blue_dark: "#081c33",
        grey_primary: "#474648",
        green_light: "#60fbd5",
        green_second_light: "#69d2e7",
        green_dark: "#90EE90",
        purple_light: "#a69aff",
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
