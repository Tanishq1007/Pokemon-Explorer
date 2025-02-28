import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'pokemon-pattern': "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
      },
      backgroundSize: {
        'pokemon-pattern': '20px 20px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(0 0% 98%)',
        foreground: 'hsl(240 10% 3.9%)',
        card: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(240 10% 3.9%)',
        },
        popover: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(240 10% 3.9%)',
        },
        primary: {
          DEFAULT: 'hsl(0 91% 45%)',
          foreground: 'hsl(0 0% 100%)',
        },
        secondary: {
          DEFAULT: 'hsl(225 64% 36%)',
          foreground: 'hsl(0 0% 100%)',
        },
        muted: {
          DEFAULT: 'hsl(0 0% 96.1%)',
          foreground: 'hsl(240 3.8% 46.1%)',
        },
        accent: {
          DEFAULT: 'hsl(48 96% 53%)',
          foreground: 'hsl(240 5.9% 10%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 84.2% 60.2%)',
          foreground: 'hsl(0 0% 98%)',
        },
        border: 'hsl(240 5.9% 90%)',
        input: 'hsl(240 5.9% 90%)',
        ring: 'hsl(0 91% 45%)',
        chart: {
          '1': 'hsl(120 100% 40%)',
          '2': 'hsl(0 91% 45%)',
          '3': 'hsl(225 64% 36%)',
          '4': 'hsl(48 96% 53%)',
          '5': 'hsl(270 59% 53%)',
        },
        'pokemon-types': {
          'grass': '#78C850',
          'poison': '#A040A0',
          'fire': '#F08030',
          'water': '#6890F0',
          'flying': '#A890F0',
          'bug': '#A8B820',
          'normal': '#A8A878',
          'electric': '#F8D030',
          'ground': '#E0C068',
          'fairy': '#EE99AC',
          'fighting': '#C03028',
          'psychic': '#F85888',
          'rock': '#B8A038',
          'steel': '#B8B8D0',
          'ice': '#98D8D8',
          'ghost': '#705898',
          'dragon': '#7038F8',
          'dark': '#705848',
        }
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
