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
        primary: {
          blue: '#003366',      // Dark Blue - Primary brand color
          orange: '#FC8A24',    // Orange - CTAs, highlights, accents
          cream: '#FFFEF3',     // Cream - Backgrounds
          olive: '#6B8E23',     // Olive Green - Secondary accents
        },
        secondary: {
          beige: '#B49885',     // Beige
          lightbeige: '#EBD6C3', // Light Beige
          brown: '#68300B',     // Brown
        },
        // Alias for backward compatibility
        'primary-blue': '#003366',
        'primary-orange': '#FC8A24',
        'primary-offwhite': '#FFFEF3',
        'primary-olive': '#6B8E23',
      },
      fontFamily: {
        heading: ['Bodoni Moda', 'serif'],
        body: ['Figtree', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
