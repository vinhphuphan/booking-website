import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        customShadow:
          "0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)",
      },
      keyframes: {
        bigger: {
          "0%": { transform: "scaleX(1) scaleY(1)"},
          "100%": { transform: "scaleX(1.25) scaleY(1.25)" },
        },
        smaller :{
          "0%": { transform: "scaleX(1) scaleY(1)"},
          "100%": { transform: "scaleX(0.3) scaleY(0.5)" },
        }
      },
      animation: {
        bigger: "bigger 0.6s ease-in",
        smaller : "smaller 0.6s ease-in"
      },
      transformOrigin : {
        'center-bottom': 'center bottom',
        'center-top' : 'center top',
      }
    },
  },
  plugins: [],
};
export default config;
