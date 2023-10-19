/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        sm: '14px',
        base: '20px',
        lg: '30px',
        xl: '35px',
        '2xl': '1.063rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  daisyui: {
    themes: [
      {
        orchard: {
          "primary": "#EF4136",
          "secondary": "#AB2160",
          "accent": "#494949",
          "neutral": "#2b3440",
          "base-100": "#FBFBFB",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f74f4f",
        },
      },
    ],
  },
  plugins: [daisyui],
}

