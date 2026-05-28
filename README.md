# whosyurgoat-hub

The lightweight hub/router that owns **whosyurgoat.app**. It serves a landing
page (a directory of my projects) and proxies subpaths to each project's own,
independent Vercel deployment via rewrites.

It contains **no project code** — only routing + the landing page. Keep it tiny.

## Routes

| Path                       | Target                                      |
| -------------------------- | ------------------------------------------- |
| `whosyurgoat.app/`         | This hub's landing page                     |
| `whosyurgoat.app/goat`     | Peoples_Champ (Who's Yur GOAT) deployment   |
| `whosyurgoat.app/crime-maps` | Crime-Maps deployment                     |
| `whosyurgoat.app/election` | Election Tracker deployment                 |
| `whosyurgoat.app/vegas`    | Can Tre Beat Vegas deployment               |
| `whosyurgoat.app/worldcup` | World Cup 2026 deployment                   |

## How to add a new project

1. **Add a card.** Append an entry to the `projects` array in
   [`app/projects.ts`](app/projects.ts) with a `title`, `description`, `href`
   (the subpath, e.g. `/newthing`), and `status` (`"live"` or `"coming-soon"`).
2. **Add a rewrite.** Add a matching rule to [`vercel.json`](vercel.json):
   ```json
   { "source": "/newthing/:path*", "destination": "https://YOUR-newthing.vercel.app/:path*" }
   ```
   The `source` subpath must match the card's `href`.

A **Coming Soon** project should still render a card. Its rewrite can point at a
placeholder URL until the real deployment is live — just swap the destination
when it ships.

## Rewrite ordering rules (don't break this)

Vercel evaluates `rewrites` **top to bottom and uses the first match**, so order
matters:

1. The hub's own routes (`/`, and any future hub pages) always resolve first —
   Next.js page/filesystem routes take priority over `rewrites` by default, so
   the landing page is safe.
2. The proxy rewrites are **scoped to a subpath prefix** (`/goat/:path*`,
   `/crime-maps/:path*`, …). Keep them scoped — never widen one to a bare
   `/:path*`.
3. If you ever add a **catch-all** rewrite (`/:path*` → somewhere), it MUST be
   the **last** entry. A catch-all placed above the scoped proxies would
   swallow every request and break all subpaths.

In short: **specific proxies first, catch-all (if any) last.**

## Each project must set its own `basePath`

A proxied project must set `basePath` matching its subpath, or its
assets/internal links will resolve at the deployment root and **404 behind the
hub**. In the target project's `next.config.mjs`:

```js
// in the /goat project
const nextConfig = { basePath: "/goat", assetPrefix: "/goat" };
```

Do the same in each project (`/crime-maps`, `/election`, `/vegas`,
`/worldcup`). Without it, `whosyurgoat.app/goat` loads the HTML but the JS/CSS
and links point at `/_next/...` instead of `/goat/_next/...`.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

Note: rewrites in `vercel.json` are applied by Vercel's edge, not by
`next dev`. To exercise the proxying locally use `vercel dev`.

## Deploy to Vercel

```bash
npm install -g vercel   # if needed
vercel                  # first run: link/create the project
vercel --prod           # deploy to production
```

Or connect this GitHub repo in the Vercel dashboard for automatic deploys on
push.

### Moving the whosyurgoat.app domain onto this hub

The domain currently lives on the **Peoples_Champ** Vercel project. To move it
to this hub project:

1. In the Vercel dashboard, open **Peoples_Champ → Settings → Domains**.
2. Remove `whosyurgoat.app` (and `www.whosyurgoat.app`) from that project.
3. Open **whosyurgoat-hub → Settings → Domains**.
4. Add `whosyurgoat.app` (and `www`). DNS already points to Vercel, so no
   registrar changes are needed — Vercel just re-associates the domain.
5. Update the `/goat` rewrite destination in `vercel.json` to Peoples_Champ's
   own `*.vercel.app` URL (since it no longer owns the apex domain), then
   redeploy the hub.

After this, `whosyurgoat.app/` serves the hub and `/goat` proxies to
Peoples_Champ.
