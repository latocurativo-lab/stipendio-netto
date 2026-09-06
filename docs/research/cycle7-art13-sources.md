# Cycle 7 — research: formula detrazione art.13 reale (fonti)

Data: 2026-09-06. Agent: research-thompson.

## Fonti concordi (4/4)
1. **Fiscomania** (2026-07-29): 3 fasce — fino 15k: 1.955€ fisso; 15.001-28k: `1.910 + 1.190 × (28.000 − RC)/13.000`; oltre 28k: decalage verso 50k; struttura da DLgs 216/2023 + L.207/2024.
2. **CAF Informa (UCI)** (2026-07-07): tabella 4 fasce — 15.001-28k stessa formula; 28.001-50k: `1.910 × (50.000 − R)/22.000`; oltre 50k zero; **+65€ tra 25-35k (c.1-bis)**; nota esplicita: «la formula può produrre valori superiori a 1.955€ appena sopra i 15k — non è un errore».
3. **CalcolatoriFiscali.it** (gen 2026): stesse 3 formule + zero oltre 50k, FAQ: «15-28k: 1.910 + 1.190 × (28.000 − R)/13.000».
4. **SamBooks** (16/08/2026): conferma +65€ 25-35k, minimi 690/1.380€, RC al netto abitazione principale (c.6-bis).

## Esempi pubblicati usati come attesi
- RC 14k → 1.955€ (tutti) · RC 22k → **2.459€** (CAF: 1.910+549) · RC 35k → 1.302€ base (+65 = 1.367€ con bonus).
- I nostri 20 casi coprono 12k-52k inclusi i boundary 15k/28k/50k e la banda bonus 25-35k.

## Assunzioni dichiarate (stima onesta)
- Base = reddito complessivo stimato = RAL − INPS (mono-reddito, no altri redditi/cedolare/forfettario/mance, no abitazione principale, 365gg, no prorata, no minimi part-time).
- Cuneo L.207/2024 (somme escluse ≤20k + ulteriore detrazione 20-40k) RESTA a sconto 0 in build: stima prudente, in attesa circolari INPS 2026. Non confondere con detrazione art.13.
- Trattamento integrativo ex bonus Renzi escluso dal tool (rilevanza solo in dichiarazione).

## Implicazione
La vecchia lineare (1955 → 0 su 15-28k) sottostimava fino a **1.910€/anno** (misurato su 20 casi). Il fix implementa le formule pubblicate alla lettera, bonus +65 incluso.
