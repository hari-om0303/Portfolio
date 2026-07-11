/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#030712', // Zinc 950/Black blend
          card: '#0B0F19', // Deep dark blue-gray
          border: '#1F2937', // Gray 800
        },
        accent: {
          primary: '#06B6D4', // Vibrant Cyan (Arista/Cisco blue vibe)
          secondary: '#8B5CF6', // Purple/Violet
          emerald: '#10B981', // Emerald
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
