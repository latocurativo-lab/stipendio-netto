# Cycle 7 — Deploy vendita-fix (devops-hightower)

Date: 2026-09-06. Remote di ship: `live` (`latocurativo-lab/stipendio-netto`, maintenance su repo approvato — nessun nuovo deploy).

## Push

- Commit `46a0e6f` «Cycle 7 vendita-fix: detrazione art.13 reale 4 fasce+bonus65, success manuale 24h,
  scaffold forfettario locale» (9 file: 4 prodotto + `.gitignore` whitelist + 4 docs ciclo).
- `git push live HEAD:main` → `37926a3..46a0e6f`, OK. Workflow `static-pages-fallback`
  triggerato dal path `projects/stipendio-netto/**`.
- `projects/forfettario-netto/` resta fuori da git (gitignored, solo locale — NO-NEW-LIVE rispettato).

## Smoke live (post-deploy) — 8/8 + copy + 404

- `200 /`, `/metriche.html`, `/netto.js`, `/tax-2026.json`, `/robots.txt`, `/sitemap.xml`,
  `/success.html`, `/cancel.html`.
- `/tax-2026.json` live → versione `2026-bozza-2026-09-06-art13` (nuova formula in prod).
- `/success.html` live contiene «entro 24 ore» (copy manuale confermata in prod).
- Slug inesistente → `404` corretto.

## Note operative

- Prossimo deploy solo per fix guidati da dati reali o gate forfettario; baseline funnel v2 invariata.
- Stripe resta PLACEHOLDER (HUMAN-gate). `memories/consensus.md` resta locale, mai committato.
