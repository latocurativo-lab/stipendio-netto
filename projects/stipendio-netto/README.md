# stipendio-netto — deploy Cloudflare Pages
Prodotto: calcolatore RAL→netto 2026 (stima) + PDF 9€ fake-door via Stripe Payment Link.
Stack: statico zero-dep (index.html + netto.js + tax-2026.json). TTV target <5s.

## Deploy

**Path A — Cloudflare Pages via dashboard (no token needed, recommended):**
dash Cloudflare → Pages → Create → Connect to Git → repo `auto-company` →
build command: none (static) → output dir: `projects/stipendio-netto` →
project `stipendio-netto`. Auto-deploy on push.

**Path B — CLI (needs token):**
```sh
export CLOUDFLARE_API_TOKEN=<token con permessi Pages>
npx -y wrangler pages deploy projects/stipendio-netto --project-name=stipendio-netto
# custom domain .it → dash Cloudflare → Pages → Custom domain
```

**Path C — Fallback automatico (zero setup, già attivo):**
`.github/workflows/static-pages-fallback.yml` pubblica questa cartella su
GitHub Pages a ogni push su main/master. Nessun secret richiesto.

## Checklist pre-deploy (gates Munger)
- [ ] `tax-2026.json` versione = banner (`2026-bozza-2026-09-06`), last_check aggiornata
- [ ] QA 20 buste: max delta <15€/mese (vedi docs/qa/cycle3-tests.md)
- [ ] Stripe Payment Link reale sostituito in `netto.js` (STRIPE_LINK) + `index.html` (2 href) — niente `?paid=1`
- [ ] Plausible `data-domain` impostato; eventi `calc` / `cta-click` / `pdf-intent` verificati
- [ ] success/cancel URL registrati in Stripe dashboard

## Pricing (CFO)
Launch 9€ d1-14 → A/B 9 vs 12 (n≥200/variante, RPV≥0.20€). Kill PDF→tool gratis se CTR CTA <15% su n≥100 o conv <1.5% dopo 500 visite.
