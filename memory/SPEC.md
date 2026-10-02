# PENDING™ — App Spec

## What it is
Satirical Indian streetwear e-commerce site. Neo-brutalist + editorial style
("Indian streetwear meets a broken operating system"). Brand philosophy:
"QUESTION EVERYTHING."

## Architecture
- **Frontend-only demo data** (user choice): products live in
  `frontend/src/data/products.ts` — 20 products across 5 categories (SCAMS,
  SYSTEM, INDIA, CORPORATE, LIMITED DROPS), each with story, sizes, stock,
  color, type. The FastAPI backend is untouched (template `status` endpoints
  only); no frontend code calls it.
- **State**: `frontend/src/lib/store.tsx` — CartProvider with cart lines
  (localStorage key `pending.cart.v1`), wishlist (`pending.wishlist.v1`),
  cart-drawer + search-overlay open state. Free-shipping threshold ₹1,999.
- **Routing** (`frontend/src/App.tsx`): `/`, `/shop`, `/shop/:category`
  (scams|system|india|corporate|limited-drops), `/product/:slug`, `/lookbook`,
  `/archive`, `/manifesto`, `/checkout` (demo, ends in order-confirmed screen,
  clears cart), `/help/:topic` (shipping|returns|size-guide|contact), `*` → 404.
- **Theme**: `frontend/src/index.css` — cream #F4F1E8, ink #111111, signal red
  #E52A1B, acid green #D9FF32; fonts Space Grotesk (display) / DM Sans (body) /
  JetBrains Mono (system labels); radius 0, hard shadows (`.shadow-hard*`),
  ticker marquee (`.ticker-track`), terminal cursor (`.cursor-blink`),
  `.stamp`, `.diag-stripes`, `.bg-grain`, `.text-outline-*`.
- **Imagery**: AI-generated, in `frontend/public/images/`
  (`hero-editorial.jpg`, `products/<slug>.jpg`, `lookbook-1..4.jpg`).

## Key flows
- Home: hero → LIVE DROP (4 featured products) → category index → lookbook
  strip → PENDING OS terminal (auto-runs typing animation in view, id="system")
  → manifesto → archive records → newsletter (id="newsletter").
- Shop: filter rail (category/type/size/price/availability) + sort; mobile
  filter panel toggle. `/shop/:category` pre-selects the category filter.
- Product: gallery with thumbs, size selector (error toast if missing), qty,
  ADD TO BAG (opens drawer), BUY NOW (→ checkout), size-guide dialog, related
  products, mobile sticky buy bar.
- Cart drawer: qty steppers, remove, subtotal, free-shipping progress bar,
  CHECKOUT → `/checkout` → PAY → 1.4s processing → order-confirmed screen.
- Search: overlay on "/" hotkey or header icon; live results by
  name/category/story/keywords; suggestion chips.

## Credentials
None — no auth anywhere. Demo checkout charges nothing.
