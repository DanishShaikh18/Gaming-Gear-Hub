/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#6d28d9',  // Purple
      secondary: '#06b6d4', // Cyan
      dark: '#0f172a', // Dark gray for readability
      },
    },
  },
  plugins: [],
};
