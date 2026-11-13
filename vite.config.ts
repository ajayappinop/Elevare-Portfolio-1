import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/** Live nginx has no SPA fallback. A real folder with index.html is served on refresh. */
function spaRouteCopies() {
  return {
    name: "spa-route-copies",
    apply: "build" as const,
    closeBundle() {
      const distDir = fileURLToPath(new URL("./dist", import.meta.url));
      const routesDir = fileURLToPath(new URL("./src/routes", import.meta.url));
      const indexHtml = join(distDir, "index.html");
      if (!existsSync(indexHtml)) {
        return;
      }

      const routes = readdirSync(routesDir)
        .filter((file) => file.endsWith(".tsx") && file !== "index.tsx" && !file.startsWith("__"))
        .map((file) => file.replace(/\.tsx$/, ""));

      for (const route of routes) {
        const routeDir = join(distDir, route);
        mkdirSync(routeDir, { recursive: true });
        copyFileSync(indexHtml, join(routeDir, "index.html"));
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), tsconfigPaths(), spaRouteCopies()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3002,
      strictPort: true,
    },
    build: {
      sourcemap: false,
      target: "es2020",
      cssMinify: true,
      rollupOptions: {
        maxParallelFileOps: 2,
      },
    },
  };
});
