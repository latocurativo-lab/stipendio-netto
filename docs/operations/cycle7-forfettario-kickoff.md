# Cycle 7 — operations: kickoff forfettario-netto (solo locale)

Data: 2026-09-06. Agent: operations-pg.

## Fatto
- Scaffold `projects/forfettario-netto/README.md` (locale, BOZZA NON PUBBLICARE):
  riuso template stipendio-netto, checklist copia (index→forfettario.js→metriche+funnel `ff_`),
  15 casi CAF gate <10€/mese, KILL se >2 cicli senza ship.
- **Rispettato NO-NEW-LIVE**: nessun repo, nessun deploy, nessun remote. Solo file locali.
- **Rispettato CREATION-WIP=1**: stipendio-netto è LIVE (maintenance), forfettario entra in
  creazione come unico progetto in Building. Nessuna sovrapposizione di creazione.

## Prossimo (1 solo milestone alla volta)
Spec + 15 casi attesi (coefficienti 40/67/78/86%, soglia 85k, 5%/15%, INPS) PRIMA della UI.
Niente UI prima dello spec. Niente deploy prima di `HUMAN-OK deploy`.
