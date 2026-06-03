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

Use the lockfile (fewer registry requests, more reliable on slow VPS networks):

```bash
git pull
npm run install:ci
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
