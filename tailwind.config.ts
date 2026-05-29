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
        bg: { DEFAULT: 'var(--bg)', white: 'var(--bg-white)', subtle: 'var(--bg-subtle)', muted: 'var(--bg-muted)', deep: 'var(--bg-deep)', elevated: 'var(--bg-elevated)' },
        border: { DEFAULT: 'var(--border)', strong: 'var(--border-strong)', accent: 'var(--border-accent)', soft: 'var(--border-soft)' },
        text: { primary: 'var(--text-primary)', secondary: 'var(--text-secondary)', tertiary: 'var(--text-tertiary)', muted: 'var(--text-muted)', accent: 'var(--text-accent)', inverse: 'var(--text-inverse)' },
        accent: { DEFAULT: 'var(--accent)', hover: 'var(--accent-hover)', deep: 'var(--accent-deep)', light: 'var(--accent-light)', mid: 'var(--accent-mid)', soft: 'var(--accent-soft)' },
        profit: { DEFAULT: 'var(--profit)', bg: 'var(--profit-bg)', 'bg-deep': 'var(--profit-bg-deep)', border: 'var(--profit-border)', text: 'var(--profit-text)' },
        loss: { DEFAULT: 'var(--loss)', bg: 'var(--loss-bg)', 'bg-deep': 'var(--loss-bg-deep)', border: 'var(--loss-border)', text: 'var(--loss-text)' },
        warn: { DEFAULT: 'var(--warn)', bg: 'var(--warn-bg)', 'bg-deep': 'var(--warn-bg-deep)', border: 'var(--warn-border)', text: 'var(--warn-text)' },
        info: { DEFAULT: 'var(--info)', bg: 'var(--info-bg)', border: 'var(--info-border)', text: 'var(--info-text)' },
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
