# Homepage scene captures (Jul 2026 visual pass)

## After (this pass)
Captured from live homepage via `scripts/capture-homepage-scenes.mjs`:

| File | Scene |
|---|---|
| `after/01-hero.png` | Hero (`variant="hero"`) |
| `after/02-cart-recovery.png` | Cart recovery story |
| `after/03-inbox.png` | Live Chat / inbox |
| `after/04-ai-brain.png` | AI Brain (new 5th story) |
| `after/05-journey.png` | Journey |
| `after/06-flow-builder.png` | Flow Builder |
| `after/07-connect-rail.png` | Connect your stack rail |

## Before (prior homepage showcases)
Prior marketing showcase PNGs used as before references where they existed:

| File | Notes |
|---|---|
| `before/02-cart-recovery.png` | From `public/marketing/home-cart-recovery-showcase.png` |
| `before/03-inbox.png` | From `public/marketing/home-inbox-showcase.png` |
| `before/05-journey-or-orders.png` | From `public/marketing/home-orders-showcase.png` (pre-journey rename) |

Hero / AI Brain / Flow Builder / connect-rail had no prior PNG in-repo; compare against Instantly reference screenshots attached in the task thread and the prior live markup (paragraph bubble + `.fs-hero__wire` glass nodes).

Re-capture after:

```bash
# terminal 1
npm run dev
# terminal 2
CAPTURE_LABEL=after node scripts/capture-homepage-scenes.mjs
```
