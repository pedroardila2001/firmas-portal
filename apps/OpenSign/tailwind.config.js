/** @type {import('tailwindcss').Config} */

// ── Tema ALI ────────────────────────────────────────────────────────────────
// Los dos temas daisyUI conservan sus NOMBRES originales (`opensigncss` /
// `opensigndark`) porque el nombre viaja en `data-theme` y lo leen
// ThemeToggle.jsx, Header.jsx, const.js y varias reglas de index.css: cambiarlo
// obliga a tocar media docena de archivos sin ganar nada visible. Lo que sí
// cambia son TODOS los valores, tomados de la fuente única de verdad visual de
// ALI (packages/ali-ui/src/styles/tokens.css del repo ALI-v3):
//
//   claro   --ali-bg #ffffff · --ali-surface-2 #f5f5f5 · --ali-text #0a0a0a
//           --ali-accent #171717 · --ali-on-accent #fafafa · --ali-link #1d4ed8
//   oscuro  --ali-bg #0a0a0a · --ali-surface #171717 · --ali-text #fafafa
//           --ali-accent #ffffff · --ali-on-accent #0a0a0a · --ali-link #7da8ff
//
// OJO con el reparto de superficies: el envoltorio de App.jsx es `bg-base-200`
// (la página) y las tarjetas son `bg-base-100`. En ALI la tarjeta va POR ENCIMA
// del fondo en ambos temas, así que base-100 es siempre la superficie elevada.
//
// El acento real de ALI NO es un color: es el casi-negro #171717 (blanco en
// oscuro). El azul #1d4ed8 es el color de las citas legales y aquí queda
// reservado a enlaces e `info` — por eso `primary` es neutro y `accent` azul,
// al revés de lo que sugeriría el azul turquesa #47a3ad que traía OpenSign.
const ali = {
  light: {
    bg: "#fafafa",
    surface: "#ffffff",
    surface2: "#f5f5f5",
    surface3: "#eeeeee",
    border: "#e5e5e5",
    text: "#0a0a0a",
    textMuted: "#525252",
    accent: "#171717",
    onAccent: "#fafafa",
    link: "#1d4ed8"
  },
  dark: {
    bg: "#0a0a0a",
    surface: "#171717",
    surface2: "#262626",
    surface3: "#404040",
    border: "#262626",
    text: "#fafafa",
    textMuted: "#a3a3a3",
    accent: "#fafafa",
    onAccent: "#0a0a0a",
    link: "#7da8ff"
  }
};

