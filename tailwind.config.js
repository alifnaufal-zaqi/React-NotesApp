/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      title: ["Lilita One"],
      content: ["Nunito"],
      card: ["Lexend"],
    },
  },
  plugins: [require("daisyui")],
};
