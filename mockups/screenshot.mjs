import puppeteer from 'puppeteer'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/* ── shared design tokens ── */
const T = {
  greenPrimary: '#2D5C34',
  greenLight: '#E8F5E9',
  amber: '#D97706',
  amberLight: '#FEF3C7',
  red: '#C62828',
  redLight: '#FFEBEE',
  pageBg: '#F2F4F3',
  cardBg: '#FFFFFF',
  textPrimary: '#1C1C1E',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  border: '#E5E7EB',
}

/* ── shared chrome (status bar + nav + progress) ── */
const chrome = (progress = 1) => `
  <!-- Status bar -->
  <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px 4px;background:white;">
    <span style="font-size:14px;font-weight:700;color:${T.textPrimary}">9:41</span>
    <div style="display:flex;align-items:center;gap:5px;">
      <svg width="16" height="12" viewBox="0 0 24 18"><path d="M1 1l22 16M5 5.5C9.5 1.5 14.5 1.5 19 5.5" fill="none" stroke="${T.textTertiary}" stroke-width="2.5" stroke-linecap="round"/><path d="M8 9C10.5 6.5 13.5 6.5 16 9" fill="none" stroke="${T.textTertiary}" stroke-width="2.5" stroke-linecap="round"/><circle cx="12" cy="13" r="2" fill="${T.textTertiary}"/></svg>
      <svg width="16" height="12" viewBox="0 0 24 18"><rect x="2" y="6" width="5" height="12" rx="1" fill="${T.textPrimary}"/><rect x="9" y="3" width="5" height="15" rx="1" fill="${T.textPrimary}"/><rect x="16" y="0" width="5" height="18" rx="1" fill="${T.textPrimary}"/></svg>
      <svg width="22" height="12" viewBox="0 0 34 18"><rect x="1" y="2" width="28" height="14" rx="3" fill="none" stroke="${T.textPrimary}" stroke-width="2"/><rect x="3" y="4" width="18" height="10" rx="1.5" fill="${T.textPrimary}"/><rect x="30" y="6" width="3" height="6" rx="1.5" fill="${T.textPrimary}"/></svg>
    </div>
  </div>

  <!-- Nav -->
  <div style="display:flex;align-items:center;padding:4px 12px 8px;gap:6px;background:white;">
    <button style="padding:6px;background:none;border:none;cursor:pointer;margin-left:-4px;flex-shrink:0;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${T.textPrimary}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <button style="display:flex;align-items:center;gap:5px;padding:6px 14px;border-radius:20px;background:${T.greenPrimary};border:1.5px solid ${T.greenPrimary};color:white;font-size:13px;font-weight:600;font-family:inherit;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
      Floor
    </button>
    <button style="display:flex;align-items:center;gap:5px;padding:6px 14px;border-radius:20px;background:white;border:1.5px solid ${T.border};color:${T.textSecondary};font-size:13px;font-weight:600;font-family:inherit;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${T.textSecondary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
      Back
    </button>
    <div style="flex:1;"></div>
    <button style="padding:5px;background:none;border:none;">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${T.textSecondary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-width="2.5"/></svg>
    </button>
    <button style="padding:5px;background:none;border:none;">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${T.textSecondary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    </button>
  </div>

  <!-- Top progress bar -->
  <div style="height:4px;background:${T.border};">
    <div style="height:100%;background:${T.greenPrimary};width:${progress * 100}%;border-radius:0 2px 2px 0;transition:width 0.4s;"></div>
  </div>
`

/* ── nudge card HTML ── */
const nudgeCard = (type, backLoc = '') => {
  const alertIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-width="2.5"/></svg>`
  const xIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${T.textTertiary}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`

  const content = type === 'seldom' ? {
    headline: 'Associates achieving strong results typically fully verify stock on low- and medium-confidence counts.',
    tip: 'Physically checking both the floor display and backroom before confirming the estimate takes ~30 seconds and significantly improves system accuracy over time.',
  } : type === 'decrease' ? {
    headline: 'Significant count decreases on high-confidence Citrus items in this store have been associated with an estimated $240 in waste last month.',
    tip: `Before submitting a lower count, verify the backroom bin (${backLoc}) to ensure no unscanned stock remains. Undercount corrections on high-confidence items can trigger overordering.`,
  } : {
    headline: 'Significant count increases on high-confidence Citrus items in this store have been associated with an estimated $180 in lost sales last month.',
    tip: "Before adding cases above the estimate, confirm the count includes only stock not yet scanned in today's incoming. Overcounting high-confidence items can delay future reorders.",
  }

  return `
    <div style="background:#FFFBEB;border:1.5px solid #FDE68A;border-radius:12px;padding:10px 12px;margin-bottom:10px;position:relative;">
      <div style="position:absolute;top:8px;right:8px;">${xIcon}</div>
      <div style="display:flex;gap:8px;padding-right:22px;">
        <div style="flex-shrink:0;margin-top:1px;">${alertIcon}</div>
        <div style="flex:1;">
          <div style="font-size:11px;font-weight:700;color:#92400E;margin-bottom:3px;">Heads up</div>
          <div style="font-size:11px;color:#78350F;line-height:1.5;margin-bottom:5px;">${content.headline}</div>
          <div style="font-size:11px;font-weight:700;color:${T.amber};text-decoration:underline;text-underline-offset:2px;">Quick tip →</div>
        </div>
      </div>
    </div>
  `
}

