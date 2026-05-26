import { useState } from 'react'
import StatusBar from '../components/StatusBar'

/* ── Icons ── */
const BackArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)
const HelpIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5" />
  </svg>
)
const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)
const CheckIcon = ({ size = 12, color = 'var(--green-primary)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const ChevronDownIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)
const ChevronUpIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
)
const MapPinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
const FloorTabIcon = ({ active }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke={active ? 'white' : 'var(--text-secondary)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
  </svg>
)
const BackTabIcon = ({ active }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke={active ? 'white' : 'var(--text-secondary)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
)
const BarcodeIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke="var(--green-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9V5a2 2 0 0 1 2-2h4"/><path d="M15 3h4a2 2 0 0 1 2 2v4"/>
    <path d="M21 15v4a2 2 0 0 1-2 2h-4"/><path d="M9 21H5a2 2 0 0 1-2-2v-4"/>
    <line x1="7" y1="8" x2="7" y2="16"/><line x1="10" y1="8" x2="10" y2="16"/>
    <line x1="13" y1="8" x2="13" y2="16"/><line x1="17" y1="8" x2="17" y2="16"/>
  </svg>
)
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-tertiary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const ChatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
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
const ClipboardDoneIcon = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
    {/* clipboard body */}
    <rect x="18" y="20" width="60" height="68" rx="6" fill="#C8E6C9"/>
    <rect x="18" y="20" width="60" height="68" rx="6" stroke="#2D5C34" strokeWidth="2.5"/>
    {/* clip at top */}
    <rect x="34" y="14" width="28" height="14" rx="7" fill="#2D5C34"/>
    {/* lines */}
    <line x1="30" y1="44" x2="66" y2="44" stroke="#2D5C34" strokeWidth="3" strokeLinecap="round"/>
    <line x1="30" y1="54" x2="66" y2="54" stroke="#2D5C34" strokeWidth="3" strokeLinecap="round"/>
    <line x1="30" y1="64" x2="55" y2="64" stroke="#2D5C34" strokeWidth="3" strokeLinecap="round"/>
    {/* sparkle top-right */}
    <line x1="74" y1="16" x2="74" y2="24" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
    <line x1="70" y1="20" x2="78" y2="20" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
    <line x1="71" y1="17" x2="77" y2="23" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="77" y1="17" x2="71" y2="23" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round"/>
    {/* check circle overlay bottom-right */}
    <circle cx="68" cy="72" r="14" fill="#2D5C34"/>
    <polyline points="61,72 66,77 75,65" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
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

const ITEMS = [
  {
    id: 'limes',
    name: 'Limes (each)',
    sku: '23985001',
    unit: 'ea',
    unitPrice: 0.75,
    incoming: 0, total: 3, display: 3,
    systemEstimate: 4,
    confidence: 'medium',
    floorLoc: 'Citrus Table, Aisle 10 (Liquor/Beverage)',
    backLoc: 'PR-CLR-A03-S2',
  },
  {
    id: 'oranges',
    name: 'Navel Oranges (each)',
    sku: '23985012',
    unit: 'ea',
    unitPrice: 0.89,
    incoming: 2, total: 4, display: 4,
    systemEstimate: 6,
    confidence: 'high',
    floorLoc: 'Citrus Table',
    backLoc: 'PR-CTR-A03-S1',
  },
  {
    id: 'lemons',
    name: 'Lemons (each)',
    sku: '23985089',
    unit: 'ea',
    unitPrice: 0.69,
    incoming: 0, total: 2, display: 2,
    systemEstimate: 3,
    confidence: 'low',
    floorLoc: 'Citrus Table, Aisle 10 (Liquor/Beverage)',
    backLoc: 'PR-LMN-A03-S3',
  },
]

/* ── Nudge card ── */
function NudgeCard({ nudge, onDismiss }) {
  const [tipOpen, setTipOpen] = useState(false)

  const decreaseTip = nudge.locationView === 'floor'
    ? `Before submitting a lower count, verify the backroom bin (${nudge.backLoc}) to ensure no unscanned stock remains. Undercounts on high-confidence items can trigger overordering.`
    : `Before submitting a lower count, verify the floor display (${nudge.floorLoc}) to ensure no additional stock was placed there. Undercounts on high-confidence items can trigger overordering.`

  const content = nudge.type === 'seldom' ? {
    headline: 'Associates achieving strong results typically fully verify stock on low- and medium-confidence counts.',
    tip: 'Physically checking both the floor display and backroom before confirming the estimate takes ~30 seconds and significantly improves system accuracy over time.',
  } : nudge.type === 'decrease' ? {
    headline: 'Significant count decreases on high-confidence Citrus items in this store have been associated with an estimated $240 in waste last month.',
    tip: decreaseTip,
  } : {
    headline: 'Significant count increases on high-confidence Citrus items in this store have been associated with an estimated $180 in lost sales last month.',
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
          <div style={{ fontSize: 11, fontWeight: 700, color: '#92400E', marginBottom: 3 }}>Heads up</div>
          <div style={{ fontSize: 11, color: '#78350F', lineHeight: 1.5, marginBottom: tipOpen ? 8 : 5 }}>
            {content.headline}
          </div>
          {!tipOpen ? (
            <button onClick={() => setTipOpen(true)} style={{
              fontSize: 11, fontWeight: 700, color: 'var(--amber)',
              textDecoration: 'underline', textUnderlineOffset: 2,
            }}>
              Quick tip →
            </button>
          ) : (
            <div style={{
              background: 'rgba(255,255,255,0.65)', borderRadius: 8, padding: '7px 9px',
              fontSize: 11, color: '#92400E', lineHeight: 1.5,
            }}>
              {content.tip}
            </div>
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
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'absolute', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'flex-end',
      }}
    >
      <div style={{
        width: '100%', background: 'white',
        borderRadius: '16px 16px 0 0',
        padding: '16px 16px 20px',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
      }}>
        {done ? (
          <div style={{ textAlign: 'center', padding: '10px 0 6px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
              <CheckIcon size={28} color="var(--green-primary)" />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
              Feedback received
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 18 }}>
              Thanks! Your input helps improve future recommendations and may be surfaced back to you when it leads to better results.
            </div>
            <button onClick={onClose} style={{
              padding: '12px 32px', borderRadius: 22,
              background: 'var(--green-primary)', color: 'white',
              fontSize: 14, fontWeight: 700,
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
            <textarea
              placeholder="Add details (optional)"
              value={details}
              onChange={e => setDetails(e.target.value)}
              rows={2}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: 10,
                border: '1.5px solid var(--border)', fontSize: 13,
                color: 'var(--text-primary)', resize: 'none', marginBottom: 12,
                fontFamily: 'inherit', outline: 'none',
              }}
            />
            <button
              onClick={() => setDone(true)}
              disabled={!selected}
              style={{
                width: '100%', padding: '13px', borderRadius: 22,
                background: selected ? 'var(--green-primary)' : '#E5E7EB',
                color: selected ? 'white' : 'var(--text-tertiary)',
                fontSize: 14, fontWeight: 700, transition: 'all 0.2s',
              }}
            >Submit feedback</button>
          </>
        )}
      </div>
    </div>
  )
}

/* ── Inventory complete summary ── */
function CompleteSummary({ itemStates, onDone }) {
  const totalCount     = ITEMS.reduce((s, i) => s + itemStates[i.id].floor.count + itemStates[i.id].back.count, 0)
  const inventoryValue = ITEMS.reduce((s, i) => s + (itemStates[i.id].floor.count + itemStates[i.id].back.count) * i.unitPrice, 0)
  const adjustedDollars = ITEMS.reduce((s, i) =>
    s + (Math.abs(itemStates[i.id].floor.count - i.systemEstimate) +
         Math.abs(itemStates[i.id].back.count  - i.systemEstimate)) * i.unitPrice, 0)
  const discrepanciesCaught = ITEMS.reduce((s, i) => {
    const fd = Math.abs(itemStates[i.id].floor.count - i.systemEstimate)
    const bd = Math.abs(itemStates[i.id].back.count  - i.systemEstimate)
    const sig = Math.max(SIGNIFICANT_DIFF, i.systemEstimate * 0.10)
    return s + (fd >= sig ? fd * i.unitPrice : 0) + (bd >= sig ? bd * i.unitPrice : 0)
  }, 0)

  const unit = ITEMS.every(i => i.unit === ITEMS[0].unit) ? ITEMS[0].unit : 'ea'

  const UnitBadge = () => (
    <span style={{
      fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)',
      background: '#F3F4F6', borderRadius: 4, padding: '1px 5px', marginLeft: 4,
    }}>{unit}</span>
  )

  const handleDone = () => onDone({ itemsConfirmed: totalCount, adjustedDollars, discrepanciesCaught })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--page-bg)', position: 'relative' }}>
      <StatusBar time="9:41" />

      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 12px 10px', background: 'white', borderBottom: '1px solid var(--border)' }}>
        <div style={{ width: 36 }} />
        <span style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
          Inventory list
        </span>
        <button style={{ padding: 6 }}><HelpIcon /></button>
        <button style={{ padding: 6 }}><SearchIcon /></button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 20px 100px', background: 'white' }}>

        {/* Illustration + title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <ClipboardDoneIcon />
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginTop: 14, letterSpacing: '-0.4px' }}>
            Inventory complete
          </div>
        </div>

        {/* Stats card */}
        <div style={{
          background: 'white', borderRadius: 14,
          border: '1.5px solid var(--border)',
          display: 'flex', marginBottom: 28,
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ flex: 1, padding: '14px 16px', borderRight: '1px solid var(--border)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 5 }}>Total inventory</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px', display: 'flex', alignItems: 'baseline' }}>
              {totalCount}<UnitBadge />
            </div>
          </div>
          <div style={{ flex: 1, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 5 }}>Inventory value</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              ${inventoryValue.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Completed items */}
        <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-0.3px' }}>
          Completed items
        </div>

        {/* Back row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>Back</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              background: '#F3F4F6', borderRadius: 20, padding: '3px 12px',
              fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)',
            }}>{ITEMS.length}</span>
            <span style={{ color: 'var(--text-tertiary)' }}><ChevronDownIcon /></span>
          </div>
        </div>
        <div style={{ height: 1, background: 'var(--border)', marginBottom: 16 }} />

        {/* Floor row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>Floor</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              background: '#F3F4F6', borderRadius: 20, padding: '3px 12px',
              fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)',
            }}>{ITEMS.length}</span>
            <span style={{ color: 'var(--text-tertiary)' }}><ChevronDownIcon /></span>
          </div>
        </div>
      </div>

      {/* Done button — bottom right */}
      <div style={{ position: 'absolute', bottom: 24, right: 20 }}>
        <button onClick={handleDone} style={{
          padding: '14px 32px', borderRadius: 28,
          background: 'var(--green-primary)', color: 'white',
          fontSize: 15, fontWeight: 700, letterSpacing: '-0.2px',
          boxShadow: '0 4px 12px rgba(45,92,52,0.35)',
        }}>Done</button>
      </div>
    </div>
  )
}

