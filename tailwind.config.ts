import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#6FA286",
        ink: "#414042",
        paper: "#F8F8F4",
        white: "#FFFFFF",
        muted: "#626560",
        line: "#DADDD6",
        wash: "#E8EDE7",
        deep: "#203127",
        "cta-primary": "#47745C",
        "cta-primary-hover": "#395E49",
        "cta-secondary": "#414042",
      },
      fontFamily: { sans: ["var(--font-work)", "Arial", "sans-serif"] },
      borderRadius: { panel: "28px", card: "18px", pill: "999px" },
      boxShadow: { soft: "0 24px 60px rgb(41 59 49 / 12%)" },
      spacing: { section: "128px" },
    },
  },
  plugins: [],
} satisfies Config;
