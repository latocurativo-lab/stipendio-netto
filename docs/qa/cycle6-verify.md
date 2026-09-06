# Cycle 6 — QA re-verify post-tracking (qa-bach)

Date: 2026-09-06. Build: funnel v2 + metriche.html + canonical live (nessun cambio a `calcPure`).

## Invarianti `calcPure` (node, reg Lombardia 1.58% / com 0.5%) — PASS

- Monotonicità netto annuo 20 vettori (15k→~120k): OK
- m12 > m13 > m14 + annuo indipendente da mensilità (20/20): OK
- Spot: 30k/13 → mese 1578.80, annuo 20524, ver 2026-bozza-2026-09-06: OK
- Chip hero ±0.6 (25k→1369.67 / 30k→1578.80 / 35k→1802.60 / 50k→2482.84): OK
- INPS cap 55k: inps(60k)==inps(80k)==5055: OK
- Detrazione: 1955 piena a imponibile basso, 0 sopra 28k: OK

## DOM + wiring — PASS

- 20/20 ID presenti. `__sn_t0` in head: OK. `sn_funnel_v1`/`markTTV`/`snSession` in netto.js: OK.
- `calcPure` intatta (solo `track()` estesa + `markTTV()` in `render()`): OK.
- «TBD» trovato solo in 2 commenti che dicono «no TBD pings» → falso positivo del check naive, nessun ping sporco.
- `metriche.html`: noindex + lettura `sn_funnel_v1` + tally `sn_hallway_manual` + export: OK.
- `sitemap.xml`/`robots.txt`: 0 occorrenze `pages.dev`, solo URLs live: OK.

## Serve locale — 10/10 200 (incl. nuova `metriche.html`)

`/`, `/index.html`, `/netto.js`, `/tax-2026.json`, `/robots.txt`, `/sitemap.xml`,
`/404.html`, `/success.html`, `/cancel.html`, `/metriche.html`.

## Gate Munger #1 — ancora PARZIALE (invariato dai Cycle 4–5)

Modello consistente; validazione su 20 cedolini reali PENDING prima di rimuovere label bozza.
Bloccante per claim di precisione, non per hallway/strumentazione.
