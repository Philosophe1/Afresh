import { useState } from 'react'
import StatusBar from '../components/StatusBar'

/* ── Icons ── */
const BackArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)
const CheckIcon = ({ size = 12, color = 'var(--green-primary)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-tertiary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const MapPinIcon = ({ color = 'var(--text-tertiary)' }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)
const BoxIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>
)
const BarcodeIcon = ({ color = 'var(--green-primary)' }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9V5a2 2 0 0 1 2-2h4"/><path d="M15 3h4a2 2 0 0 1 2 2v4"/>
    <path d="M21 15v4a2 2 0 0 1-2 2h-4"/><path d="M9 21H5a2 2 0 0 1-2-2v-4"/>
    <line x1="7" y1="8" x2="7" y2="16"/><line x1="10" y1="8" x2="10" y2="16"/>
    <line x1="13" y1="8" x2="13" y2="16"/><line x1="17" y1="8" x2="17" y2="16"/>
  </svg>
)
const NudgeAlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5"/>
  </svg>
)
const ChatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)
const FloorTabIcon = ({ color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
  </svg>
)
const BackTabIcon = ({ color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
)

/* ── Data ── */
const CONFIDENCE = {
  high:   { label: 'High confidence',   color: 'var(--green-primary)', bg: 'var(--green-light)' },
  medium: { label: 'Medium confidence', color: 'var(--amber)',         bg: '#FEF3C7' },
  low:    { label: 'Low confidence',    color: 'var(--red)',           bg: '#FFEBEE' },
}

const REASONS = [
  'New endcap/display',
  'Miscount yesterday',
  'Damage/spoilage',
  'Recent truck arrival',
  'Backroom stock higher/lower than expected',
  'Other',
]

const SIGNIFICANT_DIFF = 2

const LOWS_CATALOG = [
  {
    id: 'strawberries',
    name: 'Strawberries (pkg)',
    sku: '23984001',
    unit: 'pkg',
    unitPrice: 3.99,
    display: 2,
    systemEstimate: 8,
    confidence: 'high',
    floorLocs: ['Main Berry Table', 'Endcap 12 (Strawberries)'],
    backLoc: 'PR-BRY-A01-S1',
  },
  {
    id: 'blueberries',
    name: 'Blueberries (pkg)',
    sku: '23984002',
    unit: 'pkg',
    unitPrice: 4.49,
    display: 1,
    systemEstimate: 4,
    confidence: 'medium',
    floorLocs: ['Main Berry Table'],
    backLoc: 'PR-BRY-A01-S2',
  },
  {
    id: 'raspberries',
    name: 'Raspberries (pkg)',
    sku: '23984003',
    unit: 'pkg',
    unitPrice: 4.99,
    display: 0,
    systemEstimate: 3,
    confidence: 'low',
    floorLocs: ['Main Berry Table'],
    backLoc: 'PR-BRY-A01-S3',
  },
]

/* ── Nudge card ── */
function NudgeCard({ nudge, onDismiss }) {
  const [tipOpen, setTipOpen] = useState(false)
  const floorLocStr = Array.isArray(nudge.floorLocs) ? nudge.floorLocs.join(', ') : nudge.floorLoc || ''

  const content = nudge.type === 'seldom' ? {
    headline: 'Associates achieving strong results typically fully verify stock on low- and medium-confidence counts.',
    tip: nudge.locationView === 'floor'
      ? `Physically checking floor display (${floorLocStr}) before confirming the estimate takes ~30 seconds and helps maximize sales and minimize waste.`
      : `Physically checking back bin (${nudge.backLoc}) before confirming the estimate takes ~45 seconds and helps maximize sales and minimize waste.`,
  } : nudge.type === 'decrease' ? {
    headline: 'Significant count decreases on high-confidence Berry items in this store have been associated with an estimated $180 in waste last month.',
    tip: nudge.locationView === 'floor'
      ? `Before submitting a significantly lower count, verify floor display (${floorLocStr}) to ensure no unscanned stock remains. Undercounts on high-confidence items can trigger overordering.`
      : `Before submitting a significantly lower count, verify back bin (${nudge.backLoc}) to ensure no unscanned stock remains. Undercounts on high-confidence items can trigger overordering.`,
  } : {
    headline: 'Significant count increases on high-confidence Berry items in this store have been associated with an estimated $150 in lost sales last month.',
    tip: "Before adding items above the estimate, confirm the count includes only stock not yet scanned in today's incoming. Overcounting high-confidence items can delay future reorders.",
  }

  return (
    <div style={{
      background: '#FFFBEB', border: '1.5px solid #FDE68A',
      borderRadius: 12, padding: '10px 12px', marginBottom: 10,
      position: 'relative',
    }}>
      <button onClick={onDismiss} style={{ position: 'absolute', top: 8, right: 8, padding: 3 }}>
        <XIcon />
      </button>
      <div style={{ display: 'flex', gap: 8, paddingRight: 22 }}>
        <div style={{ flexShrink: 0, marginTop: 1 }}><NudgeAlertIcon /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#92400E', marginBottom: 3 }}>Heads up</div>
          <div style={{ fontSize: 13, color: '#78350F', lineHeight: 1.5, marginBottom: tipOpen ? 8 : 5 }}>
            {content.headline}
          </div>
          {!tipOpen ? (
            <button onClick={() => setTipOpen(true)} style={{
              fontSize: 13, fontWeight: 700, color: 'var(--amber)',
              textDecoration: 'underline', textUnderlineOffset: 2,
            }}>Quick tip →</button>
          ) : (
            <div style={{
              background: 'rgba(255,255,255,0.65)', borderRadius: 8, padding: '7px 9px',
              fontSize: 13, color: '#92400E', lineHeight: 1.5,
            }}>{content.tip}</div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Feedback sheet ── */
function FeedbackSheet({ onClose }) {
  const [selected, setSelected] = useState(null)
  const [details, setDetails]   = useState('')
  const [done, setDone]         = useState(false)
  const OPTIONS = ['Estimate seems off', 'Wrong location info', 'Missing product data', 'Timing issue', 'Other']

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'flex-end',
    }}>
      <div style={{
        width: '100%', background: 'white', borderRadius: '16px 16px 0 0',
        padding: '16px 16px 20px', boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
      }}>
        {done ? (
          <div style={{ textAlign: 'center', padding: '10px 0 6px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
              <CheckIcon size={28} color="var(--green-primary)" />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Feedback received</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 18 }}>
              Thanks! Your input helps improve future recommendations.
            </div>
            <button onClick={onClose} style={{
              padding: '12px 32px', borderRadius: 22,
              background: 'var(--green-primary)', color: 'white', fontSize: 14, fontWeight: 700,
            }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Share feedback</span>
              <button onClick={onClose} style={{ padding: 4 }}><XIcon /></button>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.5 }}>
              Helps improve future recommendations and may be surfaced back to you.
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14 }}>
              {OPTIONS.map(opt => (
                <button key={opt} onClick={() => setSelected(s => s === opt ? null : opt)} style={{
                  padding: '7px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                  border: `1.5px solid ${selected === opt ? 'var(--green-primary)' : 'var(--border)'}`,
                  background: selected === opt ? 'var(--green-light)' : 'white',
                  color: selected === opt ? 'var(--green-primary)' : 'var(--text-secondary)',
                }}>{opt}</button>
              ))}
            </div>
            <textarea placeholder="Add details (optional)" value={details}
              onChange={e => setDetails(e.target.value)} rows={2}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: 10,
                border: '1.5px solid var(--border)', fontSize: 13,
                color: 'var(--text-primary)', resize: 'none', marginBottom: 12,
                fontFamily: 'inherit', outline: 'none',
              }}
            />
            <button onClick={() => setDone(true)} disabled={!selected} style={{
              width: '100%', padding: '13px', borderRadius: 22,
              background: selected ? 'var(--green-primary)' : '#E5E7EB',
              color: selected ? 'white' : 'var(--text-tertiary)',
              fontSize: 14, fontWeight: 700,
            }}>Submit feedback</button>
          </>
        )}
      </div>
    </div>
  )
}

