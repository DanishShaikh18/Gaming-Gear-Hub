/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff", // White background
        secondary: "#f8f9fa", // Light gray
        accent: "#e63946", // Red for highlights
        text: "#333333", // Dark gray for readability
      },
    },
  },
  plugins: [],
};
