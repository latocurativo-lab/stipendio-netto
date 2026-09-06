/* stipendio-netto — netto.js | tax-2026.json driven, pure calc for QA
 * Gate Munger: nessuna logica fiscale hardcodata qui; tutto da tax-2026.json versionato.
 * Pricing: STRIPE_LINK placeholder → sostituire con Payment Link reale 9€ (d1-14), poi A/B 9 vs 12.
 */
'use strict';

const STRIPE_LINK = 'https://buy.stripe.com/PLACEHOLDER_9EUR'; // TODO(cfo): Payment Link reale 9€
const TAX_VERSION_REQUIRED = null; // null = accetta versione caricata, mostra banner sempre

async function loadTax() {
  const r = await fetch('./tax-2026.json', { cache: 'no-store' });
  if (!r.ok) throw new Error('tax-2026.json non caricato');
  return r.json();
}

function irpefLorda(imponibile, brackets) {
  let t = 0, prev = 0;
  for (const b of brackets) {
    if (imponibile <= prev) break;
    const q = Math.min(imponibile, b.up_to) - prev;
    t += q * b.rate;
    prev = b.up_to;
  }
  return t;
}

function detrazioneLavoroDip(imponibile, d) {
  if (imponibile <= d.phase_out_start) return d.max;
  if (imponibile >= d.phase_out_end) return 0;
  return Math.round(d.max * (d.phase_out_end - imponibile) / (d.phase_out_end - d.phase_out_start));
}

/* Funzione pura — usata da UI e da QA (20 buste). Ritorna valori arrotondati € interi salvo mese. */
function calcPure(ral, mens, regRate, comRate, TAX) {
  ral = Math.max(0, Number(ral) || 0);
  mens = [12, 13, 14].includes(Number(mens)) ? Number(mens) : (TAX.mensilita_default || 13);
  regRate = Math.max(0, Number(regRate) || 0);
  comRate = Math.max(0, Number(comRate) || 0);
  const inps = Math.min(ral, TAX.inps_cap) * TAX.inps_rate;
  const imponibile = Math.max(0, ral - inps);
  const lorda = irpefLorda(imponibile, TAX.irpef_brackets);
  const det = detrazioneLavoroDip(imponibile, TAX.detrazioni);
  const netta = Math.max(0, lorda - det);
  const addReg = imponibile * regRate;
  const addCom = imponibile * comRate;
  const sconto = TAX.cuneo && TAX.cuneo.sconto ? TAX.cuneo.sconto : 0;
  const nettoAnnuo = ral - inps - netta - addReg - addCom - sconto;
  const mese = nettoAnnuo / mens;
  return {
    ral: Math.round(ral), mens,
    inps: Math.round(inps), imponibile: Math.round(imponibile),
    irpefLorda: Math.round(lorda), detrazione: det, irpefNetta: Math.round(netta),
    addReg: Math.round(addReg), addCom: Math.round(addCom),
    nettoAnnuo: Math.round(nettoAnnuo), mese: Math.round(mese * 100) / 100,
    ver: TAX.meta.version
  };
}

// Espone per QA script (node) senza rompere browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calcPure, irpefLorda, detrazioneLavoroDip, loadTax, STRIPE_LINK };
}
if (typeof window !== 'undefined') window.__calcPure = calcPure;

const fmtEUR = (n, dec = 0) =>
  (Number(n) || 0).toLocaleString('it-IT', { minimumFractionDigits: dec, maximumFractionDigits: dec });

/* Funnel fake-door v2 (zero-backend, privacy-first, QA-safe: calcPure invariato).
 * - legacy `sn_events` mantenuto per compatibilità (Cycle 4 sheet).
 * - `sn_funnel_v1`: { sessions:{sid:{first_seen,utm_source,utm_medium,utm_campaign,ref}}, counts:{calc,cta-click,pdf-intent,share}, ttv_ms:[...last 50] }
 * - TTV = ms da window.__sn_t0 (head) al primo render del numero. Proxy strumentale
 *   del TTV hallway (lettura ad alta voce); la misura umana resta nel protocollo.
 */
const SN_FUNNEL_KEY = 'sn_funnel_v1';