/* ── Scan sheet ── */
function ScanSheet({ scannedItem, onConfirm, onClose }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'flex-end',
    }}>
      <div style={{
        width: '100%', background: 'white', borderRadius: '16px 16px 0 0',
        padding: '16px 16px 24px', boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Scan item</span>
          <button onClick={onClose} style={{ padding: 4 }}><XIcon /></button>
        </div>

        {/* Viewfinder — shows scanned barcode */}
        <div style={{
          background: '#111827', borderRadius: 12, height: 78,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 12, position: 'relative', overflow: 'hidden',
        }}>
          {[['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, h]) => (
            <div key={`${v}${h}`} style={{
              position: 'absolute', [v]: 10, [h]: 10,
              width: 18, height: 18,
              borderTop: v === 'top' ? '2.5px solid #4ade80' : 'none',
              borderBottom: v === 'bottom' ? '2.5px solid #4ade80' : 'none',
              borderLeft: h === 'left' ? '2.5px solid #4ade80' : 'none',
              borderRight: h === 'right' ? '2.5px solid #4ade80' : 'none',
              borderRadius: v === 'top' && h === 'left' ? '3px 0 0 0'
                : v === 'top' && h === 'right' ? '0 3px 0 0'
                : v === 'bottom' && h === 'left' ? '0 0 0 3px' : '0 0 3px 0',
            }} />
          ))}
          {/* Scan result line */}
          <div style={{ position: 'absolute', left: 28, right: 28, height: 2, background: '#4ade80', opacity: 0.8 }} />
          {/* SKU label */}
          <div style={{
            position: 'absolute', bottom: 8,
            background: 'rgba(74,222,128,0.15)', borderRadius: 4, padding: '2px 8px',
          }}>
            <span style={{ color: '#4ade80', fontSize: 11, fontWeight: 700, letterSpacing: '1px' }}>
              {scannedItem.sku}
            </span>
          </div>
        </div>

        {/* Identified item */}
        <div style={{
          background: 'var(--green-light)', borderRadius: 12, padding: '12px 14px', marginBottom: 14,
          border: '1.5px solid var(--green-primary)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--green-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <CheckIcon size={16} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--green-primary)', marginBottom: 2 }}>Item identified</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{scannedItem.name}</div>
          </div>
        </div>

        <button onClick={onConfirm} style={{
          width: '100%', padding: '13px', borderRadius: 12,
          background: 'var(--green-primary)', color: 'white',
          fontSize: 14, fontWeight: 700,
        }}>
          Confirm scan
        </button>
      </div>
    </div>
  )
}

