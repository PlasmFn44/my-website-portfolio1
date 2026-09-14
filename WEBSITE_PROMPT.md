# Master Prompt — Plasm Portfolio Website

Copy everything inside the code fence below into any AI website builder to
regenerate this site from scratch.

---

Build a complete, production-ready personal portfolio website for a freelance
short-form video editor named **Plasm**.

## TECH STACK

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- No UI component libraries — build everything custom
- All icons as inline SVG React components (no icon packages, no icon fonts)
- Entry point: `src/App.tsx`
- Split into logical components and data files, not one giant file

## DESIGN DIRECTION — "Dark Editorial Studio"

Professional creative-studio aesthetic. **Not** a gaming/neon theme.

- **Background:** deep charcoal / warm near-black (`#0B0C0E` – `#111315`)
- **Text:** off-white primary, muted warm gray secondary
- **Accent:** ONE restrained accent — soft gold/bronze (`#C9A227`, `#E3C567`)
  pulled from the logo. Optional cool slate-blue as a rare secondary.
- **Forbidden:** neon cyan, electric purple, rainbow gradients, glow/bloom
  effects, cursor-follow glows, film-grain overlays, animated blob backgrounds
- **Typography:** editorial. Large confident headings (Sora / Instrument Sans /
  General Sans), highly readable body (Inter). Generous line-height.
- **Layout:** lots of whitespace, strong vertical rhythm, max-width ~1200px
- **Cards:** subtle 1px borders, modest radius (8–14px, not pill-shaped),
  soft low-opacity shadows — no glowing borders
- **Motion:** restrained and purposeful. Gentle fade-and-rise on scroll,
  smooth 200–300ms hovers. No bouncing, pulsing, or floating elements.
- **Respect `prefers-reduced-motion` everywhere.**

## BRAND DATA (use exactly — do not invent placeholders)

| Item | Value |
|---|---|
| Name | Plasm |
| Handle | @PlasmFN |
| Roles | Video editor, Discord server creator, graphic designer |
| Business email | `plasmfnyt44@gmail.com` |
| Location / timezone | Pakistan — PKT (GMT+5), IANA `Asia/Karachi` |
| Logo | `https://i.postimg.cc/rwCVmRGX/Plasm-Fn-Official-Logo.png` |
| Featured video ID | `fzaqqerv9vU` |
| Copyright | © 2026 Plasm. All rights reserved. |

### Social links

```
YouTube    https://www.youtube.com/@PlasmFN
X          https://x.com/PlasmFnYT
Instagram  https://www.instagram.com/plasmfnyt/
Discord    https://discord.gg/NFVujeph8z
```

**Logo rule:** render the logo image exactly as provided — no crop, recolor,
filter, rotation, border-radius, drop-shadow, blend mode, or hover animation.
Use `object-fit: contain`. Also use it as the favicon and apple-touch-icon.

## COMMISSION OFFER (the only service currently for sale)

**Package name:** Short Video Edit

| Length | Price (USD) |
|---|---|
| Up to 30s | **$3.70** |
| Up to 45s | **$5.00** |
| Up to 60s | **$5.00** |

- **Delivery:** 48 hours
- **Format:** vertical 9:16 (Shorts / Reels / TikTok)
- **Discount:** label it **"Limited-Time Offer"** — 25% off orders of 2 or more
  edits, applied automatically, no code needed
- **Payment:** **Easypaisa only.** Do not mention PayPal, cards, crypto, or
  any other method. The site never collects payment — it is arranged directly.
- Graphic design and Discord server creation appear in the portfolio as
  showcased skills, but are **not** currently open for commission.

### Pricing math (important)

- Store prices as **integer cents** (370, 500, 500) — never floats
- Multiply unit price × quantity to get subtotal
- Apply the 25% discount to the **order subtotal**, then round **once** to the
  nearest cent (never round per item — it drifts)
- Verify: 2 × 30s = subtotal $7.40 → −$1.85 → **total $5.55**
- Discount disappears automatically when quantity returns to 1

## PAGE STRUCTURE

### 1. Sticky header
Logo image + "PLASM" wordmark (links to top) · nav: About / Work / Commissions
/ Contact · "Join Discord" button · hamburger menu on mobile. Background turns
translucent-blurred once scrolled. Active section is highlighted.

### 2. Hero
- Small availability pill: "Short-video commissions open"
- Headline: "Hi, I'm Plasm"
- A typewriter line cycling: high-energy short-form edits · clean Discord
  communities · bold logos & PFPs · clips built to hold attention
- Short intro paragraph
- Four social icon buttons (YouTube, X, Instagram, Discord)
- Two CTAs: "View My Work" and "Join the Community"
- **Right side:** the featured YouTube video as a clickable thumbnail
  (`https://img.youtube.com/vi/fzaqqerv9vU/maxresdefault.jpg`, falling back to
  `hqdefault.jpg` on error) with a play button overlay

