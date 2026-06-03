/**
 * Run manually after install if Tailwind Oxide failed on Linux:
 *   npm run rebuild:native
 *
 * Do NOT run during npm install — rebuilding esbuild causes ETXTBSY
 * while install.js is still writing the binary.
 */
import { execSync } from "node:child_process";

execSync("npm rebuild @tailwindcss/oxide", { stdio: "inherit" });
