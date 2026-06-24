import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        surface: "#111827",
        "surface-glass": "rgba(17, 24, 39, 0.6)",
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          strong: "rgba(255, 255, 255, 0.16)",
        },
        primary: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          DEFAULT: "#3B82F6",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
          muted: "#64748B",
          inverse: "#0F172A",
        },
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        DEFAULT: "8px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Sora", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["64px", { lineHeight: "72px", fontWeight: "700" }],
        "display-xl": ["48px", { lineHeight: "56px", fontWeight: "700" }],
        "display-lg": ["36px", { lineHeight: "44px", fontWeight: "700" }],
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        20: "80px",
        24: "96px",
        32: "128px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(0,0,0,0.30)",
        sm: "0 1px 3px rgba(0,0,0,0.35)",
        md: "0 4px 6px -1px rgba(0,0,0,0.35)",
        lg: "0 10px 15px -3px rgba(0,0,0,0.40)",
        xl: "0 20px 25px -5px rgba(0,0,0,0.45)",
        "glow-primary": "0 0 24px rgba(59,130,246,0.35)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
