# Cycle 5 — PUSH + LIVE (go-live evidence)

## Live URL
- https://latocurativo-lab.github.io/stipendio-netto/ — HTTP 200, verificato via curl

## Come ci siamo arrivati
- Blocker: `origin` = `MaxMiksa/auto-company` → 403 per l'account autenticato
  `latocurativo-lab` (gh.exe Windows, scope repo+workflow). Stessa Next Action ×2
  cicli → regola #5: shrink scope, ship su repo che controlliamo.
- Fix auth WSL: `git config credential.helper "!'/mnt/c/Program Files/GitHub CLI/gh.exe' auth git-credential"`
  (manca il `!` → git cerca un sottocomando `credential-<helper>` e fallisce).
- `.gitignore`: ripristinata whitelist Cycle 4 (`!projects/stipendio-netto/` + 3 docs),
  rimossa per errore dal working tree dopo il commit 76bcd64. Nessun commit extra
  necessario (working tree = HEAD dopo il restore).
- Nuovo repo pubblico `latocurativo-lab/stipendio-netto` (prodotto shippabile, history pulita
  via push full-branch; il workflow pubblica solo `projects/stipendio-netto/`).
- Remote aggiunto: `live` → `https://github.com/latocurativo-lab/stipendio-netto.git`
  (`origin` resta non pushato — 403, non nostro).
- Pages attivate via API (`POST /pages`, `build_type=workflow`).

## Deploy
- Workflow `static-pages-fallback`: `completed / success` al primo run.
- Smoke live 8/8: `/`, `netto.js`, `tax-2026.json`, `robots.txt`, `sitemap.xml`,
  `success.html`, `cancel.html` → 200; slug inesistente → 404 (pagina branded);
  `<title>` corretto.

## Hallway trigger (prossimo)
- Protocollo pronto in `docs/operations/cycle4-hallway.md`.
- Next: 5 utenti sul live URL → 100 visite → decisione fake-door PDF GO/KILL.
- Bloccanti noti (non per hallway): Stripe Payment Link 9€ reale, 20 buste gate Munger.
