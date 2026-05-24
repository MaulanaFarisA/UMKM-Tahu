import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', '-apple-system', 'sans-serif'],
      },
      colors: {
        bg: { DEFAULT: '#F5F7FA', white: '#FFFFFF', subtle: '#F0F2F5' },
        border: { DEFAULT: '#E4E7EC', strong: '#D0D5DD' },
        ink: { primary: '#101828', secondary: '#475467', muted: '#98A2B3' },
        accent: { DEFAULT: '#6941C6', hover: '#53389E', light: '#F4EBFF', mid: '#D6BBFB' },
        profit: { DEFAULT: '#027A48', bg: '#ECFDF3', border: '#ABEFC6' },
        loss: { DEFAULT: '#B42318', bg: '#FEF3F2', border: '#FECDCA' },
        warn: { DEFAULT: '#B54708', bg: '#FFFAEB', border: '#FEDF89' },
      },
      borderRadius: { '4xl': '2rem' },
      boxShadow: {
        sm: '0 1px 2px rgba(16,24,40,0.05)',
        md: '0 4px 8px -2px rgba(16,24,40,0.1), 0 2px 4px -2px rgba(16,24,40,0.06)',
        lg: '0 12px 16px -4px rgba(16,24,40,0.08), 0 4px 6px -2px rgba(16,24,40,0.03)',
        fab: '0 8px 24px rgba(105,65,198,0.35)',
      },
    },
  },
  plugins: [],
}

export default config
