# Cycle 6 — Tracking funnel v2 + fix SEO (fullstack-dhh)

Date: 2026-09-06.

## Cosa cambia nel codice

- `index.html`: canonical + `og:url` → `https://latocurativo-lab.github.io/stipendio-netto/`
  (prima: `stipendio-netto.pages.dev` mai deployato — split-brain SEO con sitemap/robots);
  inline `window.__sn_t0=Date.now()` in head per TTV strumentale. Nessun cambio visuale.
- `netto.js`: `track()` estesa a funnel v2, `calcPure` e wiring **invariati** (QA-safe).
  - `snSession()`: sid per sessione (sessionStorage + fallback), UTM (`utm_source/medium/campaign`)
    + referrer catturati alla prima vista, cap 200 sessioni (localStorage hygiene).
  - `markTTV()`: ms da `__sn_t0` al primo `render()`, una volta per page-load, ultimi 50 valori.
  - Legacy `sn_events` + `sn_cta` mantenuti (sheet Cycle 4 continua a funzionare).
- `metriche.html` (nuova, interna): noindex/nofollow, fuori da nav e sitemap.
  Stessi design token del sito (carta/ink/mono — `frontend-design.md` assente nel repo skill,
  coerenza ottenuta riusando le variabili esistenti). KPI funnel, verdict GO/KILL auto a n≥100,
  tally manuale 5 utenti (localStorage `sn_hallway_manual`), tabella sessioni UTM, export JSON.
- `robots.txt` / `sitemap.xml`: Sitemap + loc → URLs `latocurativo-lab.github.io/stipendio-netto/`.

## Cosa NON cambia (scelta deliberata)

- Nessun reorder mobile calcolatore/hero: TTV sintetico 15–20s < 60s, kill-rule non scattata.
- Nessun backend analytics: zero-dep resta (Plausible si attiva con 1 var quando c'è dominio).
- Nessun fix F1 (microcopy default regione): registrato come open, si decide con dati reali.
