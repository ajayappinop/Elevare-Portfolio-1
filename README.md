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

```bash
npm install
npm run build
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
