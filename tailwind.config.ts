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
        brand: {
          400: '#F1B089',
          500: '#F2935C', 
          600: '#F37F3E'
        },
        ink: {
          100: '#F2F4F5',
          300: '#CBD5E1',
          500: '#727C84',
          700: '#334155',
          900: '#111827'
        },
        navy: {
          700: '#414E5A',
          800: '#384854', 
          900: '#2E404E'
        },
        ok: { 600: '#22C55E' },
        warn: { 600: '#F59E0B' },
        err: { 600: '#EF4444' },
        surface: {
          0: '#FFFFFF',
          alt: '#FBFBFC'
        }
      },
      borderRadius: {
        lg: '24px',
        md: '16px', 
        sm: '12px'
      },
      boxShadow: {
        sm: '0 2px 6px rgba(15,23,42,.06)',
        md: '0 6px 16px rgba(15,23,42,.08), 0 2px 8px rgba(15,23,42,.05)',
        lg: '0 12px 32px rgba(15,23,42,.10)'
      },
      maxWidth: {
        container: '1280px'
      },
      fontFamily: {
        'inter': ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        'manrope': ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'h1': ['60px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h2': ['40px', { lineHeight: '1.1' }],
        'h3': ['28px', { lineHeight: '1.2' }],
        'eyebrow': ['12px', { lineHeight: '1.2', letterSpacing: '0.08em' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'micro': ['13px', { lineHeight: '1.45' }]
      },
      screens: {
        'sm': '640px',
        'md': '768px', 
        'lg': '1024px',
        'xl': '1280px'
      },
      spacing: {
        'section': '80px',
        'section-lg': '120px'
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(.2,.8,.2,1)'
      },
      transitionDuration: {
        'brand': '300ms'
      },
      animation: {
        'fade-up': 'fadeUp 300ms cubic-bezier(.2,.8,.2,1) forwards',
        'fade-up-delay-1': 'fadeUp 300ms cubic-bezier(.2,.8,.2,1) 60ms forwards',
        'fade-up-delay-2': 'fadeUp 300ms cubic-bezier(.2,.8,.2,1) 120ms forwards',
        'fade-up-delay-3': 'fadeUp 300ms cubic-bezier(.2,.8,.2,1) 180ms forwards',
        'fade-up-delay-4': 'fadeUp 300ms cubic-bezier(.2,.8,.2,1) 240ms forwards',
        'fade-up-delay-5': 'fadeUp 300ms cubic-bezier(.2,.8,.2,1) 300ms forwards'
      },
      keyframes: {
        fadeUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(4px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
};

export default config;