### 3. About
Three skill cards: Video editing · Graphic design · Discord server creation.
Below them: email button and "Message me on Discord" button.

### 4. Work — horizontal carousel
Three cards laid out **horizontally**:
1. **Video Editing** — real YouTube thumbnail, play button → opens video modal,
   plus an external link to the video
2. **Graphic Design** — "Portfolio coming soon" placeholder, disabled CTA
3. **Discord Server Creation** — links to the Discord invite

Carousel requirements:
- Touch/trackpad swipe scrolling
- **Previous / Next arrow buttons** for mouse users on laptop and tablet
- Smooth animated scroll that snaps to the next card
- Arrows disable at the first/last card and hide entirely if everything already
  fits on screen
- Arrow-key, Home, and End keyboard support
- Must never scroll the surrounding page

### 5. How it works — 4 steps
Send your brief → Confirm your order (pricing + Easypaisa) → I'll get editing →
Delivered in 48 hours (scheduling in Pakistan time, GMT+5).

### 6. Commissions
One package card containing:
- Price that updates live with the selected length
- Length selector: 30s / 45s / 60s (each showing its own price)
- Quantity selector with −/+ buttons and a typed input
- Live order summary: subtotal → limited-time discount → **order total**
- A visually prominent **"Limited-Time Offer — Save 25% on 2+ edits"** banner
  (this is the one place a warm accent highlight is encouraged)
- Delivery time, 9:16 format, Easypaisa-only note
- CTA that carries the selection into the contact form
- Secondary "Prefer Discord?" link

### 7. FAQ — accordion
How to order · pricing per length · how the limited-time discount works ·
payment (Easypaisa only) · what footage to provide · delivery time and
timezone · whether logos/Discord servers can be ordered (not right now).

### 8. Discord CTA band
Invite to the community, showing `discord.gg/NFVujeph8z`, plus a
"Subscribe on YouTube" link.

### 9. Contact
- **Live Pakistan clock** (`Asia/Karachi`, updating every second, labeled
  "PKT / GMT+5")
- Email card with a one-click copy button
- Discord card
- YouTube / X / Instagram tiles
- **Inquiry form:** name, email, inquiry type (commission or business),
  length + quantity when it's a commission, and a message field.
  On submit it **builds an email draft and shows a preview first** — subject,
  recipient, and full body including length, quantity, unit price, subtotal,
  discount, order total, delivery, format, Easypaisa, and Plasm's timezone.
  The user reviews it, then clicks to open their mail app via `mailto:`.
  Include an "Edit my brief" button to go back. Nothing is ever sent or
  charged by the site itself.

### 10. Footer
Logo + wordmark · © 2026 Plasm. All rights reserved. · social icons ·
email link · "Based in Pakistan / PKT (GMT+5)"

### 11. Video modal
Opens the YouTube embed with autoplay. Closes via the × button, clicking the
backdrop, or pressing Escape. Locks background scroll while open.

## CRITICAL TECHNICAL RULES

**1. Links must open exactly once, in a new tab.**
Every external link must be a plain anchor:
```html
<a href="https://..." target="_blank" rel="noopener noreferrer">
```
Absolutely **no** `onClick` navigation, `window.open()`, `window.location.href`,
`window.top.location`, or global click interceptors on links. Combining
`window.open` with a location assignment causes the link to open twice — once
in a new tab and once replacing the current page. Never do this.
`mailto:` links and in-page `#anchor` links must stay untouched so email and
smooth-scrolling still work.

**2. One source of truth for links.**
Put every URL in a single `src/data/links.ts` file and import it everywhere.
No hardcoded URLs scattered through components.

**3. Separate data from presentation.**
Keep brand info, links, pricing, and copy in `src/data/*`. Keep pricing math in
a dedicated pure utility module that is easy to unit-test.

**4. Fixed overlays must not block clicks.**
Any full-width decorative or progress overlay needs `pointer-events: none`,
otherwise it silently swallows clicks on the header beneath it.

## ACCESSIBILITY & QUALITY

- Semantic HTML: real `<button>` for actions, real `<a>` for navigation
- Visible focus rings on every interactive element
- `aria-label` on all icon-only buttons; decorative SVGs get `aria-hidden`
- Accordion uses `aria-expanded`; modal uses `role="dialog"` + `aria-modal`
- Form inputs have real `<label>`s; validation errors use `role="alert"`
- Fully responsive: 360px phone → 4K desktop, no horizontal page scroll
- Lazy-load images; graceful fallback if the YouTube thumbnail 404s
- Page title: `Plasm | Official Portfolio`
- Meta description + Open Graph + Twitter card tags including the pricing,
  limited-time discount, 48-hour delivery, and Easypaisa
- Must compile cleanly with TypeScript strict mode and build without warnings

## TONE

Confident, concise, professional. Present Plasm as a serious freelance creative
— short-form video editing for creators and brands. Gaming edits are part of
the portfolio, not the whole identity. Avoid hype words, excessive emoji, and
gamer slang.