function snSession() {
  try {
    let f = JSON.parse(localStorage.getItem(SN_FUNNEL_KEY) || '{}');
    if (!f.sessions) f.sessions = {};
    if (!f.counts) f.counts = {};
    let sid = null;
    try { sid = sessionStorage.getItem('sn_sid'); } catch (_) { sid = null; }
    if (!sid || !f.sessions[sid]) {
      sid = 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      try { sessionStorage.setItem('sn_sid', sid); } catch (_) { /* no-op */ }
      const q = new URLSearchParams(location.search);
      f.sessions[sid] = {
        first_seen: new Date().toISOString(),
        utm_source: q.get('utm_source') || '',
        utm_medium: q.get('utm_medium') || '',
        utm_campaign: q.get('utm_campaign') || '',
        ref: (document.referrer || '').slice(0, 120)
      };
      // cap sessions a 200 (localStorage hygiene)
      const ids = Object.keys(f.sessions);
      if (ids.length > 200) ids.slice(0, ids.length - 200).forEach(id => delete f.sessions[id]);
      localStorage.setItem(SN_FUNNEL_KEY, JSON.stringify(f));
    }
    return { f, sid };
  } catch (_) { return { f: null, sid: null }; }
}

function markTTV() {
  try {
    if (window.__sn_ttv_done) return;
    window.__sn_ttv_done = true;
    const t0 = window.__sn_t0 || Date.now();
    const ms = Math.max(0, Date.now() - t0);
    const { f } = snSession();
    if (!f) return;
    f.ttv_ms = (f.ttv_ms || []).concat([ms]).slice(-50);
    localStorage.setItem(SN_FUNNEL_KEY, JSON.stringify(f));
  } catch (_) { /* no-op */ }
}

function track(evt) {
  try {
    if (window.plausible) window.plausible(evt);
    // legacy compat (Cycle 4 sheet legge sn_events)
    const k = 'sn_events';
    const log = JSON.parse(localStorage.getItem(k) || '{}');
    log[evt] = (log[evt] || 0) + 1;
    localStorage.setItem(k, JSON.stringify(log));
    // funnel v2
    const { f } = snSession();
    if (f) {
      f.counts[evt] = (f.counts[evt] || 0) + 1;
      localStorage.setItem(SN_FUNNEL_KEY, JSON.stringify(f));
    }
    if (evt === 'cta-click') {
      const c = JSON.parse(localStorage.getItem('sn_cta') || '{"n":0}');
      c.n += 1; c.last = new Date().toISOString();
      localStorage.setItem('sn_cta', JSON.stringify(c));
    }
  } catch (_) { /* no-op */ }
}

let TAX = null;

function readInputs() {
  const ral = parseFloat(document.getElementById('ral').value) || 0;
  const mensBtn = document.querySelector('[data-mens].on');
  const mens = mensBtn ? parseInt(mensBtn.dataset.mens, 10) : 13;
  const regSel = document.getElementById('regione');
  const regRate = regSel ? parseFloat(regSel.value) : TAX.addizionali.regione_default;
  const comRate = TAX.addizionali.comune_default;
  return { ral, mens, regRate, comRate };
}

function render(out) {
  markTTV();
  const meseEl = document.getElementById('mese');
  meseEl.textContent = '€ ' + fmtEUR(out.mese, out.mese % 1 ? 2 : 0);
  document.getElementById('netto-annuo').textContent = '€ ' + fmtEUR(out.nettoAnnuo);
  document.getElementById('mens-label').textContent = out.mens + ' mensilità';
  document.getElementById('ver').textContent = out.ver;
  const v2 = document.getElementById('ver2'); if (v2) v2.textContent = out.ver;
  const rows = [
    ['RAL', out.ral], ['INPS 9,19%', -out.inps],
    ['Imponibile IRPEF', out.imponibile], ['IRPEF lorda', -out.irpefLorda],
    ['Detrazione lavoro dip.', '+' + fmtEUR(out.detrazione)], ['IRPEF netta', -out.irpefNetta],
    ['Add. regionale', -out.addReg], ['Add. comunale', -out.addCom]
  ];
  document.getElementById('righe').innerHTML = rows.map(([k, v]) =>
    `<div class="riga"><span>${k}</span><strong>${typeof v === 'string' ? (v.startsWith('+') || v.startsWith('€') ? v : '€ ' + v) : (v < 0 ? '−€ ' + fmtEUR(-v) : '€ ' + fmtEUR(v))}</strong></div>`
  ).join('');
  // stacked bar: quote su RAL
  const tot = Math.max(1, out.ral);
  const segs = [
    ['netto', out.nettoAnnuo, 'b-netto'], ['irpef', out.irpefNetta, 'b-irpef'],
    ['inps', out.inps, 'b-inps'], ['add', out.addReg + out.addCom, 'b-add']
  ];
  document.getElementById('barra').innerHTML = segs.map(([k, v, c]) =>
    `<div class="${c}" style="flex:${Math.max(0.5, v / tot * 100)}" title="${k}: €${fmtEUR(v)}"></div>`
  ).join('');
  document.getElementById('legenda').innerHTML =
    `<span><i class="dot b-netto"></i>Netto €${fmtEUR(out.nettoAnnuo)}</span>` +
    `<span><i class="dot b-irpef"></i>IRPEF €${fmtEUR(out.irpefNetta)}</span>` +
    `<span><i class="dot b-inps"></i>INPS €${fmtEUR(out.inps)}</span>` +
    `<span><i class="dot b-add"></i>Add. €${fmtEUR(out.addReg + out.addCom)}</span>`;
  window._calc = out;
}

