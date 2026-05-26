import { useState } from 'react'
import StatusBar from '../components/StatusBar'

/* ── icons ── */
const BackIcon = () => (
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
const CheckIcon = ({ size = 18, color = 'var(--green-primary)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-tertiary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)
const ChevronUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-tertiary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
)
const SparkleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--amber)">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
)
const TrendUpIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="var(--green-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
)
const BoxIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>
)
const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const AlertIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--amber)">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="17" x2="12.01" y2="17" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
)

/* ── unit badge ── */
const UnitBadge = ({ label, amber }) => (
  <span style={{
    background: amber ? 'var(--amber)' : 'var(--green-primary)',
    color: 'white', borderRadius: 5, padding: '2px 6px',
    fontSize: 11, fontWeight: 700, letterSpacing: '0.2px', flexShrink: 0,
  }}>
    {label}
  </span>
)

/* ── section label ── */
const SectionLabel = ({ children }) => (
  <div style={{
    fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)',
    letterSpacing: '0.7px', textTransform: 'uppercase', marginBottom: 5,
  }}>
    {children}
  </div>
)

/* ── divider ── */
const Divider = ({ my = 10 }) => (
  <div style={{ height: 1, background: 'var(--border)', margin: `${my}px 0` }} />
)

/* ── order data ── */
const ITEMS = [
  {
    id: 'strawberries',
    name: 'Strawberries (1 lb clamshells)',
    sku: '23984517',
    caseInfo: 'Case: $18.50 · 12 units',
    inventory: '6 CS',
    price: '$18.50',
    display: '8 CS',
    recommended: 12,
    unit: 'CS',
    unitCost: 18.50,
    confidence: 'medium',
    rationale: 'Based on expected sales of 8 CS over next 5 days',
    keyDrivers: [
      { icon: 'box',      text: 'Current inventory: 6 CS' },
      { icon: 'trend',    text: 'Recent sales trend: +12% vs last week' },
      { icon: 'calendar', text: 'No upcoming promotion or major event' },
    ],
    risks: [
      { order: 8,  risk: 'Stockout likely by day 4' },
      { order: 16, risk: 'Increased waste risk' },
    ],
    needsReview: true,
  },
  {
    id: 'blueberries',
    name: 'Blueberries (pint)',
    sku: '23984123',
    caseInfo: 'Case: $22.00 · 8 units',
    inventory: '1 CS',
    price: '$22.00',
    display: '2 CS',
    recommended: 6,
    unit: 'CS',
    unitCost: 22.00,
    confidence: 'high',
    rationale: 'Based on expected sales of 7 CS over next 4 days',
    keyDrivers: [
      { icon: 'box',      text: 'Current inventory: 1 CS' },
      { icon: 'trend',    text: 'Recent sales trend: steady vs last week' },
      { icon: 'calendar', text: 'No upcoming events' },
    ],
    risks: [
      { order: 4, risk: 'Stockout risk by day 3' },
      { order: 9, risk: 'Slight waste risk' },
    ],
    needsReview: false,
  },
]

function DriverIcon({ type }) {
  if (type === 'trend') return <TrendUpIcon />
  if (type === 'calendar') return <CalendarIcon />
  return <BoxIcon />
}

/* ── compact row — tappable, expands to full card ── */
function CompactRow({ item, state, onExpand }) {
  const isOverridden = state.status === 'overridden'
  const qty = isOverridden ? state.overrideQty : item.recommended
  return (
    <button
      onClick={onExpand}
      style={{
        width: '100%', textAlign: 'left',
        background: 'var(--card-bg)', borderRadius: 14, marginBottom: 10,
        boxShadow: 'var(--shadow-sm)', border: '1.5px solid var(--border)',
        padding: '13px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>
        {item.name}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: isOverridden ? 'var(--amber)' : 'var(--text-primary)' }}>
          {qty}
        </span>
        <UnitBadge label={item.unit} amber={isOverridden} />
        <ChevronDownIcon />
      </div>
    </button>
  )
}

