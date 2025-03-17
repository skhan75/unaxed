import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            color: "hsl(240 5% 64.9%)",
            h1: {
              color: "hsl(0 0% 98%)",
            },
            h2: {
              color: "hsl(0 0% 98%)",
            },
            h3: {
              color: "hsl(0 0% 98%)",
            },
            h4: {
              color: "hsl(0 0% 98%)",
            },
            a: {
              color: "hsl(263 85% 80%)",
              "&:hover": {
                color: "hsl(263 85% 70%)",
              },
            },
            strong: {
              color: "hsl(0 0% 98%)",
            },
            code: {
              color: "hsl(263 85% 80%)",
              backgroundColor: "hsl(240 3.7% 15.9%)",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
            },
            blockquote: {
              color: "hsl(240 5% 64.9%)",
              borderLeftColor: "hsl(240 3.7% 15.9%)",
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config

export default config