async function recalc() {
  if (!TAX) return;
  try {
    const { ral, mens, regRate, comRate } = readInputs();
    render(calcPure(ral, mens, regRate, comRate, TAX));
    track('calc');
    const u = new URL(location.href);
    u.searchParams.set('ral', Math.round(ral)); u.searchParams.set('mens', mens);
    history.replaceState(null, '', u.toString());
  } catch (e) { console.error(e); }
}

function wireStatic() {
  // Plausible: inject tracker only when a real domain is configured (avoids TBD pings)
  try {
    const d = (typeof window !== 'undefined' && window.PLAUSIBLE_DOMAIN) || '';
    if (d && !document.querySelector('script[data-plausible]')) {
      const s = document.createElement('script');
      s.defer = true; s.setAttribute('data-plausible', '1');
      s.dataset.domain = d; s.src = 'https://plausible.io/js/script.js';
      document.head.appendChild(s);
    }
  } catch (_) { /* no-op */ }
  document.getElementById('stripe-link').href = STRIPE_LINK;
  document.getElementById('stripe-link-2').href = STRIPE_LINK;
  // mensilità segmented
  document.querySelectorAll('[data-mens]').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('[data-mens]').forEach(x => x.classList.remove('on'));
    b.classList.add('on'); recalc();
  }));
  // modal fake-door
  const m = document.getElementById('modal');
  const open = () => { m.classList.add('open'); track('cta-click'); };
  const close = () => m.classList.remove('open');
  document.getElementById('cta').addEventListener('click', open);
  document.getElementById('cta-hero').addEventListener('click', open);
  m.addEventListener('click', e => { if (e.target === m || e.target.dataset.close) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  document.getElementById('buy').addEventListener('click', () => {
    track('pdf-intent');
    window.open(STRIPE_LINK, '_blank', 'noopener');
  });
  document.getElementById('copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(location.href); track('share'); } catch (_) {}
    document.getElementById('copy').textContent = 'Link copiato ✓';
    setTimeout(() => document.getElementById('copy').textContent = 'Copia link risultato', 1500);
  });
}

if (typeof document !== 'undefined') {
document.addEventListener('DOMContentLoaded', async () => {
  wireStatic();
  TAX = await loadTax();
  // popola select regioni
  const sel = document.getElementById('regione');
  const regs = TAX.addizionali.regioni || {};
  sel.innerHTML = Object.entries(regs).map(([n, r]) =>
    `<option value="${r}"${n === 'Lombardia' ? '' : ''}>${n} · ${(r * 100).toFixed(2).replace('.', ',')}%</option>`
  ).join('');
  sel.value = TAX.addizionali.regioni['Lombardia'] ?? TAX.addizionali.regione_default;
  document.getElementById('taxmeta').textContent =
    `${TAX.meta.version} · ultimo check ${TAX.meta.last_check}`;
  const tm2 = document.getElementById('taxmeta2');
  if (tm2) tm2.textContent = `${TAX.meta.version} · ultimo check ${TAX.meta.last_check}`;
  // URL params (?ral=&mens=) — NO ?paid=1 bypass: nessun unlock client-side esiste
  const q = new URLSearchParams(location.search);
  if (q.get('ral')) document.getElementById('ral').value = q.get('ral');
  const mq = q.get('mens');
  if (['12', '13', '14'].includes(mq)) {
    document.querySelectorAll('[data-mens]').forEach(x => x.classList.toggle('on', x.dataset.mens === mq));
  }
  ['ral'].forEach(id => document.getElementById(id).addEventListener('input', recalc));
  sel.addEventListener('change', recalc);
  // RAL slider sync
  const range = document.getElementById('ral-range');
  const num = document.getElementById('ral');
  range.addEventListener('input', () => { num.value = range.value; recalc(); });
  num.addEventListener('input', () => {
    const v = Math.min(150000, Math.max(0, parseFloat(num.value) || 0));
    range.value = Math.min(100000, v);
  });
  await recalc();
});
} // end DOM guard