/* ── item card ── */
function ItemCard({ item, state, onConfirm, onToggleOverride, onOverrideInput, onSubmitOverride, onCollapse }) {
  const isConfirmed  = state.status === 'confirmed'
  const isOverridden = state.status === 'overridden'
  const isActioned   = isConfirmed || isOverridden
  const overrideErr  = state.overrideInput !== '' &&
    (isNaN(Number(state.overrideInput)) || Number(state.overrideInput) < 1)

  return (
    <div style={{
      background: 'var(--card-bg)', borderRadius: 14, marginBottom: 10,
      overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
      border: isActioned ? '1.5px solid var(--border)'
        : item.needsReview ? '1.5px solid #FECACA'
        : '1.5px solid var(--border)',
    }}>

      {/* ── Card header ── */}
      <div style={{ padding: '13px 14px 0' }}>

        {/* Name row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.2px', lineHeight: 1.3, flex: 1, marginRight: 8 }}>
            {item.name}
          </div>
          {isConfirmed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--green-light)', borderRadius: 20, padding: '3px 9px', flexShrink: 0 }}>
              <CheckIcon size={12} />
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-primary)' }}>Confirmed</span>
            </div>
          )}
          {isOverridden && (
            <div style={{ background: '#FEF3C7', borderRadius: 20, padding: '3px 9px', flexShrink: 0 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--amber)' }}>Overridden</span>
            </div>
          )}
          {!isActioned && item.needsReview && (
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--red)', marginTop: 4, flexShrink: 0 }} />
          )}
          {/* Collapse button for expanded non-review items */}
          {!isActioned && onCollapse && (
            <button onClick={onCollapse} style={{ padding: '0 0 0 6px', flexShrink: 0, marginTop: 1 }}>
              <ChevronUpIcon />
            </button>
          )}
        </div>

        {/* SKU + case info */}
        <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 10 }}>
          {item.sku} &bull; {item.caseInfo}
        </div>

        {/* Inventory / Price / Display stats */}
        <div style={{ display: 'flex', marginBottom: 10 }}>
          {[
            { label: 'Inventory', value: item.inventory },
            { label: 'Price',     value: item.price },
            { label: 'Display',   value: item.display },
          ].map((col, i) => (
            <div key={i} style={{ flex: 1, borderRight: i < 2 ? '1px solid var(--border)' : 'none', paddingRight: i < 2 ? 10 : 0, paddingLeft: i > 0 ? 10 : 0 }}>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 3, fontWeight: 500 }}>{col.label}</div>
              <div style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-primary)' }}>{col.value}</div>
            </div>
          ))}
        </div>

        <Divider my={0} />

        {/* Recommended order quantity */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0 9px' }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
            {isActioned ? (isOverridden ? 'Override quantity' : 'Confirmed quantity') : 'Recommended order'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: isOverridden ? 'var(--amber)' : 'var(--green-primary)', letterSpacing: '-0.5px' }}>
              {isOverridden ? state.overrideQty : item.recommended}
            </span>
            <UnitBadge label={item.unit} amber={isOverridden} />
            {isOverridden && (
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                (rec: {item.recommended})
              </span>
            )}
          </div>
        </div>

        {/* Confidence indicator — medium confidence only, not actioned */}
        {!isActioned && item.confidence === 'medium' && (
          <>
            <Divider my={0} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0' }}>
              <SparkleIcon />
              <span style={{ fontSize: 12, color: 'var(--amber)', fontWeight: 600 }}>
                Moderate confidence — please verify
              </span>
            </div>
          </>
        )}
      </div>

      {/* Rationale + Drivers + Risk — hidden when actioned */}
      {!isActioned && (
        <div style={{ padding: '0 14px 13px' }}>

          <Divider my={6} />

          {/* Rationale */}
          <div style={{ background: '#F0F9F1', borderRadius: 9, padding: '5px 9px', marginBottom: 8, borderLeft: '3px solid var(--green-primary)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.rationale}
            </div>
          </div>

          {/* Key drivers */}
          <div style={{ marginBottom: 7 }}>
            <SectionLabel>Key Drivers</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {item.keyDrivers.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ flexShrink: 0, width: 18 }}>
                    <DriverIcon type={d.icon} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.3 }}>{d.text}</span>
                </div>
              ))}
            </div>
          </div>

          <Divider my={7} />

          {/* Risk */}
          <div style={{ marginBottom: 8 }}>
            <SectionLabel>Risk if Ordered Differently</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {item.risks.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#FFFBEB', borderRadius: 8, padding: '5px 9px', overflow: 'hidden' }}>
                  <div style={{ flexShrink: 0 }}><AlertIcon /></div>
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <strong>{r.order} CS</strong> → {r.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button onClick={onConfirm} style={{
              width: '100%', padding: '14px', borderRadius: 12,
              background: 'var(--green-primary)', color: 'white',
              fontSize: 15, fontWeight: 700, letterSpacing: '-0.2px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            }}>
              <CheckIcon size={15} color="white" />
              Confirm Recommended Order
            </button>

            <button onClick={onToggleOverride} style={{
              width: '100%', padding: '13px', borderRadius: 12,
              border: `2px solid ${state.showOverride ? 'var(--amber)' : 'var(--border)'}`,
              background: state.showOverride ? '#FFFBEB' : 'transparent',
              color: state.showOverride ? 'var(--amber)' : 'var(--text-secondary)',
              fontSize: 14, fontWeight: 700, letterSpacing: '-0.2px',
              transition: 'all 0.2s ease',
            }}>
              Override Recommended Order
            </button>

            {/* Override input */}
            {state.showOverride && (
              <div style={{ background: '#FFFBEB', borderRadius: 11, padding: '12px', border: '1.5px solid #FDE68A' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  Enter new quantity (cases)
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <input
                      type="number" min="1" placeholder="e.g. 8"
                      value={state.overrideInput}
                      onChange={e => onOverrideInput(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 44px 10px 12px',
                        borderRadius: 9, border: `1.5px solid ${overrideErr ? 'var(--red)' : '#FDE68A'}`,
                        background: 'white', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)',
                      }}
                    />
                    {state.overrideInput && !overrideErr && (
                      <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
                        <UnitBadge label={item.unit} amber />
                      </span>
                    )}
                  </div>
                  <button
                    onClick={onSubmitOverride}
                    disabled={!state.overrideInput || overrideErr}
                    style={{
                      padding: '10px 14px', borderRadius: 9,
                      background: (!state.overrideInput || overrideErr) ? '#E5E7EB' : 'var(--amber)',
                      color: (!state.overrideInput || overrideErr) ? 'var(--text-tertiary)' : 'white',
                      fontSize: 13, fontWeight: 700, flexShrink: 0, transition: 'all 0.2s ease',
                    }}
                  >
                    Submit Override
                  </button>
                </div>
                {overrideErr && (
                  <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 5 }}>
                    Please enter a valid quantity (whole number ≥ 1)
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actioned collapsed footer */}
      {isActioned && (
        <div style={{ padding: '0 14px 12px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onToggleOverride} style={{
            fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600,
            textDecoration: 'underline', textUnderlineOffset: 2,
          }}>
            Change
          </button>
        </div>
      )}
    </div>
  )
}

/* ── main screen ── */
export default function OrderReview({ onBack, onSubmit }) {
  const [itemStates, setItemStates] = useState(
    Object.fromEntries(ITEMS.map(item => [item.id, {
      status: 'pending', overrideInput: '', overrideQty: null, showOverride: false,
    }]))
  )
  const [expandedItems, setExpandedItems] = useState(new Set())

  const getState    = id => itemStates[id]
  const updateState = (id, patch) => setItemStates(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }))

  const toggleExpanded = id => setExpandedItems(prev => {
    const next = new Set(prev)
    if (next.has(id)) next.delete(id); else next.add(id)
    return next
  })

  const handleConfirm        = id => updateState(id, { status: 'confirmed', showOverride: false })
  const handleToggleOverride = id => {
    const cur = getState(id)
    if (cur.status === 'confirmed' || cur.status === 'overridden') {
      updateState(id, { status: 'pending', showOverride: true, overrideInput: '' })
    } else {
      updateState(id, { showOverride: !cur.showOverride })
    }
  }
  const handleOverrideInput  = (id, val) => updateState(id, { overrideInput: val })
  const handleSubmitOverride = id => {
    const qty = parseInt(getState(id).overrideInput, 10)
    if (!qty || qty < 1) return
    updateState(id, { status: 'overridden', overrideQty: qty, showOverride: false, overrideInput: '' })
  }

  const allActioned    = ITEMS.every(i => ['confirmed','overridden'].includes(getState(i.id).status))
  const reviewNeeded   = ITEMS.filter(i => i.needsReview && getState(i.id).status === 'pending')
  const allItemsToShow = ITEMS.filter(i => !i.needsReview || getState(i.id).status !== 'pending')

  const totalCS   = ITEMS.reduce((s, i) => s + (getState(i.id).status === 'overridden' ? getState(i.id).overrideQty : i.recommended), 0)
  const totalCost = ITEMS.reduce((s, i) => {
    const qty = getState(i.id).status === 'overridden' ? getState(i.id).overrideQty : i.recommended
    return s + qty * i.unitCost
  }, 0)

  const cardProps = id => ({
    item: ITEMS.find(i => i.id === id),
    state: getState(id),
    onConfirm: () => handleConfirm(id),
    onToggleOverride: () => handleToggleOverride(id),
    onOverrideInput: val => handleOverrideInput(id, val),
    onSubmitOverride: () => handleSubmitOverride(id),
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--page-bg)', position: 'relative' }}>
      <StatusBar time="9:30" />

      {/* Nav header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 12px 10px', gap: 4 }}>
        <button onClick={onBack} style={{ padding: 6, marginLeft: -4 }}><BackIcon /></button>
        <span style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
          Order review
        </span>
        <button style={{ padding: 6 }}><HelpIcon /></button>
        <button style={{ padding: 6 }}><SearchIcon /></button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '2px 14px 90px' }}>

        {/* Items to review */}
        {reviewNeeded.length > 0 && (
          <div style={{ marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--red)' }}>Items to review</span>
              <div style={{
                background: 'var(--red)', color: 'white', borderRadius: 12,
                minWidth: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800, padding: '0 6px',
              }}>
                {reviewNeeded.length}
              </div>
            </div>
            {ITEMS.filter(i => i.needsReview).map(item => (
              <ItemCard key={item.id} {...cardProps(item.id)} />
            ))}
          </div>
        )}

        {/* All items */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: reviewNeeded.length > 0 ? 4 : 0 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>All items</span>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 5, padding: '6px 13px',
              borderRadius: 20, border: '1.5px solid var(--border)', background: 'white',
              fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)',
            }}>
              Filter
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
          {allItemsToShow.map(item => {
            if (item.needsReview) {
              return <ItemCard key={item.id} {...cardProps(item.id)} />
            }
            const expanded = expandedItems.has(item.id)
            return expanded
              ? <ItemCard key={item.id} {...cardProps(item.id)} onCollapse={() => toggleExpanded(item.id)} />
              : <CompactRow key={item.id} item={item} state={getState(item.id)} onExpand={() => toggleExpanded(item.id)} />
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'white', borderTop: '1px solid var(--border)',
        padding: '11px 16px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
      }}>
        <div>
          <div style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 500, marginBottom: 2 }}>Total</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            {totalCS} CS
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 500, marginBottom: 2 }}>Total cost</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            ${totalCost.toFixed(2)}
          </div>
        </div>
        <button
          onClick={allActioned ? onSubmit : undefined}
          disabled={!allActioned}
          style={{
            padding: '13px 28px', borderRadius: 28,
            background: allActioned ? 'var(--green-primary)' : '#C8D9C9',
            color: 'white', fontSize: 15, fontWeight: 700, letterSpacing: '-0.2px',
            transition: 'background 0.25s ease',
            cursor: allActioned ? 'pointer' : 'not-allowed',
          }}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
