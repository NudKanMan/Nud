import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adding custom Tinder colors
        'tinder-pink': '#fe3c72',
        'tinder-grey': '#424242',
        'tinder-white': '#ffffff',
        'tinder-orange': '#fd5564',
      },
    },
  },
  plugins: [],
};

export default config;