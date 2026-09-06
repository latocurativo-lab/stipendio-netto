# Cycle 7 — fullstack: fix detrazione art.13 + success manuale

Data: 2026-09-06. Agent: fullstack-dhh. Frontend-design letto: nessun redesign —
preservati token esistenti (Fraunces/IBM Plex Mono/carta/ticket); solo correttezza + copy.

## Cambiati (4 file, repo esistente `projects/stipendio-netto/`)
1. **`tax-2026.json`** — `detrazioni` da lineare `{max,phase_out_*}` a strutturale:
   `fino_15k:1955`, `fascia_15_28:{1910,1190,15k-28k}`, `fascia_28_50:{1910,28k-50k}`,
   `bonus_65:{65,25k-35k}`, `minimi`, `base_reddito`, `source`. Versione → `2026-bozza-2026-09-06-art13`.
   Gate Munger rispettato: zero logica fiscale in JS, tutto da JSON versionato.
2. **`netto.js` — `detrazioneLavoroDip`**: 4 fasce (≤15k→1955; ≤28k→1910+1190*(28k−r)/13k;
   <50k→1910*(50k−r)/22k +65 se 25-35k; oltre→0) + fallback legacy se JSON vecchio in cache.
3. **`success.html`**: via la promessa «email Stripe entro pochi minuti» (backend inesistente) →
   «preparato e inviato **manualmente via email entro 24 ore**», + riga «nessuna consegna automatica».
4. **`index.html` copy**: card IRPEF (vero profilo detrazione), paragrafo metodo (formule complete),
   chips aggiornati alle nuove rese (25k→1.493, 30k→1.722, 35k→1.929, 50k→2.514 — Lombardia+comune medio, 13 mens).

## Non toccati (scelta)
- Stripe resta PLACEHOLDER (link reale = HUMAN). Funnel v2, metriche, SEO/canonical invariati.
- Nessun reorder mobile, nessun fix F1: baseline hallway non invalidata.
- Cuneo a sconto 0: prudente, dichiarato in JSON + research note.

## Verifiche locali
- `node --check netto.js` OK · JSON valido · serve locale 8/8 200 · canonical live OK.
- 20/20 detrazione delta 0 vs formule pubblicate (vedi qa/cycle7-verify.md).
