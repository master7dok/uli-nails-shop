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
        nude: {
          50: "#FAF8F5", // Canvas light background
          100: "#F5EFEB", // Section & card background
          200: "#EFE7DE", // Soft borders & dividers
          300: "#DED3C4", // Border accents
          400: "#C3B5A4",
          500: "#A69280", // Muted text & secondary icons
          600: "#867362",
          700: "#6A594B",
          800: "#57473A",
          900: "#4D3E32", // Noble deep brown text/buttons
        },
        gold: {
          light: "#DFCAAA",
          DEFAULT: "#C5A880", // Accents, badges, ratings
          dark: "#A8885E",    // Hover states, active borders
        },
        blush: {
          light: "#FDF7F7", // "New" badges, active tabs
          DEFAULT: "#F3D7D5", // Soft powder-pink accents, sales
          dark: "#DDAAA8",
        },
        charcoal: {
          DEFAULT: "#1A1817", // Crisp primary text
          soft: "#333333",
          muted: "#666666",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "serif"],
        sans: ["var(--font-montserrat)", "Montserrat", "Inter", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        luxury: "0 8px 30px -4px rgba(77, 62, 50, 0.07)",
        "luxury-lg": "0 20px 40px -8px rgba(77, 62, 50, 0.12)",
        "gold-glow": "0 0 20px -3px rgba(197, 168, 128, 0.35)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        pulse_subtle: "pulseSubtle 2s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
