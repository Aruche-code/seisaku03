import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "dark-deep-blue-a": "#4b5368",
        "dark-deep-blue-b": "#424857",
        "light-white": "rgba(255,255,255,0.17)",
      },
    },
  },
  plugins: [],
};
export default config;
