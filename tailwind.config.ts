import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        // --space-block (72px) — não existe por padrão na escala Tailwind
        // (o degrau 16 salta para 20). Habilita mt-18, gap-18, py-18 etc.
        18: '72px',
      },
      colors: {
        ink: '#1A1714',
        slate: '#1E1B16',
        cream: '#F5F0E8',
        amber: '#C8A96E',
        muted: '#9A9384',
        gabriel: {
          dark: '#2E2E2E',
          offwhite: '#F8F8F5',
          moss: '#4F6B58',
          mossDark: '#3A5142',
          sage: '#8FAF9A',
          sand: '#E5DDD2',
          beige: '#EFEAE3',
        },
      },
      fontFamily: {
        sans: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Escala par reutilizável nas páginas de case (Sona, Gabriel, ...)
        'case-xs': '12px',
        'case-sm': '14px',
        'case-base': '16px',
        'case-lg': '20px',
        'case-xl': '24px',
        'case-2xl': '32px',
        'case-3xl': '40px',
        'case-4xl': '48px',
        'case-5xl': '56px',
        'case-6xl': '64px',
        'case-7xl': '80px',
        'case-8xl': '96px',
      },
      borderRadius: {
        card:  '20px',    // cards grandes
        badge: '12px',    // imagens, frames, badges médios
        chip:  '9999px',  // pílula — tags, chips
      },
      letterSpacing: {
        tight: '-0.02em',
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
