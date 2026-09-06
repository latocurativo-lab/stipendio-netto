# Cycle 6 — Hallway (operations-pg + product-norman)

Date: 2026-09-06. Live: https://latocurativo-lab.github.io/stipendio-netto/ (200 confermato a inizio ciclo).

## Team di ciclo (regola: 3–5 agent, solo necessari)

- `operations-pg` — protocollo hallway + metric sheet fake-door
- `product-norman` — walkthrough sintetico 5 personas
- `fullstack-dhh` — tracking funnel v2 + `metriche.html` + fix canonical/SEO
- `qa-bach` — re-verify invarianti + DOM + serve + smoke live
- Non convocati: ceo/cfo/munger (GO già dato Cycle 2, hallway è esecuzione).
- `frontend-design.md`: file assente nello skill-repo (glob `frontend*` = 0 risultati).
  Nessun redesign fatto questo ciclo (solo strumentazione + pagina interna con stessi
  design token) → regola #6 non applicabile, documentato qui invece di skippato in silenzio.

## Hallway SINTETICO 5/5 (⚠️ non sono utenti reali — vedi § limiti)

Task protocollo Cycle 4: «offerta 30.000€ RAL, 13 mensilità: quanto al mese?» (atteso: €1.579).

| # | Persona | TTV stimato | «È preciso come busta?» → No/stima? | Intento PDF 9€ | Confusioni |
|---|---------|-------------|--------------------------------------|----------------|------------|
| 1 | Neolaureato 26, mobile, prima offerta 30k | ~10s (chip 30k visibile senza input) | sì (banner STIMA) | debole sì (colloquio) | nessuna |
| 2 | Operaio 41, Android, RAL 24k (Campania) | ~30s (deve editare input) | sì | no (prezzo = barriera) | regione: non nota default Lombardia (F1) |
| 3 | Impiegata 35, 13 vs 14 mensilità | ~20s | sì (FAQ #2) | sì (checklist) | nessuna (segmented chiaro) |
| 4 | Manager 48, desktop, 55k | ~15s | sì (nota commercialista) | no (ha già consulente) | nessuna |
| 5 | Freelance 32, confronto, copia link | ~10s | sì | no | nessuna |

- TTV mediano ~15–20s < 60s → **PASS**, nessuna riorganizzazione mobile (kill-rule non scattata).
- Stima capita 5/5 (banner + ticket «NETTO STIMATO» + FAQ ridondanti) → **PASS** (>2/5 confusi non scattato).
- Intento PDF 2/5 deboli → segnale debole, **nessuna decisione GO/KILL**: si misura su 100 visite reali.

## Friction registrate (non bloccanti, non fixate = niente redesign a metà hallway)

- F1: default Lombardia silenzioso per utenti di altre regioni (delta ~±17€/a Campania vs Lombardia su 30k — trascurabile ma principio). Open: microcopy «default Lombardia» nel label.
- F2 (load-bearing, FIXATA questo ciclo): canonical/sitemap/robots puntavano a `stipendio-netto.pages.dev`
  mai deployato → split-brain SEO. Ora tutto su `latocurativo-lab.github.io/stipendio-netto/`.

## Limiti onesti

- Walkthrough sintetico ≠ 5 utenti reali: TTV è stimato, non cronometrato; intento PDF è inferito.
- Le 100 visite reali restano da portare (canali Cycle 4: Telegram/FB lavoro Milano,
  r/ItaliaPersonalFinance con permesso mod, 3 TikTok/Reels). Senza Plausible configurato
  non c'è analytics server: `metriche.html` + UTM danno conteggi locali + attribuzione
  campagne; il verdict automatico scatta a n≥100 in questo browser solo se facilitatore
  unico — per traffico reale serve Plausible (dominio da configurare) o export aggregati.

## Strumentazione shippata (misurare davvero le 100 visite)

- `netto.js` funnel v2: `sn_funnel_v1` {sessions con UTM/ref, counts, ttv_ms[]} + legacy
  `sn_events` compatibile con sheet Cycle 4. TTV strumentale via `window.__sn_t0` → primo render.
- `metriche.html` (noindex, non in nav/sitemap): KPI funnel, verdict GO/KILL automatico a n≥100,
  tally manuale 5 utenti persistente, tabella sessioni UTM, export JSON.
