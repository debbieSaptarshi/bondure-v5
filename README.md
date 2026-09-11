# Bondure V5

Marketing site for Bondure — Next.js 15 (App Router), deployed on [Vercel](https://bondure-v5.vercel.app).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The dev script uses a separate build directory (`.next-dev`) so production builds are not overwritten while developing locally.

```bash
npm run build   # production build
npm run lint    # ESLint
```

---

## Project layout

| Area | Location |
| --- | --- |
| App routes | `src/app/` |
| React components | `src/components/` |
| Product, nav, tools data | `src/lib/` |
| Static media | `public/` |
| Product catalogue (embedded HTML) | `public/products-scroll-demo/` |
| Media optimization script | `scripts/optimize-media.mjs` |

Further asset naming and folder rules: [`docs/MEDIA_INDEX.md`](docs/MEDIA_INDEX.md).

---

## Adding images and videos (performance)

Large unoptimized files are the main cause of slow loads and heavy deploys. Follow this workflow whenever you add or replace media.

### 1. Choose the right format

| Use case | Preferred format | Notes |
| --- | --- | --- |
| Photos, hero art, galleries | **WebP** | Serve WebP in code; keep PNG/JPEG source if needed for editing |
| Product bags with transparency | **WebP** or PNG | Preserve alpha; run through the optimizer |
| Icons, logos, diagrams | **SVG** | Do not rasterize unless required |
| Short looping hero / gallery clips | **Animated WebP + static poster** | See homepage intro pattern |
| Longer feature video | **H.264 MP4** | Muted, `yuv420p`, fast-start metadata |

Reference the full encoding settings in [`MEDIA_OPTIMIZATION.md`](MEDIA_OPTIMIZATION.md).

### 2. Size to the display context

Do not upload full-resolution camera files. Cap width to how large the asset actually renders:

- Hero / full-bleed: up to **2200 px**
- Section imagery, WebGL textures: **1600–1920 px**
- Navigation, cards, thumbnails: **960–1000 px**
- Product bag shots: **~1024 px** (keep transparency)

The optimizer script applies these limits per file — add new sources to `scripts/optimize-media.mjs` when introducing assets that need batch processing.

### 3. Run the optimizer before committing

```bash
# Images + videos (see script for flags)
node scripts/optimize-media.mjs

# Videos only
node scripts/optimize-media.mjs --videos-only
```

Originals are backed up under `unused-assets-review/original-active-media/` before WebP/MP4 output is written.

### 4. Reference optimized paths in code

- Prefer **`.webp`** paths in components and data files.
- For autoplay video heroes, preload a **poster WebP** (see `src/app/page.js`) and use `playsInline`, `muted`, and explicit `play()` where needed.
- Use `loading="lazy"` and `decoding="async"` on below-the-fold `<img>` tags in static HTML.
- Keep filenames **lowercase kebab-case** with no spaces — see [`docs/MEDIA_INDEX.md`](docs/MEDIA_INDEX.md).

### 5. Where to put new files

| Content | Folder |
| --- | --- |
| Homepage / shared construction | `public/home-media/`, `public/optimized/home/` |
| Product shots | `public/products/`, `public/media/` |
| Services / spotlight | `public/spotlight/`, `public/services/` |
| Testimonials | `public/clients/sticky-scroll/` |
| Tools illustrations | `public/tools/` |

---

## Common practices for site changes

### Product and navigation updates

Product content has several touchpoints. Keep them aligned:

1. **`src/lib/products-data.js`** — canonical product list, specs, galleries, detail-page views
2. **`src/lib/navigation-data.js`** — mega menu labels and nav product links
3. **`public/products-scroll-demo/content.html`** — catalogue cards and filter `data-*` attributes
4. **`src/lib/tools-data.js`** — calculator product definitions (when applicable)

Filter sidebar counts in the catalogue are **computed at runtime** from card data (`updateFilterCounts` in `products-catalog.js`) — do not hard-code `(3)` style counts in HTML.

Product detail media carousel uses `getProductViews()`:

- Primary image always comes from `product.image`
- Demo video is shown **only** for `bondure-aac-block-jointing-mortar`
- Secondary on-site images are optional per category via `SECONDARY_VIEW_BY_CATEGORY`

### Pull requests and branches

- Rebase feature branches on latest `main` before opening a PR
- Avoid mixing unrelated product-line changes (e.g. adding/removing entire categories) with UI fixes
- Run `npm run build` locally for anything touching routes, data, or static HTML
- Vercel preview deploys require GitHub ↔ Vercel authorization on the team account

### Styling and components

- Match existing patterns in the file you edit (CSS modules vs global CSS, GSAP usage, locale keys)
- Copy strings that need German: extend both `en` and `de` blocks or use existing `useLocale()` patterns
- Prefer data-driven images (`PRODUCT_IMAGES_BY_SLUG`, product `image` fields) over hard-coded paths in nav

### Media and git

- Do not commit multi-megabyte raw uploads without running the optimizer
- Binary video changes inflate repo size — replace in place only when necessary
- After renaming assets, grep the repo for the old path and update [`docs/MEDIA_INDEX.md`](docs/MEDIA_INDEX.md)

### Quality checks before merge

- [ ] Visual check on mobile and desktop for the changed page
- [ ] Product links resolve (`/products/[slug]`)
- [ ] EN and DE locale smoke test if copy changed
- [ ] Lighthouse or Network tab: no accidental 2 MB+ images on first paint
- [ ] `npm run lint` passes

---

## Related docs

- [`MEDIA_OPTIMIZATION.md`](MEDIA_OPTIMIZATION.md) — encoding settings, deploy size impact, script usage
- [`docs/MEDIA_INDEX.md`](docs/MEDIA_INDEX.md) — file naming, folder map, asset inventory

## Deploy

Pushes to `main` deploy automatically via Vercel. See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for manual or preview workflows.
