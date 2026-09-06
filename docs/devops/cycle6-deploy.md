# Cycle 6 — Deploy hallway build (devops-hightower)

Date: 2026-09-06. Remote di ship: `live` (`latocurativo-lab/stipendio-netto`, `origin`/MaxMiksa resta 403 — accettato, non bloccante).

## Push

- Commit `b03de95` «Cycle 6 hallway: funnel v2 + metriche + canonical live, synthetic 5/5 PASS»
  (9 file: 4 edit prodotto + `metriche.html` nuova + 3 docs ciclo + `.gitignore` whitelist).
- `git push live HEAD:main` → `19f1296..b03de95`, OK. Workflow `static-pages-fallback`
  triggerato dal path `projects/stipendio-netto/**` (i soli docs non triggererebbero deploy).

## Smoke live (post-deploy) — 9/9 + 404

- `200 /`, `/metriche.html`, `/netto.js`, `/tax-2026.json`, `/robots.txt`, `/sitemap.xml`,
  `/success.html`, `/cancel.html`; `<title>` home + metriche verificati.
- `sitemap.xml` live serve solo URLs `latocurativo-lab.github.io` (fix split-brain confermato in prod).
- Slug inesistente → `404` (pagina branded, status corretto).

## Note operative

- `metriche.html` è deployata ma undiscoverable (noindex, fuori da nav/sitemap): uso facilitatore.
- Prossimo deploy: solo quando ci sono fix guidati da dati reali (F1 o esiti hallway veri),
  per non invalidare la baseline TTV/funnel appena aperta.
