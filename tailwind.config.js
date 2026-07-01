/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        ink: '#0f172a',
        brand: {
          50: '#eef7ff', 100: '#d9edff', 200: '#bce0ff', 300: '#8ecfff', 400: '#58b2ff',
          500: '#3290ff', 600: '#1d70f2', 700: '#1759df', 800: '#1948b4', 900: '#1a408d'
        }
      },
      boxShadow: {
        glow: '0 24px 70px rgba(50,144,255,.25)',
        soft: '0 24px 80px rgba(15,23,42,.08)'
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at 20% 20%, rgba(59,130,246,.16), transparent 28%), radial-gradient(circle at 80% 0%, rgba(168,85,247,.14), transparent 24%), linear-gradient(135deg, rgba(255,255,255,.92), rgba(239,246,255,.86))'
      }
    }
  },
  plugins: []
};
