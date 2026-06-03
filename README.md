# Elevare Portfolio

Strategy-led buyers agency marketing site (React + Vite + TanStack Router).

## Requirements

- **Node.js 20+** (tested with v20.19.x on staging)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production build (staging / VPS)

Stop any running dev/build processes first (avoids `ETXTBSY` on esbuild):

```bash
pkill -f "vite|Elevare-Portfolio" 2>/dev/null || true
```

Use the lockfile (fewer registry requests, more reliable on slow VPS networks):

```bash
git pull
rm -rf node_modules
npm run install:ci
npm run build
```

If `npm install` fails with **`ETXTBSY`** (esbuild text file busy):

```bash
pkill -f "vite|node.*Elevare" 2>/dev/null || true
rm -rf node_modules
npm run install:ci
```

If build crashes with **`Bus error`**, rebuild Tailwind Oxide only (do not rebuild esbuild during install):

```bash
npm run rebuild:native
npm run build
```

If `npm run install:ci` fails with `ECONNRESET`, retry (the project `.npmrc` enables 5 fetch retries):

```bash
npm run install:ci
```

Or install with plain npm (also uses `.npmrc` retries):

```bash
npm install --no-audit --no-fund
npm run build
```

Clear a broken partial install before retrying:

```bash
rm -rf node_modules
npm cache clean --force
npm run install:ci
```

Static output is in `dist/`. Serve with any static file server (nginx, Caddy, etc.). For client-side routes, use a fallback to `index.html`:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Preview production build

```bash
npm run preview
```
