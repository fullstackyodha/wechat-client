/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), jsconfigPaths()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@colors": path.resolve(__dirname, "./src/colors"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@mocks": path.resolve(__dirname, "./src/mocks"),
            "@redux": path.resolve(__dirname, "./src/redux_toolkit"),
            "@services": path.resolve(__dirname, "./src/services")
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/colors/variables.scss" as *;`,
                includePaths: [path.resolve(__dirname, "src")]
            }
        }
    },
    test: {
        environment: "jsdom",
        // hey! 👋 over here
        globals: true,
        setupFiles: "./src/setupTest.js"
    }
});
