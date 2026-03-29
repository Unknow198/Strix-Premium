export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: '#f4f8f2',
          100: '#e5efe1',
          200: '#c6dbbd',
          300: '#a5c58d',
          400: '#79a75d',
          500: '#5e8745',
          600: '#4a6c37',
          700: '#3d582f',
          800: '#324828',
          900: '#2a3d23'
        },
        earth: {
          50: '#fcf8f3',
          100: '#f1e4d2',
          200: '#e8ceb0',
          300: '#dab182',
          400: '#c88f55',
          500: '#b77739',
          600: '#9b5d2d',
          700: '#7f4926',
          800: '#683c24',
          900: '#583420'
        }
      },
      boxShadow: {
        soft: '0 22px 60px rgba(48, 74, 39, 0.14)',
        glow: '0 0 0 1px rgba(255,255,255,0.5), 0 30px 60px rgba(74,108,55,0.18)',
        premium: '0 25px 80px rgba(59,88,46,0.22)'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      }
    },
  },
  plugins: [],
}