/* ── Location sheet ── */
function LocationSheet({ item, onSelect, onClose }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'flex-end',
    }}>
      <div style={{
        width: '100%', background: 'white', borderRadius: '16px 16px 0 0',
        padding: '16px 16px 24px', boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Where did you scan this?</span>
          <button onClick={onClose} style={{ padding: 4 }}><XIcon /></button>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>{item.name}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {item.floorLocs.map(loc => (
            <button key={loc} onClick={() => onSelect(loc)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '13px 14px', borderRadius: 12,
              border: '1.5px solid var(--border)', background: '#F9FAFB',
              textAlign: 'left',
            }}>
              <MapPinIcon color="var(--green-primary)" />
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{loc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Item card ── */
function LowsItemCard({ item, state, locationView, onSave, onEdit, onCount, onReason, nudged }) {
  const conf = CONFIDENCE[item.confidence]
  const locEstimate = locationView === 'floor' ? item.display : item.systemEstimate
  const diff = Math.abs(state.count - locEstimate)
  const significantDiff = diff >= Math.max(SIGNIFICANT_DIFF, locEstimate * 0.10)
  const unit = item.unit || 'pkg'

  if (state.saved) {
    return (
      <div style={{
        background: 'white', borderRadius: 14, marginBottom: 10,
        boxShadow: 'var(--shadow-sm)',
        border: `1.5px solid ${nudged ? '#FDE68A' : 'var(--green-primary)'}`,
        padding: '12px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{item.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <CheckIcon size={12} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--green-primary)' }}>
              Saved · {state.count} {unit}
            </span>
          </div>
        </div>
        <button onClick={onEdit} style={{
          fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)',
          padding: '7px 14px', borderRadius: 20,
          border: '1.5px solid var(--border)', background: 'white',
        }}>Edit</button>
      </div>
    )
  }

  return (
    <div style={{
      background: 'white', borderRadius: 14, marginBottom: 10,
      overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
      border: '1.5px solid var(--border)',
    }}>
      <div style={{ padding: '12px 14px 0' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2, lineHeight: 1.3 }}>
          {item.name}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8 }}>{item.sku}</div>

        {/* Location */}
        <div style={{ background: '#F6F7F8', borderRadius: 8, padding: '6px 9px', marginBottom: 9 }}>
          {locationView === 'floor' ? (
            item.floorLocs.map((loc, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 5,
                marginBottom: i < item.floorLocs.length - 1 ? 4 : 0,
              }}>
                <MapPinIcon />
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>{loc}</span>
              </div>
            ))
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <BoxIcon />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>{item.backLoc}</span>
            </div>
          )}
        </div>

        {/* Estimate */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 9, paddingBottom: 9 }}>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 3 }}>
            {locationView === 'floor' ? 'Display' : 'Total'}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: conf.color, lineHeight: 1.3, marginBottom: 3 }}>
            {conf.label} est.
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>
            {locEstimate} {unit}
          </div>
        </div>
      </div>

      {/* Count controls */}
      <div style={{ padding: '10px 14px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Your count</span>
          {locationView === 'floor' && (
            <span style={{
              fontSize: 11, fontWeight: 700,
              color: conf.color, background: conf.bg,
              borderRadius: 20, padding: '2px 8px',
            }}>Display count</span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: significantDiff ? 10 : 0 }}>
          <button onClick={() => onCount(Math.max(0, state.count - 1))} style={{
            width: 40, height: 40, borderRadius: '50%',
            border: '1.5px solid var(--border)', background: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, color: 'var(--text-primary)', flexShrink: 0, lineHeight: 1,
          }}>−</button>

          <div style={{ flex: 1, position: 'relative' }}>
            <input type="number" min="0" value={state.count}
              onChange={e => { const v = parseInt(e.target.value, 10); onCount(isNaN(v) || v < 0 ? 0 : v) }}
              style={{
                width: '100%', padding: '8px 30px 8px 12px',
                borderRadius: 10, border: '1.5px solid var(--border)',
                background: 'white', fontSize: 18, fontWeight: 700,
                color: 'var(--text-primary)', textAlign: 'center', outline: 'none',
              }}
            />
            <span style={{
              position: 'absolute', right: 9, top: '50%', transform: 'translateY(-50%)',
              fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', pointerEvents: 'none',
            }}>{unit}</span>
          </div>

          <button onClick={() => onCount(state.count + 1)} style={{
            width: 40, height: 40, borderRadius: '50%',
            border: '1.5px solid var(--border)', background: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, color: 'var(--text-primary)', flexShrink: 0, lineHeight: 1,
          }}>+</button>

          <button onClick={onSave} style={{
            padding: '10px 16px', borderRadius: 10, flexShrink: 0,
            background: 'var(--green-primary)', color: 'white',
            fontSize: 14, fontWeight: 700,
          }}>Save</button>
        </div>

        {significantDiff && (
          <div style={{ background: '#FAFAFA', borderRadius: 10, padding: '9px 10px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 7 }}>
              Reason for adjustment (helps improve system){' '}
              <span style={{ fontWeight: 400, color: 'var(--text-tertiary)' }}>– Optional</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {REASONS.map(r => (
                <button key={r} onClick={() => onReason(r === state.reason ? null : r)} style={{
                  padding: '5px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                  border: `1.5px solid ${state.reason === r ? 'var(--amber)' : 'var(--border)'}`,
                  background: state.reason === r ? '#FEF3C7' : 'white',
                  color: state.reason === r ? 'var(--amber)' : 'var(--text-secondary)',
                }}>{r}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const SCAN_SEQUENCE = ['strawberries', 'raspberries', 'blueberries']

/* ── Main screen ── */
export default function LowsScreen({ onBack, onDone }) {
  const [locationView, setLocationView] = useState('floor')
  const [floorSubmitted, setFloorSubmitted] = useState(false)
  const [scannedItemIds, setScannedItemIds] = useState([])
  const [scanCount, setScanCount] = useState(0)
  const [itemStates, setItemStates] = useState({})
  const [scanSheet, setScanSheet] = useState(false)
  const [locationSheet, setLocationSheet] = useState(null)
  const [nudge, setNudge] = useState(null)
  const [feedbackOpen, setFeedbackOpen] = useState(false)

  const scannedItems = LOWS_CATALOG.filter(i => scannedItemIds.includes(i.id))
  const hasItems = scannedItemIds.length > 0
  const nextScanItem = scanCount < SCAN_SEQUENCE.length
    ? LOWS_CATALOG.find(i => i.id === SCAN_SEQUENCE[scanCount])
    : null

  const getViewState    = id => itemStates[id]?.[locationView]
  const updateViewState = (id, patch) => setItemStates(prev => ({
    ...prev,
    [id]: { ...prev[id], [locationView]: { ...prev[id][locationView], ...patch } },
  }))

  const handleScanConfirm = () => {
    setScanSheet(false)
    setLocationSheet({ item: nextScanItem })
  }

  const handleLocationSelect = loc => {
    const item = locationSheet.item
    setScanCount(prev => prev + 1)
    setScannedItemIds(prev => [...prev, item.id])
    setItemStates(prev => ({
      ...prev,
      [item.id]: {
        floor: { count: item.display, saved: false, reason: null, scannedAt: loc },
        back:  { count: item.systemEstimate, saved: false, reason: null },
      },
    }))
    setLocationSheet(null)
  }

  const handleSave = id => {
    const st = getViewState(id)
    const item = LOWS_CATALOG.find(i => i.id === id)
    const locEstimate = locationView === 'floor' ? item.display : item.systemEstimate
    const diff = Math.abs(st.count - locEstimate)
    const isSignificant = diff >= Math.max(SIGNIFICANT_DIFF, locEstimate * 0.10)

    updateViewState(id, { saved: true })

    if ((item.confidence === 'medium' || item.confidence === 'low') && diff === 0) {
      setNudge({ type: 'seldom', itemId: id, floorLocs: item.floorLocs, backLoc: item.backLoc, locationView })
    } else if (item.confidence === 'high' && isSignificant) {
      setNudge({
        type: st.count < locEstimate ? 'decrease' : 'increase',
        itemId: id, floorLocs: item.floorLocs, backLoc: item.backLoc, locationView,
      })
    }
  }

  const floorAllSaved = hasItems && scannedItemIds.every(id => itemStates[id]?.floor?.saved)
  const backAllSaved  = hasItems && scannedItemIds.every(id => itemStates[id]?.back?.saved)
  const curSavedCount = scannedItemIds.filter(id => itemStates[id]?.[locationView]?.saved).length
  const progress = hasItems ? curSavedCount / scannedItemIds.length : 0

  const handleSubmitFloorLows = () => {
    setFloorSubmitted(true)
    setLocationView('back')
    setNudge(null)
  }

  const tabs = [
    { id: 'floor', label: 'Floor', Icon: FloorTabIcon },
    { id: 'back',  label: 'Back',  Icon: BackTabIcon  },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--page-bg)', position: 'relative' }}>
      <StatusBar time="9:41" />

      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 12px 8px', gap: 5 }}>
        <button onClick={onBack} style={{ padding: 6, marginLeft: -4, flexShrink: 0 }}>
          <BackArrowIcon />
        </button>

        {tabs.map(({ id, label, Icon }) => {
          const isActive   = locationView === id
          const isDisabled = id === 'back' && !floorSubmitted
          const isDone     = id === 'floor' && floorSubmitted && locationView === 'back'
          const tabColor   = isActive ? 'white' : isDisabled ? '#9CA3AF' : isDone ? 'var(--green-primary)' : 'var(--text-secondary)'

          return (
            <button key={id}
              onClick={() => !isDisabled && setLocationView(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '9px 20px', borderRadius: 24, flexShrink: 0,
                background: isActive ? 'var(--green-primary)' : isDisabled ? '#F3F4F6' : 'white',
                border: `1.5px solid ${isActive ? 'var(--green-primary)' : isDisabled ? '#E5E7EB' : isDone ? 'var(--green-primary)' : 'var(--border)'}`,
                color: tabColor,
                fontSize: 14, fontWeight: 600,
                cursor: isDisabled ? 'default' : 'pointer',
                opacity: isDisabled ? 0.6 : 1,
              }}>
              <Icon color={tabColor} />
              {label}
              {isDone && <CheckIcon size={12} color="var(--green-primary)" />}
            </button>
          )
        })}
      </div>

      {/* Progress bar */}
      {hasItems && (
        <div style={{ height: 4, background: 'var(--border)' }}>
          <div style={{
            height: '100%', background: 'var(--green-primary)',
            width: `${progress * 100}%`, transition: 'width 0.4s ease',
            borderRadius: '0 2px 2px 0',
          }} />
        </div>
      )}

      {/* Scrollable body */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '12px 14px',
        paddingBottom: (locationView === 'floor' && floorAllSaved) || (locationView === 'back' && backAllSaved) ? 90 : 24,
      }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px', marginBottom: 12 }}>
          Lows — {locationView === 'floor' ? 'Floor' : 'Back'}
        </div>

        {nudge && (
          <NudgeCard key={`${nudge.type}-${nudge.locationView}`} nudge={nudge} onDismiss={() => setNudge(null)} />
        )}

        {/* Scan button (floor only, up to 3 scans) */}
        {locationView === 'floor' && nextScanItem && (
          <button onClick={() => setScanSheet(true)} style={{
            width: '100%', marginBottom: hasItems ? 14 : 24,
            border: '1.5px dashed var(--border)', borderRadius: 14,
            background: 'white', padding: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <BarcodeIcon />
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>
              {hasItems ? 'Scan another item' : 'Tap to scan a low item'}
            </span>
          </button>
        )}

        {/* Item cards */}
        {scannedItems.map(item => {
          const st = getViewState(item.id)
          if (!st) return null
          return (
            <LowsItemCard
              key={item.id}
              item={item}
              state={st}
              locationView={locationView}
              onSave={() => handleSave(item.id)}
              onEdit={() => updateViewState(item.id, { saved: false })}
              onCount={count => updateViewState(item.id, { count, saved: false })}
              onReason={reason => updateViewState(item.id, { reason })}
              nudged={nudge?.itemId === item.id}
            />
          )
        })}

        {locationView === 'back' && !hasItems && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13, padding: '24px 0' }}>
            No items to count.
          </div>
        )}

        <div style={{ textAlign: 'center', paddingTop: 4 }}>
          <button onClick={() => setFeedbackOpen(true)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500,
          }}>
            <ChatIcon />
            Add feedback
          </button>
        </div>
      </div>

      {/* Submit Floor Lows */}
      {locationView === 'floor' && floorAllSaved && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'white', borderTop: '1px solid var(--border)',
          padding: '11px 16px 16px', boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
        }}>
          <button onClick={handleSubmitFloorLows} style={{
            width: '100%', padding: '14px', borderRadius: 12,
            background: 'var(--green-primary)', color: 'white',
            fontSize: 15, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <CheckIcon size={16} color="white" />
            Submit Floor Lows
          </button>
        </div>
      )}

      {/* Finish Lows */}
      {locationView === 'back' && backAllSaved && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'white', borderTop: '1px solid var(--border)',
          padding: '11px 16px 16px', boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
        }}>
          <button onClick={onDone} style={{
            width: '100%', padding: '14px', borderRadius: 12,
            background: 'var(--green-primary)', color: 'white',
            fontSize: 15, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <CheckIcon size={16} color="white" />
            Finish Lows
          </button>
        </div>
      )}

      {/* Barcode FAB */}
      {locationView === 'floor' && hasItems && nextScanItem && !scanSheet && !locationSheet && (
        <div style={{
          position: 'absolute', bottom: 20, right: 16,
          width: 52, height: 52, borderRadius: '50%',
          background: 'white', boxShadow: '0 3px 12px rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1.5px solid var(--border)', pointerEvents: 'none',
        }}>
          <BarcodeIcon />
        </div>
      )}

      {scanSheet && nextScanItem && (
        <ScanSheet scannedItem={nextScanItem} onConfirm={handleScanConfirm} onClose={() => setScanSheet(false)} />
      )}
      {locationSheet && (
        <LocationSheet item={locationSheet.item} onSelect={handleLocationSelect} onClose={() => setLocationSheet(null)} />
      )}
      {feedbackOpen && <FeedbackSheet onClose={() => setFeedbackOpen(false)} />}
    </div>
  )
}
