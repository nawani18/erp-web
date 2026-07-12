/**
 * src/styles/theme.js
 * Centralized design tokens for the College ERP System.
 * Keeps UI consistent and scalable across the application.
 */

export const theme = {
    colors: {
        primary: {
            50: "#eef2ff",
            100: "#e0e7ff",
            500: "#6366f1", // Indigo Base
            600: "#4f46e5",
            700: "#4338ca",
        },
        neutral: {
            50: "#f8fafc",
            100: "#f1f5f9",
            200: "#e2e8f0",
            300: "#cbd5e1",
            400: "#94a3b8",
            500: "#64748b",
            600: "#475569",
            700: "#334155",
            800: "#1e293b",
            900: "#0f172a",
        },
        status: {
            success: "#22c55e",
            warning: "#f59e0b",
            danger: "#ef4444",
            info: "#3b82f6",
        },
        white: "#ffffff",
        black: "#000000",
    },

    typography: {
        fontFamily: {
            sans: '"Inter", system-ui, -apple-system, sans-serif',
        },
        fontSize: {
            xs: "0.75rem",
            sm: "0.875rem",
            base: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            "2xl": "1.5rem",
        },
        fontWeight: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
    },

    borderRadius: {
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
    },

    spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
    },

    shadows: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        none: "none",
    },

    transitionDuration: {
        fast: "150ms",
        normal: "200ms",
        slow: "300ms",
    },

    zIndex: {
        base: 0,
        dropdown: 1000,
        sticky: 1100,
        modal: 1300,
        toast: 1500,
    },

    breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
    },

    // Component specific tokens
    buttonHeights: {
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
    },

    inputHeights: {
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
    },

    cardPadding: {
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
    },

    tableRowHeight: {
        compact: "2.5rem",
        standard: "3.5rem",
    },
};
    