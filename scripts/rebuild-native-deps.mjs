import { execSync } from "node:child_process";

const packages = ["@tailwindcss/oxide", "esbuild"];

for (const pkg of packages) {
  try {
    execSync(`npm rebuild ${pkg}`, { stdio: "inherit" });
  } catch {
    console.warn(`[postinstall] optional rebuild skipped for ${pkg}`);
  }
}
