/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          'deep-space-blue': '#0A192F',
          'cyber-teal': '#64FFDA',
          'nebula-aqua': '#7DF9FF',
          'starlight-blue': '#A8B2D1',
          'comet-grey': '#1E2A3A',
          'shadow-slate': '#071323',
        },
        fontFamily: {
          chypre: ['Chypre', 'Inter', 'sans-serif'], 
          inter: ['Inter', 'sans-serif'],
        },
        fontSize: { 
          'h1-main': ['clamp(2.25rem, 4.5vw, 2.75rem)', { lineHeight: '1.2', fontWeight: '700' }], // Adjusted from style guide
          'h2-main': ['clamp(1.75rem, 3.5vw, 2rem)', { lineHeight: '1.3', fontWeight: '700' }], // Adjusted
          'h3-main': ['clamp(1.3rem, 2.8vw, 1.6rem)', { lineHeight: '1.4', fontWeight: '500' }], // Adjusted
          'h4-main': ['1.15rem', { lineHeight: '1.4', fontWeight: '500' }], // Adjusted
          'body-main': ['1rem', { lineHeight: '1.65', fontWeight: '400' }],
          'small-main': ['0.875rem', { lineHeight: '1.4', fontWeight: '400' }],
        }
      },
    },
    plugins: [],
  };
  