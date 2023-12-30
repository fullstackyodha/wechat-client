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
            "@assets": "./src/assets/*",
            "@colors": "./src/colors/*",
            "@components": "./src/components/*",
            "@hooks": "./src/hooks/*",
            "@pages": "./src/pages/*",
            "@mocks": "./src/mocks/*",
            "@redux": "./src/redux-toolkit/*",
            "@services": "./src/services/*"
        }
    }
});
