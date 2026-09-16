/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B2341', // Deep Navy / Government Blue
          teal: '#147A82', // Secondary Teal
          light: '#F8F9FA', // Off-white background
          dark: '#1E293B', // Charcoal text
        },
        status: {
          success: '#10B981', // Green
          warning: '#F59E0B', // Amber
          error: '#EF4444', // Red
          info: '#3B82F6', // Blue
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

