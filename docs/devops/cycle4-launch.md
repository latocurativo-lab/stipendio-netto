# Cycle 4 — Launch runbook token-free (devops-hightower)

Date: 2026-09-06. Team: devops-hightower + fullstack-dhh + qa-bach + operations-pg.

## Blocker confermato
`npx -y wrangler pages deploy` (wrangler 4.129.0) in ambiente non-interattivo
richiede `CLOUDFLARE_API_TOKEN` — assente. Deploy CLI NON eseguito, nessun side effect.
Stessa Next Action per 2 cicli → per regola di convergenza #5: shrink scope, ship comunque.

## Decisione CEO: 3 path di deploy, zero dipendenze da token
1. **Path A — Cloudflare Pages via dashboard Git (raccomandato, no token):**
   dash CF → Pages → Create → Connect to Git → repo `auto-company`,
   build command: none, output dir: `projects/stipendio-netto`, project `stipendio-netto`.
   Auto-deploy a ogni push. ~5 minuti di click, un'unica volta.
2. **Path B — CLI con token (quando disponibile):**
   `export CLOUDFLARE_API_TOKEN=<token> && npx -y wrangler pages deploy projects/stipendio-netto --project-name=stipendio-netto`
3. **Path C — Fallback GitHub Pages (SHIPATO questo ciclo, zero setup):**
   `.github/workflows/static-pages-fallback.yml` pubblica `projects/stipendio-netto/`
   su GitHub Pages a ogni push su main/master. Nessun secret. Da attivare:
   repo Settings → Pages → Source: GitHub Actions (1 click).

## Hardening shipato (fullstack-dhh)
- `robots.txt` + `sitemap.xml` + `404.html` on-brand (SEO baseline).
- Plausible: rimosso `data-domain="TBD"` (ping sporchi); tracker iniettato da
  `netto.js` solo se `window.PLAUSIBLE_DOMAIN` non vuoto. Da impostare al deploy.
- Default regione: Lombardia esplicita (prima `sel.value=regione_default` con
  valori duplicati selezionava Abruzzo, la prima option con 1.5%). Chip hero
  riallineati: 25k→1370 / 30k→1579 / 35k→1803 / 50k→2483 (Lombardia 1.58%).
- README: 3 path di deploy documentati.

## Pre-launch checklist (ordina: dashboard → Stripe → Plausible → smoke)
- [ ] Path A o C attivo + URL pubblica verificata (8/8 route 200 in locale)
- [ ] `window.PLAUSIBLE_DOMAIN` impostato; eventi `calc`/`cta-click`/`pdf-intent` verificati
- [ ] Stripe Payment Link reale 9€ in `netto.js` (STRIPE_LINK) + `index.html` (2 href); success/cancel URL registrati
- [ ] Smoke: `?ral=30000&mens=13` → €1.578,80/mese (Lombardia default); banner versione == `tax-2026.json`
- [ ] Custom domain .it → Pages → Custom domain (suite Lavoro&Fisco)
