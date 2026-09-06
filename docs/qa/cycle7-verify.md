# Cycle 7 — QA indipendente: gate detrazione art.13

Data: 2026-09-06. Agent: qa-bach. Verdetto: **PASS — vendibilità sbloccata sul punto bocciato**.

## Gate Next Action: delta <15€/mese su 20 casi vs esempi CAF/AdE
Base: detrazione pura su redditi 12k→52k (boundary 15k/28k/50k + banda bonus 25-35k inclusi).
Atteso = formule pubblicate alla lettera (CAF/UCI + Fiscomania + CalcolatoriFiscali concordi).

| Reddito | Got | Atteso | | 12k 1955/1955 · 14k 1955/1955 · 15k 1955/1955 · 15.5k 3054/3054 ·
17k 2917/2917 · 19k 2734/2734 · 20k 2642/2642 · 22k 2459/2459 (= esempio CAF) ·
24k 2276/2276 · 25k 2185/2185 · 26k 2093/2093 · 27k 2002/2002 · 28k 1910/1910 ·
29k 1888/1888 · 32k 1628/1628 · 35k 1367/1367 (1.302 base +65 bonus) ·
40k 868/868 · 45k 434/434 · 50k 0/0 · 52k 0/0.

- **20/20 OK, max delta = 0€** (soglia 15€/mese = 180€/anno) → **GATE PASS**.
- Vecchia formula sullo stesso set: errore max **1.910€/anno (~159€/mese)** → conferma bocciatura QA precedente.

## Regressioni
- JS syntax OK · JSON valido (v `2026-bozza-2026-09-06-art13`) · serve locale 8/8 (index, netto.js,
  tax-2026.json, success, cancel, metriche, robots, sitemap) · canonical github.io OK.
- Nessuna stringa stalatitia («azzerata a 28k (lineare)», «entro pochi minuti») in index/success;
  `phase_out_*` resta solo come fallback legacy commentato in netto.js (voluto).
- Stripe PLACEHOLDER presente (atteso, HUMAN-gate) · nessun bypass `?paid=1` (solo commenti anti-bypass).
- End-to-end rese mese (Lombardia 1,58% + comune 0,5%, 13 mens): 25k→1.492,59 · 30k→1.722,27 ·
  35k→1.929,30 · 50k→2.513,53 — chips aggiornati di conseguenza.

## Limiti onesti (restano aperti)
- Validazione su **formule pubblicate**, non su 20 buste paga reali (Open Question invariata).
- Assunzioni: mono-reddito, 365gg, no minimi part-time, cuneo a 0, no trattamento integrativo.
  Il banner «STIMA» + `taxmeta` restano obbligatori in UI.
