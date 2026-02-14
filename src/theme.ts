import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                brand: {
                    bg: { value: "#0B1116" }, // Deep dark background
                    card: { value: "#151F26" }, // Slightly lighter card bg
                    primary: { value: "#00C6D1" }, // Cyan accent
                    secondary: { value: "#E6B800" }, // Gold accent
                    text: { value: "#FFFFFF" },
                    muted: { value: "#8B9DA6" },
                    danger: { value: "#EF4444" },
                    success: { value: "#10B981" },
                },
            },
            fonts: {
                heading: { value: "'Playfair Display', serif" },
                body: { value: "'Inter', sans-serif" },
            },
        },
    },
})

export const system = createSystem(defaultConfig, config)