// Radios y curva: ALI usa --radius 0.5rem en todo el producto. daisyUI venía
// con --rounded-btn 1.9rem (botón pastilla), que es la firma visual de
// OpenSign; cambiarlo aquí re-dibuja todos los botones de una vez.
const aliRadii = {
  "--rounded-btn": "0.5rem",
  "--rounded-box": "0.75rem",
  "--rounded-badge": "0.375rem",
  "--tab-border": "2px",
  "--tab-radius": "0.5rem",
  "--animation-btn": "0.15s",
  "--btn-focus-scale": "1"
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Misma pila que packages/ali-ui/tailwind-preset.cjs. Bodoni Moda queda
        // reservada a titulares (font-serif); el cuerpo es Inter.
        serif: ['"Bodoni Moda"', "Didot", "Bodoni", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"]
      }
    }
  },
  plugins: [
    require("daisyui"),
    function ({ addUtilities, addVariant }) {
      // ✅ Variants that match html[data-theme="..."] (or any ancestor with data-theme)
      addVariant("opensigncss", '[data-theme="opensigncss"] &');
      addVariant("opensigndark", '[data-theme="opensigndark"] &');

      addUtilities({
        // Prevent iOS long-press popup
        ".touch-callout-none": {
          "-webkit-touch-callout": "none"
        },
        // Botón deshabilitado (utilidad heredada de OpenSign, hoy sin call
        // sites; se re-tiñe a los neutros de ALI por si vuelve a usarse).
        ".op-btn-vscode-disabled": {
          "background-color": `${ali.light.surface3} !important`,
          color: `${ali.light.textMuted} !important`,
          "border-color": `${ali.light.border} !important`,
          cursor: "not-allowed !important",
          opacity: "1 !important",
          "&:hover": {
            "background-color": `${ali.light.surface3} !important`,
            color: `${ali.light.textMuted} !important`,
            "border-color": `${ali.light.border} !important`,
            transform: "none !important"
          }
        },
        '[data-theme="opensigndark"] .op-btn-vscode-disabled': {
          "background-color": `${ali.dark.surface2} !important`,
          color: `${ali.dark.textMuted} !important`,
          "border-color": `${ali.dark.border} !important`
        },
        // Dark mode icon improvements using DaisyUI theme detection
        '[data-theme="opensigndark"] .icon-improved': {
          color: `${ali.dark.textMuted} !important`
        },
        '[data-theme="opensigndark"] .icon-muted': {
          color: "#737373 !important"
        },
        '[data-theme="opensigndark"] .icon-disabled': {
          color: "#525252 !important"
        },
        // Gray text improvements for dark mode
        '[data-theme="opensigndark"] .text-gray-500': {
          color: `${ali.dark.textMuted} !important`
        },
        '[data-theme="opensigndark"] .text-gray-400': {
          color: "#737373 !important"
        },
        '[data-theme="opensigndark"] .text-gray-600': {
          color: `${ali.dark.textMuted} !important`
        },
        // CSS variable utilities that work with arbitrary values
        ".icon-themed": {
          color: "var(--icon-color)"
        },
        ".icon-themed-muted": {
          color: "var(--icon-color-muted)"
        },
        ".icon-themed-disabled": {
          color: "var(--icon-color-disabled)"
        },
        ".btn-themed-disabled": {
          "background-color": "var(--btn-disabled-bg)",
          color: "var(--btn-disabled-color)",
          "border-color": "var(--btn-disabled-border)",
          cursor: "not-allowed",
          "&:hover": {
            "background-color": "var(--btn-disabled-bg)",
            color: "var(--btn-disabled-color)",
            "border-color": "var(--btn-disabled-border)",
            transform: "none"
          }
        }
      });
    }
  ],
  daisyui: {
    // themes: true,
    themes: [
      {
        opensigndark: {
          primary: ali.dark.accent, // acento ALI en oscuro: blanco
          "primary-content": ali.dark.onAccent,

          secondary: ali.dark.surface2,
          "secondary-content": ali.dark.text,

          accent: ali.dark.link, // azul de citas (enlaces, CTA menor)
          "accent-content": ali.dark.onAccent,

          neutral: ali.dark.accent, // lo usa el spinner (`text-neutral`)
          "neutral-content": ali.dark.onAccent,

          "base-100": ali.dark.surface, // tarjetas / superficie elevada
          "base-200": ali.dark.bg, // fondo de página (envoltorio de App.jsx)
          "base-300": ali.dark.surface2,
          "base-content": ali.dark.text,

          info: ali.dark.link,
          "info-content": ali.dark.onAccent,
          success: "#4ade80",
          "success-content": "#0a0a0a",
          warning: "#fbbf24",
          "warning-content": "#0a0a0a",
          error: "#f87171",
          "error-content": "#0a0a0a",

          ...aliRadii,

          // Custom CSS variables for icon and button states
          "--icon-color": ali.dark.textMuted,
          "--icon-color-muted": "#737373",
          "--icon-color-disabled": "#525252",
          "--btn-disabled-bg": ali.dark.surface2,
          "--btn-disabled-color": "#737373",
          "--btn-disabled-border": ali.dark.border,

          "--navbar-padding": "0.8rem",
          "--border-color": ali.dark.border,
          "--tooltip-color": ali.dark.surface2
        }
      },
      {
        opensigncss: {
          primary: ali.light.accent, // acento ALI en claro: casi negro
          "primary-content": ali.light.onAccent,

          secondary: ali.light.surface2,
          "secondary-content": ali.light.text,

          accent: ali.light.link, // azul de citas (enlaces, CTA menor)
          "accent-content": "#ffffff",

          neutral: ali.light.accent, // lo usa el spinner (`text-neutral`)
          "neutral-content": ali.light.onAccent,

          "base-100": ali.light.surface, // tarjetas / superficie elevada
          "base-200": ali.light.bg, // fondo de página (envoltorio de App.jsx)
          "base-300": ali.light.surface3,
          "base-content": ali.light.text,

          info: ali.light.link,
          "info-content": "#ffffff",
          success: "#15803d",
          "success-content": "#ffffff",
          warning: "#b45309",
          "warning-content": "#ffffff",
          error: "#b91c1c",
          "error-content": "#ffffff",

          ...aliRadii,

          "--icon-color": ali.light.textMuted,
          "--icon-color-muted": "#737373",
          "--icon-color-disabled": "#a3a3a3",
          "--btn-disabled-bg": ali.light.surface3,
          "--btn-disabled-color": ali.light.textMuted,
          "--btn-disabled-border": ali.light.border,

          "--navbar-padding": "0.8rem",
          "--border-color": ali.light.border,
          "--tooltip-color": ali.light.accent
        }
      }
    ],
    prefix: "op-"
  }
};
