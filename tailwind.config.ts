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
        forest: {
          50: '#f2f6f4',
          100: '#e1ebe6',
          200: '#c5d8cf',
          300: '#9ebeb1',
          400: '#719f8e',
          500: '#4e8271',
          600: '#3c6759',
          700: '#315349',
          800: '#27433c',
          900: '#173F35',
          950: '#0c221d',
        },
        ivory: {
          50: '#fdfcf9',
          100: '#F8F4EA',
          200: '#f1ebd7',
          300: '#e7ddbd',
          400: '#dbcba0',
          500: '#cdb784',
        },
        sage: {
          50: '#f6f8f5',
          100: '#ebeee9',
          200: '#d7ded4',
          300: '#bcc9b7',
          400: '#A8B9A3',
          500: '#869a80',
          600: '#697b64',
          700: '#536250',
        },
        terracotta: {
          50: '#fbf5f2',
          100: '#f6eae4',
          200: '#edd8ce',
          300: '#dfbcad',
          400: '#cf9884',
          500: '#C96745',
          600: '#b85434',
          700: '#994228',
          800: '#7e3825',
          900: '#673123',
        },
        coffee: {
          50: '#f8f6f5',
          100: '#efebf6',
          200: '#ded5cd',
          300: '#c5b5a8',
          400: '#a89180',
          500: '#8f7260',
          600: '#775b4c',
          700: '#56382B',
          800: '#452d23',
          900: '#38251e',
        },
        charcoal: {
          50: '#f5f6f5',
          100: '#e5e7e6',
          200: '#ccd1cf',
          300: '#a7b1ad',
          400: '#7b8a85',
          500: '#5b6965',
          600: '#465350',
          700: '#394340',
          800: '#2f3735',
          900: '#202522',
          950: '#111413',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(23, 63, 53, 0.06), 0 2px 6px -1px rgba(23, 63, 53, 0.04)',
        'card': '0 10px 30px -4px rgba(23, 63, 53, 0.08), 0 4px 12px -2px rgba(23, 63, 53, 0.03)',
        'lift': '0 20px 40px -8px rgba(23, 63, 53, 0.12), 0 8px 16px -4px rgba(23, 63, 53, 0.04)',
        'terracotta': '0 10px 25px -3px rgba(201, 103, 69, 0.35)',
      },
    },
  },
  plugins: [],
};
export default config;
