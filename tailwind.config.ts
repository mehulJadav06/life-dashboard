import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#e0e9ff',
          200: '#c2d4ff',
          300: '#93b4fd',
          400: '#6090fa',
          500: '#3b6ef6',
          600: '#2550ea',
          700: '#1d3ecc',
          800: '#1e34a6',
          900: '#1e3183',
          950: '#141f50',
        },
        surface: {
          DEFAULT: '#0f1117',
          card:    '#16192b',
          border:  '#1e2340',
          hover:   '#1c2038',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0f1117 0%, #141f50 100%)',
      },
      animation: {
        'fade-in':   'fadeIn 0.4s ease-out',
        'slide-up':  'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'card': '0 0 0 1px rgba(59,110,246,0.08), 0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 0 0 1px rgba(59,110,246,0.25), 0 8px 32px rgba(59,110,246,0.12)',
        'glow': '0 0 20px rgba(59,110,246,0.35)',
      },
    },
  },
  plugins: [],
}

export default config