/* ── item card snippet (saved state) ── */
const savedItemCard = (name, sku, count, estimateLine, confidenceLabel, confidenceColor, confidenceBg, floorLoc, backLoc) => `
  <div style="background:white;border-radius:14px;margin-bottom:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);border:1.5px solid ${T.greenPrimary};">
    <div style="padding:12px 14px 0;">
      <!-- Name + saved badge -->
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2px;">
        <span style="font-size:15px;font-weight:700;color:${T.textPrimary};flex:1;margin-right:8px;line-height:1.3;">${name}</span>
        <div style="display:flex;align-items:center;gap:4px;background:${T.greenLight};border-radius:20px;padding:3px 9px;flex-shrink:0;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${T.greenPrimary}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span style="font-size:11px;font-weight:700;color:${T.greenPrimary};">Saved</span>
        </div>
      </div>
      <!-- SKU -->
      <div style="font-size:12px;color:${T.textTertiary};margin-bottom:8px;">${sku}</div>
      <!-- Location -->
      <div style="background:#F6F7F8;border-radius:8px;padding:6px 9px;margin-bottom:9px;">
        <div style="display:flex;align-items:center;gap:5px;margin-bottom:3px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${T.textTertiary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span style="font-size:11px;font-weight:600;color:${T.textSecondary};">Floor: ${floorLoc}</span>
        </div>
        <div style="display:flex;align-items:center;gap:5px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${T.textTertiary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          <span style="font-size:11px;font-weight:600;color:${T.textSecondary};">Back: ${backLoc}</span>
        </div>
      </div>
      <!-- Estimate + confidence -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:9px;">
        <span style="font-size:12px;color:${T.textSecondary};">System estimate</span>
        <div style="display:flex;align-items:center;gap:7px;">
          <span style="font-size:16px;font-weight:700;color:${T.textPrimary};letter-spacing:-0.3px;">${estimateLine}</span>
          <span style="font-size:11px;font-weight:700;color:${confidenceColor};background:${confidenceBg};border-radius:20px;padding:2px 8px;">${confidenceLabel}</span>
        </div>
      </div>
      <!-- Stats row -->
      <div style="display:flex;border-top:1px solid ${T.border};padding:9px 0;">
        <div style="flex:1;border-right:1px solid ${T.border};padding-right:10px;">
          <div style="font-size:11px;color:${T.textTertiary};margin-bottom:2px;">Incoming</div>
          <div style="font-size:14px;font-weight:500;color:${T.textPrimary};">0 CS</div>
        </div>
        <div style="flex:1;border-right:1px solid ${T.border};padding:0 10px;">
          <div style="font-size:11px;color:${T.textTertiary};margin-bottom:2px;">Total</div>
          <div style="font-size:14px;font-weight:500;color:${T.textPrimary};">3 CS</div>
        </div>
        <div style="flex:1;padding-left:10px;">
          <div style="font-size:11px;color:${T.textTertiary};margin-bottom:2px;">Display</div>
          <div style="font-size:14px;font-weight:500;color:${T.textPrimary};">3 CS</div>
        </div>
      </div>
    </div>
    <!-- Count row (saved state) -->
    <div style="padding:10px 14px 12px;display:flex;align-items:center;gap:8px;">
      <div style="width:40px;height:40px;border-radius:50%;border:1.5px solid ${T.border};background:white;display:flex;align-items:center;justify-content:center;font-size:22px;color:${T.textPrimary};flex-shrink:0;line-height:1;">−</div>
      <div style="flex:1;position:relative;">
        <div style="width:100%;padding:8px 30px 8px 12px;border-radius:10px;border:1.5px solid ${T.greenPrimary};background:${T.greenLight};font-size:18px;font-weight:700;color:${T.greenPrimary};text-align:center;box-sizing:border-box;">${count}</div>
        <span style="position:absolute;right:9px;top:50%;transform:translateY(-50%);font-size:11px;font-weight:700;color:${T.greenPrimary};">CS</span>
      </div>
      <div style="width:40px;height:40px;border-radius:50%;border:1.5px solid ${T.border};background:white;display:flex;align-items:center;justify-content:center;font-size:22px;color:${T.textPrimary};flex-shrink:0;line-height:1;">+</div>
      <div style="padding:10px 16px;border-radius:10px;flex-shrink:0;background:${T.greenLight};color:${T.greenPrimary};font-size:14px;font-weight:700;display:flex;align-items:center;gap:5px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${T.greenPrimary}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Saved
      </div>
    </div>
  </div>
`

