/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        "primary-red": "hsl(0, 100%, 74%) ",
        "primary-green": "hsl(154, 59%, 51%)",
        accent: "hsl(248, 32%, 49%)",
        base: {
          100: "hsl(249, 10%, 26%) ",
          200: "hsl(246, 25%, 77%)",
        },
      },
      fontFamily: {
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
