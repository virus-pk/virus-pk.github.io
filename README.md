# virus-pk.github.io

Portfolio of Tauqeer Ahmad: an Astro site with a scroll-driven 3D scene built with React Three Fiber, deployed to GitHub Pages.

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview
```

- Content (projects, skills, profile): `src/data/portfolio.ts`
- Page and text layer: `src/pages/index.astro`
- 3D scene: `src/components/Scene.tsx`

The 3D canvas is skipped when the visitor prefers reduced motion or has no WebGL; the page content works without it.

## Deployment

Every push to `main` is built and deployed by `.github/workflows/deploy.yml`.
In **Settings → Pages**, the source must be set to **GitHub Actions**.