/* ── category header + progress bar ── */
const categoryHeader = (savedCount, total) => `
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
    <span style="font-size:17px;font-weight:700;color:${T.textPrimary};letter-spacing:-0.3px;">Today's categories</span>
    <button style="display:flex;align-items:center;gap:5px;padding:6px 12px;border-radius:20px;border:1.5px solid ${T.border};background:white;font-size:13px;font-weight:600;color:${T.textSecondary};font-family:inherit;">
      To Do ${total - savedCount}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
  </div>
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;padding:0;">
    <div style="display:flex;align-items:baseline;gap:8px;">
      <span style="font-size:15px;font-weight:700;color:${T.textPrimary};">Citrus Fruits</span>
      <span style="font-size:12px;color:${T.textSecondary};">${savedCount}/${total} scanned</span>
    </div>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${T.textTertiary}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
  </div>
  <div style="height:3px;background:${T.border};border-radius:4px;margin-bottom:10px;overflow:hidden;">
    <div style="height:100%;background:${T.greenPrimary};width:${(savedCount / total) * 100}%;border-radius:4px;"></div>
  </div>
`

/* ── full page HTML ── */
const page = (title, bodyContent, progressFraction) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=360">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', -apple-system, sans-serif; background: #1A1A1A; width: 360px; height: 640px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
    #frame { width: 360px; height: 640px; background: white; display: flex; flex-direction: column; position: relative; overflow: hidden; }
    button { cursor: pointer; font-family: inherit; border: none; background: none; }
  </style>
</head>
<body>
  <div id="frame">
    ${chrome(progressFraction)}
    <div style="flex:1;overflow:hidden;padding:12px 14px;background:${T.pageBg};">
      ${bodyContent}
    </div>
  </div>
</body>
</html>`

/* ── nudge 1: seldom (limes, medium conf, saved at estimate 4) ── */
const nudge1Body = `
  ${categoryHeader(1, 3)}
  ${nudgeCard('seldom')}
  ${savedItemCard(
    'Limes (each)', '23985001', 4,
    '4 CS', 'Medium confidence', T.amber, '#FEF3C7',
    'Citrus Table, Aisle 10 (Produce)', 'PR-CLR-A03-S2'
  )}
`

/* ── nudge 2: decrease (oranges, high conf, count 1 vs estimate 6) ── */
const nudge2Body = `
  ${categoryHeader(1, 3)}
  ${nudgeCard('decrease', 'PR-CTR-A03-S1')}
  ${savedItemCard(
    'Navel Oranges (each)', '23985012', 1,
    '6 CS', 'High confidence', T.greenPrimary, T.greenLight,
    'Citrus Table', 'PR-CTR-A03-S1'
  )}
`

/* ── nudge 3: increase (oranges, high conf, count 14 vs estimate 6) ── */
const nudge3Body = `
  ${categoryHeader(1, 3)}
  ${nudgeCard('increase')}
  ${savedItemCard(
    'Navel Oranges (each)', '23985012', 14,
    '6 CS', 'High confidence', T.greenPrimary, T.greenLight,
    'Citrus Table', 'PR-CTR-A03-S1'
  )}
`

const mockups = [
  { name: 'nudge-1-seldom',   html: page('Nudge: Seldom adjusting',    nudge1Body, 1/3) },
  { name: 'nudge-2-decrease', html: page('Nudge: Unusual decrease',     nudge2Body, 1/3) },
  { name: 'nudge-3-increase', html: page('Nudge: Unusual increase',     nudge3Body, 1/3) },
]

for (const m of mockups) {
  writeFileSync(path.join(__dirname, `${m.name}.html`), m.html)
}

/* ── screenshot ── */
const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  defaultViewport: { width: 360, height: 640, deviceScaleFactor: 2 },
})

for (const m of mockups) {
  const pg = await browser.newPage()
  await pg.goto(`file://${path.join(__dirname, m.name + '.html')}`, { waitUntil: 'networkidle0' })
  await pg.screenshot({ path: path.join(__dirname, `${m.name}.png`), clip: { x: 0, y: 0, width: 360, height: 640 } })
  await pg.close()
  console.log(`✓ ${m.name}.png`)
}

await browser.close()
console.log('done')