/* ── Item card ── */
function ItemCard({ item, state, locationView, onSave, onEdit, onCount, onReason }) {
  const conf = CONFIDENCE[item.confidence]
  const diff = Math.abs(state.count - item.systemEstimate)
  const significantDiff = diff >= Math.max(SIGNIFICANT_DIFF, item.systemEstimate * 0.10)
  const unit = item.unit || 'CS'

  /* Collapsed saved state */
  if (state.saved) {
    return (
      <div style={{
        background: 'white', borderRadius: 14, marginBottom: 10,
        boxShadow: 'var(--shadow-sm)', border: '1.5px solid var(--green-primary)',
        padding: '12px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
            {item.name}
          </div>
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

        {/* Location — shows only the active view's line */}
        <div style={{ background: '#F6F7F8', borderRadius: 8, padding: '6px 9px', marginBottom: 9 }}>
          {locationView === 'floor' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <MapPinIcon />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>{item.floorLoc}</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <BoxIcon />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>{item.backLoc}</span>
            </div>
          )}
        </div>

        {/* System estimate + confidence */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>System estimate</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
              {item.systemEstimate} {unit}
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: conf.color, background: conf.bg, borderRadius: 20, padding: '2px 8px' }}>
              {conf.label}
            </span>
          </div>
        </div>

        {/* Incoming / Total / Display (floor only) — Back shows Total only */}
        <div style={{ display: 'flex', borderTop: '1px solid var(--border)', paddingTop: 9, paddingBottom: 9 }}>
          {(locationView === 'floor'
            ? [
                { label: 'Incoming', value: `${item.incoming} ${unit}` },
                { label: 'Total',    value: `${item.systemEstimate} ${unit}` },
                { label: 'Display',  value: `${item.display} ${unit}` },
              ]
            : [
                { label: 'Total', value: `${item.systemEstimate} ${unit}` },
              ]
          ).map((col, i, arr) => (
            <div key={i} style={{
              flex: 1,
              borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              paddingRight: i < arr.length - 1 ? 10 : 0,
              paddingLeft: i > 0 ? 10 : 0,
            }}>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>{col.label}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{col.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Count controls */}
      <div style={{ padding: '10px 14px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: significantDiff ? 10 : 0 }}>
          <button onClick={() => onCount(Math.max(0, state.count - 1))} style={{
            width: 40, height: 40, borderRadius: '50%',
            border: '1.5px solid var(--border)', background: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, color: 'var(--text-primary)', flexShrink: 0, lineHeight: 1,
          }}>−</button>

          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="number" min="0"
              value={state.count}
              onChange={e => {
                const v = parseInt(e.target.value, 10)
                onCount(isNaN(v) || v < 0 ? 0 : v)
              }}
              style={{
                width: '100%', padding: '8px 30px 8px 12px',
                borderRadius: 10, border: '1.5px solid var(--border)',
                background: 'white', fontSize: 18, fontWeight: 700,
                color: 'var(--text-primary)', textAlign: 'center', outline: 'none',
              }}
            />
            <span style={{
              position: 'absolute', right: 9, top: '50%', transform: 'translateY(-50%)',
              fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)',
              pointerEvents: 'none',
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

/* ── Main screen ── */
export default function InventoryCount({ onBack, onDone }) {
  const [locationView, setLocationView] = useState('floor')
  const [categoryOpen, setCategoryOpen] = useState(true)
  const [itemStates, setItemStates] = useState(
    Object.fromEntries(ITEMS.map(item => [item.id, {
      floor: { count: item.systemEstimate, saved: false, reason: null },
      back:  { count: item.systemEstimate, saved: false, reason: null },
    }]))
  )
  const [nudge, setNudge]               = useState(null)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [showSummary, setShowSummary]   = useState(false)

  const getViewState    = id => itemStates[id][locationView]
  const updateViewState = (id, patch) => setItemStates(prev => ({
    ...prev,
    [id]: { ...prev[id], [locationView]: { ...prev[id][locationView], ...patch } },
  }))

  const handleSave = id => {
    const st   = getViewState(id)
    const item = ITEMS.find(i => i.id === id)
    const diff = Math.abs(st.count - item.systemEstimate)
    const isSignificant = diff >= Math.max(SIGNIFICANT_DIFF, item.systemEstimate * 0.10)

    updateViewState(id, { saved: true })

    if ((item.confidence === 'medium' || item.confidence === 'low') && diff === 0) {
      setNudge({ type: 'seldom' })
    } else if (item.confidence === 'high' && isSignificant) {
      setNudge({
        type: st.count < item.systemEstimate ? 'decrease' : 'increase',
        backLoc: item.backLoc,
        floorLoc: item.floorLoc,
        locationView,
      })
    }
  }

  const switchView = view => { setLocationView(view); setNudge(null) }

  const floorSavedCount = ITEMS.filter(i => itemStates[i.id].floor.saved).length
  const backSavedCount  = ITEMS.filter(i => itemStates[i.id].back.saved).length
  const floorAllSaved   = floorSavedCount === ITEMS.length
  const backAllSaved    = backSavedCount  === ITEMS.length
  const curSavedCount   = locationView === 'floor' ? floorSavedCount : backSavedCount
  const curAllSaved     = locationView === 'floor' ? floorAllSaved   : backAllSaved
  const progress        = curSavedCount / ITEMS.length

  const handleCompleteCount = () => {
    if (locationView === 'floor') {
      if (backAllSaved) setShowSummary(true)
      else switchView('back')
    } else {
      if (floorAllSaved) setShowSummary(true)
      else switchView('floor')
    }
  }

  if (showSummary) {
    return <CompleteSummary itemStates={itemStates} onDone={onDone} />
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--page-bg)', position: 'relative' }}>
      <StatusBar time="9:41" />

      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 12px 8px', gap: 5 }}>
        <button onClick={onBack} style={{ padding: 6, marginLeft: -4, flexShrink: 0 }}>
          <BackArrowIcon />
        </button>

        {['floor', 'back'].map(view => {
          const isActive = locationView === view
          const isDone   = view === 'floor' ? floorAllSaved : backAllSaved
          return (
            <button key={view} onClick={() => switchView(view)} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '9px 20px', borderRadius: 24, flexShrink: 0,
              background: isActive ? 'var(--green-primary)' : 'white',
              border: `1.5px solid ${isActive ? 'var(--green-primary)' : isDone ? 'var(--green-primary)' : 'var(--border)'}`,
              color: isActive ? 'white' : isDone ? 'var(--green-primary)' : 'var(--text-secondary)',
              fontSize: 14, fontWeight: 600,
            }}>
              {view === 'floor' ? <FloorTabIcon active={isActive} /> : <BackTabIcon active={isActive} />}
              {view === 'floor' ? 'Floor' : 'Back'}
              {isDone && !isActive && (
                <CheckIcon size={12} color="var(--green-primary)" />
              )}
            </button>
          )
        })}

        <div style={{ flex: 1 }} />
        <button style={{ padding: 5 }}><HelpIcon /></button>
        <button style={{ padding: 5 }}><SearchIcon /></button>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'var(--border)' }}>
        <div style={{
          height: '100%', background: 'var(--green-primary)',
          width: `${progress * 100}%`, transition: 'width 0.4s ease',
          borderRadius: '0 2px 2px 0',
        }} />
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', paddingBottom: curAllSaved ? 90 : 24 }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            Today's categories
          </span>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '6px 12px', borderRadius: 20,
            border: '1.5px solid var(--border)', background: 'white',
            fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)',
          }}>
            To Do {ITEMS.length - curSavedCount}
            <ChevronDownIcon />
          </button>
        </div>

        <div>
          <button
            onClick={() => setCategoryOpen(o => !o)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, padding: 0, background: 'transparent' }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Citrus Fruits</span>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{curSavedCount}/{ITEMS.length} scanned</span>
            </div>
            <span style={{ color: 'var(--text-tertiary)', display: 'flex' }}>
              {categoryOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </span>
          </button>

          <div style={{ height: 3, background: 'var(--border)', borderRadius: 4, marginBottom: 10, overflow: 'hidden' }}>
            <div style={{
              height: '100%', background: 'var(--green-primary)',
              width: `${progress * 100}%`, borderRadius: 4,
              transition: 'width 0.4s ease',
            }} />
          </div>

          {nudge && categoryOpen && (
            <NudgeCard key={`${nudge.type}-${nudge.locationView}`} nudge={nudge} onDismiss={() => setNudge(null)} />
          )}

          {categoryOpen && ITEMS.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              state={getViewState(item.id)}
              locationView={locationView}
              onSave={() => handleSave(item.id)}
              onEdit={() => updateViewState(item.id, { saved: false })}
              onCount={count => updateViewState(item.id, { count, saved: false })}
              onReason={reason => updateViewState(item.id, { reason })}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', paddingTop: 4 }}>
          <button
            onClick={() => setFeedbackOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}
          >
            <ChatIcon />
            Add feedback
          </button>
        </div>
      </div>

      {/* Complete count bar */}
      {curAllSaved && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'white', borderTop: '1px solid var(--border)',
          padding: '11px 16px 16px',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
        }}>
          <button onClick={handleCompleteCount} style={{
            width: '100%', padding: '14px', borderRadius: 12,
            background: 'var(--green-primary)', color: 'white',
            fontSize: 15, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <CheckIcon size={16} color="white" />
            {locationView === 'floor'
              ? (backAllSaved ? 'Complete Count' : 'Continue to Back →')
              : (floorAllSaved ? 'Complete Count' : 'Continue to Floor →')}
          </button>
        </div>
      )}

      {/* Barcode scanner FAB */}
      {!curAllSaved && (
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

      {feedbackOpen && <FeedbackSheet onClose={() => setFeedbackOpen(false)} />}
    </div>
  )
}
