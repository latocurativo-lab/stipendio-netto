# Cycle 4 — Hallway test kit (operations-pg)

Date: 2026-09-06. Da eseguire appena una URL pubblica è live (Path A o C).

## Protocollo (5 utenti, 10 min ciascuno, non guidare)
Task: «Hai una offerta da 30.000€ RAL con 13 mensilità. Quanto prendi al mese?»
1. Osserva: TTV (tempo al primo numero letto ad alta voce). Target <60s.
2. Chiedi: «È preciso come la tua busta paga?» — risposta corretta attesa:
   «No, è una stima». Se >2/5 sbagliano → banner poco chiaro → iterate copy.
3. Chiedi: «A cosa serve il PDF da 9€?» — intento d'acquisto sì/no + perché.
4. Registra: confusione su mensilità 12/13/14, regione, detrazione.

## Metric sheet (fake-door, decisione GO/KILL PDF)
- Eventi (localStorage `sn_events` + Plausible): `calc` / `cta-click` / `pdf-intent` / `share`.
- Soglie (da README/CFO): KILL PDF → tool gratis se CTR CTA <15% su n≥100
  visite, o conv <1.5% dopo 500 visite. GO se CTR ≥15% e conv ≥1.5%.
- Canali per le prime 100 visite: gruppi Telegram/FB «lavoro Milano», Reddit
  r/ItaliaPersonalFinance (chiedere prima ai mod), 3 video TikTok/Reels
  «30k RAL = quanto al mese?» con link in bio.

## Kill/iterate
- >2/5 confusi sul banner stima → riscrivi banner + FAQ #2 prima di scalare.
- TTV >60s mediano → sposta calcolatore sopra hero su mobile, riduci copy.
