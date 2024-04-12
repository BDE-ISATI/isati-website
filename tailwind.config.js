/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        container:{
          100: "rgb( var(--color-container-100) / <alpha-value>)",
          200: "rgb( var(--color-container-200) / <alpha-value>)",
          300: "rgb( var(--color-container-300) / <alpha-value>)",
          400: "rgb( var(--color-container-400) / <alpha-value>)",
          500: "rgb( var(--color-container-500) / <alpha-value>)",
          600: "rgb( var(--color-container-600) / <alpha-value>)",
          700: "rgb( var(--color-container-700) / <alpha-value>)",
          800: "rgb( var(--color-container-800) / <alpha-value>)",
          900: "rgb( var(--color-container-900) / <alpha-value>)",
          950: "rgb( var(--color-container-950) / <alpha-value>)",
        },
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
      }
    },
  },
  plugins: [],
}