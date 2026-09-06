# Cycle 4 — QA re-verify post-harden (qa-bach)

Date: 2026-09-06. Build: post-harden (robots/sitemap/404, Plausible hook, default Lombardia, chip riallineati).

## Invariant suite (node, `calcPure`, reg 1.5% / com 0.5%) — PASS, tutto OK
- Monotonicità netto annuo su 20 vettori RAL (15k→120k): OK
- Ordine mensilità m12 > m13 > m14 + annuo indipendente da mens (20/20): OK
- Detrazione: piena 1955€ a imponibile ≤15k, 0 a ≥28k: OK
- INPS cap 55k: inps(60k) == inps(80k) == 5055€: OK
- Spot Cycle 2 (base 1.5%): 25k→1371.07, 30k→1580.48, 35k→1804.56, 50k→2485.63 (Δ<0.6): OK

## Nuovi spot default Lombardia (1.58% / 0.5%, 13 mens)
- 25k→1369.67, 30k→1578.80, 35k→1802.60, 50k→2482.84 — chip hero allineati.
- Delta vs base 1.5%: ~1–3€/mese, atteso (0.08pp su imponibile).

## DOM wiring — PASS 20/20 ID OK
TBD-script rimosso: OK. `PLAUSIBLE_DOMAIN` hook presente: OK.

## Serve locale — 8/8 200
`/`, `/netto.js`, `/tax-2026.json`, `/robots.txt`, `/sitemap.xml`,
`/404.html`, `/success.html`, `/cancel.html`.

## Gate Munger #1 — ancora PARZIALE (invariato)
Modello consistente; validazione su 20 cedolini reali ancora PENDING prima
di rimuovere label bozza. Bloccante per claim di precisione, non per launch stimato.
