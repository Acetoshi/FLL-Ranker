/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        innovation: {
          100: "hsl(var(--innovation-color-100))",
          300: "hsl(var(--innovation-color-300))",
          500: "hsl(var(--innovation-color-500))",
          700: "hsl(var(--innovation-color-700))",
          900: "hsl(var(--innovation-color-900))",
        },
        corevalues: {
          100: "hsl(var(--core-values-color-100))",
          300: "hsl(var(--core-values-color-300))",
          500: "hsl(var(--core-values-color-500))",
          700: "hsl(var(--core-values-color-700))",
          900: "hsl(var(--core-values-color-900))",
        },
        robotdesign: {
          100: "hsl(var(--robot-design-color-100))",
          300: "hsl(var(--robot-design-color-300))",
          500: "hsl(var(--robot-design-color-500))",
          700: "hsl(var(--robot-design-color-700))",
          900: "hsl(var(--robot-design-color-900))",
        },
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
    },
  },
  plugins: [],
};
