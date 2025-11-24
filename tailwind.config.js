/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22c55e',
          light: '#4ade80',
          dark: '#16a34a',
        },
        secondary: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706',
        },
        danger: '#f03b20',
        warning: '#feb24c',
        info: '#51bbd6',
        fire: {
          orange: '#ea580c',
          'orange-light': 'rgba(234, 88, 12, 0.2)',
          'orange-medium': 'rgba(234, 88, 12, 0.5)',
          'orange-dark': 'rgba(234, 88, 12, 0.7)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      screens: {
        'xs': '475px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      fontSize: {
        'xs': ['0.875rem', { lineHeight: '1.5' }],      // 15.75px (antes 12px)
        'sm': ['1rem', { lineHeight: '1.5' }],          // 18px (antes 14px)
        'base': ['1.125rem', { lineHeight: '1.6' }],    // 20.25px (antes 16px)
        'lg': ['1.25rem', { lineHeight: '1.6' }],       // 22.5px (antes 18px)
        'xl': ['1.5rem', { lineHeight: '1.6' }],        // 27px (antes 20px)
        '2xl': ['1.75rem', { lineHeight: '1.5' }],      // 31.5px (antes 24px)
        '3xl': ['2rem', { lineHeight: '1.4' }],         // 36px (antes 30px)
        '4xl': ['2.5rem', { lineHeight: '1.3' }],       // 45px (antes 36px)
        '5xl': ['3rem', { lineHeight: '1.2' }],         // 54px (antes 48px)
        '6xl': ['3.5rem', { lineHeight: '1.1' }],       // 63px (antes 60px)
        '7xl': ['4rem', { lineHeight: '1.1' }],         // 72px (antes 72px)
        '8xl': ['5rem', { lineHeight: '1' }],           // 90px (antes 96px)
        '9xl': ['6rem', { lineHeight: '1' }],           // 108px (antes 128px)
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
