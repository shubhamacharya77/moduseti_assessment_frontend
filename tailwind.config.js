/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './upload/**/*.{js,ts,jsx,tsx,mdx}',
    './charts/**/*.{js,ts,jsx,tsx,mdx}',
    './chat/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#090d16',
        surface: '#0f172a',
        card: '#1e293b',
        primary: '#6366f1',
        secondary: '#3b82f6',
        accent: '#8b5cf6',
      },
    },
  },
  plugins: [],
}
