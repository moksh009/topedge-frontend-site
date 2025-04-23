/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        primary: {
          light: '#4F46E5',
          DEFAULT: '#4F46E5',
          dark: '#6366F1'
        },
        secondary: {
          light: '#6B7280',
          DEFAULT: '#6B7280',
          dark: '#9CA3AF'
        },
        // Theme colors
        theme: {
          'bg': {
            primary: 'rgb(var(--bg-primary) / <alpha-value>)',
            secondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
            accent: 'rgb(var(--bg-accent) / <alpha-value>)',
            surface: 'rgb(var(--bg-surface) / <alpha-value>)',
            overlay: 'rgb(var(--bg-overlay) / <alpha-value>)',
            inverse: 'rgb(var(--bg-inverse) / <alpha-value>)'
          },
          'text': {
            primary: 'rgb(var(--text-primary) / <alpha-value>)',
            secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
            accent: 'rgb(var(--text-accent) / <alpha-value>)',
            inverse: 'rgb(var(--text-inverse) / <alpha-value>)'
          },
          'border': {
            primary: 'rgb(var(--border-primary) / <alpha-value>)',
            secondary: 'rgb(var(--border-secondary) / <alpha-value>)',
            accent: 'rgb(var(--border-accent) / <alpha-value>)'
          },
          'glow': {
            primary: 'rgb(var(--glow-primary) / <alpha-value>)',
            secondary: 'rgb(var(--glow-secondary) / <alpha-value>)',
            accent: 'rgb(var(--glow-accent) / <alpha-value>)'
          }
        }
      },
      cursor: {
        default: 'default',
        pointer: 'pointer',
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-white': 'linear-gradient(to right, rgb(var(--text-primary) / 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--text-primary) / 0.1) 1px, transparent 1px)',
        'radial-gradient': 'radial-gradient(circle at center, var(--glow-primary) 0%, transparent 70%)',
        'conic-gradient': 'conic-gradient(from 180deg at 50% 50%, #3B82F6 0deg, #6366F1 120deg, #8B5CF6 240deg, #3B82F6 360deg)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'grid-flow': 'grid-flow 20s linear infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slow-reverse': 'float 8s ease-in-out infinite reverse',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'gradient-text': 'gradient 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'grid-flow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, 20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: {
        'grid': '80px 80px',
        '300%': '300%',
      },
      backdropBlur: {
        'effect': '12px'
      }
    },
  },
  plugins: [],
}
