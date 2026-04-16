/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: ['class', '[data-theme="dracula"]'],
  theme: {
    extend: {
      colors: {
        "primary": "#3525cd",
        "primary-container": "#4f46e5",
        "on-primary": "#ffffff",
        "surface": "#f9f9ff",
        "on-surface": "#111c2d",
        "on-surface-variant": "#64748b",
        "surface-container-low": "#f0f3ff",
        "surface-container-lowest": "#ffffff",
        "outline-variant": "rgba(17, 28, 45, 0.15)",
        "tertiary": "#10b981", // Success Light
        "warning": "#f59e0b",
        "error": "#ef4444",
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        voice: ["Epilogue", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        "md": "0.375rem", // Standard per dark mode spec (rounded md)
        "lg": "0.5rem",   // Card roundedness per spec
        "3xl": "1.5rem",
        "4xl": "2.5rem",
      },
      boxShadow: {
        'premium': '0 20px 40px rgba(17, 28, 45, 0.06)',
        'noir': '0 20px 40px rgba(6, 14, 32, 0.6)', // Ambient shadow for dark mode
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        winter: {
          "primary": "#3525cd",
          "secondary": "#64748b",
          "accent": "#4f46e5",
          "neutral": "#111c2d",
          "base-100": "#f9f9ff", // surface
          "base-200": "#f0f3ff", // surface-container-low
          "base-300": "#e7eeff",
          "base-content": "#111c2d",
        },
        dracula: {
          "primary": "#c3c0ff", // Glow
          "secondary": "#64748b",
          "accent": "#4f46e5",
          "neutral": "#dae2fd",
          "base-100": "#0b1326", // surface
          "base-200": "#131b2e", // surface-container-low
          "base-300": "#222a3d", // surface-container-high
          "base-content": "#dae2fd",
          "info": "#4f46e5",    // primary-container
          "success": "#4edea3", // tertiary
          "error": "#ffb4ab",
        }
      }
    ],
  },
}
