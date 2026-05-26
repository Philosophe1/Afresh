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
const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--amber)">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
)
const TrendUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="var(--green-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
)
const BoxIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>
)
const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--amber)">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="17" x2="12.01" y2="17" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
)

/* ── order data ── */
const ITEMS = [
  {
    id: 'strawberries',
    name: 'Strawberries (1 lb clamshells)',
    sku: '23984517',
    recommended: 12,
    unit: 'CS',
    unitCost: 18.50,
    rationale: 'Based on expected sales of 18 cases over the next 5 days',
    keyDrivers: [
      { icon: 'box', text: 'Current inventory: 6 cases' },
      { icon: 'trend', text: 'Recent sales trend: +12% vs last week' },
      { icon: 'calendar', text: 'No upcoming promotion or major event' },
    ],
    risks: [
      { order: 8,  risk: 'High chance of stockout by day 4' },
      { order: 16, risk: 'Increased waste risk' },
    ],
    confidence: 'medium',
    needsReview: true,
  },
  {
    id: 'blueberries',
    name: 'Blueberries (pint)',
    sku: '23984123',
    recommended: 6,
    unit: 'CS',
    unitCost: 22.00,
    rationale: 'Based on expected sales of 7 cases over the next 4 days',
    keyDrivers: [
      { icon: 'box', text: 'Current inventory: 1 case' },
      { icon: 'trend', text: 'Recent sales trend: steady vs last week' },
      { icon: 'calendar', text: 'No upcoming events' },
    ],
    risks: [
      { order: 4, risk: 'Moderate stockout risk by day 3' },
      { order: 9, risk: 'Slight waste risk' },
    ],
    confidence: 'high',
    needsReview: false,
  },
]

/* ── driver icon helper ── */
function DriverIcon({ type }) {
  if (type === 'trend') return <TrendUpIcon />
  if (type === 'calendar') return <CalendarIcon />
  return <BoxIcon />
}

/* ── single item card ── */
function ItemCard({ item, state, onConfirm, onToggleOverride, onOverrideInput, onSubmitOverride }) {
  const isConfirmed  = state.status === 'confirmed'
  const isOverridden = state.status === 'overridden'
  const isActioned   = isConfirmed || isOverridden
  const overrideErr  = state.overrideInput !== '' && (
    isNaN(Number(state.overrideInput)) || Number(state.overrideInput) < 1
  )

  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      marginBottom: 12,
      boxShadow: 'var(--shadow-sm)',
      overflow: 'hidden',
      border: isActioned ? 'none' : (item.needsReview ? '1.5px solid #FECACA' : '1.5px solid var(--border)'),
      transition: 'border 0.25s ease',
    }}>
      {/* Card header */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
          <div style={{ flex: 1, marginRight: 8 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>
              {item.name}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 2 }}>
              SKU: {item.sku}
            </div>
          </div>
          {/* Status badge */}
          {isConfirmed && (
            <div style={{
              background: 'var(--green-light)',
              borderRadius: 20,
              padding: '4px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}>
              <CheckIcon size={13} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--green-primary)' }}>Confirmed</span>
            </div>
          )}
          {isOverridden && (
            <div style={{
              background: '#FEF3C7',
              borderRadius: 20,
              padding: '4px 10px',
            }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--amber)' }}>Overridden</span>
            </div>
          )}
          {!isActioned && item.needsReview && (
            <div style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'var(--red)',
              marginTop: 4,
              flexShrink: 0,
            }} />
          )}
        </div>

        {/* Recommended quantity row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginTop: 12,
          marginBottom: isActioned ? 10 : 14,
        }}>
          <div style={{
            background: isActioned ? 'var(--green-light)' : '#EDF7EE',
            borderRadius: 8,
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--green-primary)', letterSpacing: '-0.5px' }}>
              {isOverridden ? state.overrideQty : item.recommended}
            </span>
            <span style={{
              background: 'var(--green-primary)',
              color: 'white',
              borderRadius: 5,
              padding: '2px 6px',
              fontSize: 11,
              fontWeight: 700,
            }}>
              {item.unit}
            </span>
          </div>
          <div>
            {isConfirmed && (
              <span style={{ fontSize: 13, color: 'var(--green-primary)', fontWeight: 600 }}>
                Confirmed at {item.recommended} {item.unit}
              </span>
            )}
            {isOverridden && (
              <div>
                <span style={{ fontSize: 13, color: 'var(--amber)', fontWeight: 600 }}>
                  Override: {state.overrideQty} {item.unit}
                </span>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                  Recommended was {item.recommended}
                </div>
              </div>
            )}
            {!isActioned && (
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
                Recommended order
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Rationale section — hidden when actioned */}
      {!isActioned && (
        <div style={{ padding: '0 16px 16px' }}>
          {/* Rationale summary box */}
          <div style={{
            background: '#F0F9F1',
            borderRadius: 10,
            padding: '10px 12px',
            marginBottom: 14,
            borderLeft: '3px solid var(--green-primary)',
          }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.5 }}>
              {item.rationale}
            </div>
          </div>

          {/* Confidence indicator */}
          {item.confidence === 'medium' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 14,
              background: 'var(--amber-light)',
              borderRadius: 8,
              padding: '7px 10px',
            }}>
              <SparkleIcon />
              <span style={{ fontSize: 12, color: 'var(--amber)', fontWeight: 600 }}>
                Moderate confidence — please verify
              </span>
            </div>
          )}

          {/* Key Drivers */}
          <div style={{ marginBottom: 14 }}>
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--text-tertiary)',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              Key Drivers
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {item.keyDrivers.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ flexShrink: 0, width: 20, display: 'flex', justifyContent: 'center' }}>
                    <DriverIcon type={d.icon} />
                  </div>
                  <span style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.4 }}>{d.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--border)', marginBottom: 14 }} />

          {/* Risk section */}
          <div style={{ marginBottom: 18 }}>
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--text-tertiary)',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              Risk if Ordered Differently
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {item.risks.map((r, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 9,
                  background: '#FFFBEB',
                  borderRadius: 8,
                  padding: '8px 10px',
                }}>
                  <div style={{ flexShrink: 0, marginTop: 1 }}>
                    <AlertIcon />
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                    <strong>Ordering {r.order} cases</strong> → {r.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              onClick={onConfirm}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 14,
                background: 'var(--green-primary)',
                color: 'white',
                fontSize: 15,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                letterSpacing: '-0.2px',
              }}
            >
              <CheckIcon size={17} color="white" />
              Confirm Recommended Order
            </button>

            <button
              onClick={onToggleOverride}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 14,
                border: `2px solid ${state.showOverride ? 'var(--amber)' : 'var(--border)'}`,
                background: state.showOverride ? 'var(--amber-light)' : 'transparent',
                color: state.showOverride ? 'var(--amber)' : 'var(--text-secondary)',
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '-0.2px',
                transition: 'all 0.2s ease',
              }}
            >
              Override Recommended Order
            </button>

            {/* Override input — appears inline */}
            {state.showOverride && (
              <div style={{
                background: '#FFFBEB',
                borderRadius: 14,
                padding: '14px',
                border: '1.5px solid #FDE68A',
              }}>
                <div style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: 10,
                }}>
                  Enter new quantity (cases)
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 8"
                      value={state.overrideInput}
                      onChange={e => onOverrideInput(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 10,
                        border: `1.5px solid ${overrideErr ? 'var(--red)' : '#FDE68A'}`,
                        background: 'white',
                        fontSize: 18,
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}
                    />
                    {state.overrideInput && !overrideErr && (
                      <span style={{
                        position: 'absolute',
                        right: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'var(--amber)',
                        color: 'white',
                        borderRadius: 5,
                        padding: '2px 7px',
                        fontSize: 11,
                        fontWeight: 700,
                      }}>
                        {item.unit}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={onSubmitOverride}
                    disabled={!state.overrideInput || overrideErr}
                    style={{
                      padding: '12px 20px',
                      borderRadius: 10,
                      background: (!state.overrideInput || overrideErr)
                        ? '#E5E7EB'
                        : 'var(--amber)',
                      color: (!state.overrideInput || overrideErr) ? 'var(--text-tertiary)' : 'white',
                      fontSize: 14,
                      fontWeight: 700,
                      transition: 'all 0.2s ease',
                      letterSpacing: '-0.1px',
                      flexShrink: 0,
                    }}
                  >
                    Submit Override
                  </button>
                </div>
                {overrideErr && (
                  <div style={{ fontSize: 12, color: 'var(--red)', marginTop: 6 }}>
                    Please enter a valid quantity (whole number ≥ 1)
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actioned — collapsed footer */}
      {isActioned && (
        <div style={{
          padding: '0 16px 14px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <button
            onClick={onToggleOverride}
            style={{
              fontSize: 13,
              color: 'var(--text-secondary)',
              fontWeight: 600,
              textDecoration: 'underline',
              textUnderlineOffset: 2,
            }}
          >
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
      status: 'pending',
      overrideInput: '',
      overrideQty: null,
      showOverride: false,
    }]))
  )

  const getState = id => itemStates[id]

  const updateState = (id, patch) =>
    setItemStates(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }))

  const handleConfirm = id => updateState(id, { status: 'confirmed', showOverride: false })

  const handleToggleOverride = id => {
    const cur = getState(id)
    if (cur.status === 'confirmed' || cur.status === 'overridden') {
      updateState(id, { status: 'pending', showOverride: true, overrideInput: '' })
    } else {
      updateState(id, { showOverride: !cur.showOverride })
    }
  }

  const handleOverrideInput = (id, val) => updateState(id, { overrideInput: val })

  const handleSubmitOverride = id => {
    const cur = getState(id)
    const qty = parseInt(cur.overrideInput, 10)
    if (!qty || qty < 1) return
    updateState(id, { status: 'overridden', overrideQty: qty, showOverride: false, overrideInput: '' })
  }

  const allActioned = ITEMS.every(i => {
    const s = getState(i.id)
    return s.status === 'confirmed' || s.status === 'overridden'
  })

  const reviewNeeded   = ITEMS.filter(i => i.needsReview && getState(i.id).status === 'pending')
  // "All items" = items not currently sitting in the "to review" queue
  const allItemsToShow = ITEMS.filter(i => !i.needsReview || getState(i.id).status !== 'pending')

  const totalCS   = ITEMS.reduce((sum, i) => {
    const s = getState(i.id)
    return sum + (s.status === 'overridden' ? s.overrideQty : i.recommended)
  }, 0)
  const totalCost = ITEMS.reduce((sum, i) => {
    const s = getState(i.id)
    const qty = s.status === 'overridden' ? s.overrideQty : i.recommended
    return sum + qty * i.unitCost
  }, 0)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--page-bg)',
      position: 'relative',
    }}>
      <StatusBar time="9:30" />

      {/* Nav header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '6px 14px 10px',
        gap: 6,
      }}>
        <button onClick={onBack} style={{ padding: 6, marginLeft: -6 }}>
          <BackIcon />
        </button>
        <span style={{
          flex: 1,
          textAlign: 'center',
          fontSize: 17,
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.3px',
        }}>
          Order review
        </span>
        <button style={{ padding: 6 }}><HelpIcon /></button>
        <button style={{ padding: 6 }}><SearchIcon /></button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 110px' }}>

        {/* Items to Review section */}
        {reviewNeeded.length > 0 && (
          <div style={{ marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--red)' }}>
                Items to review
              </span>
              <div style={{
                background: 'var(--red)',
                color: 'white',
                borderRadius: 12,
                minWidth: 22,
                height: 22,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 800,
                padding: '0 6px',
              }}>
                {reviewNeeded.length}
              </div>
            </div>

            {ITEMS.filter(i => i.needsReview).map(item => (
              <ItemCard
                key={item.id}
                item={item}
                state={getState(item.id)}
                onConfirm={() => handleConfirm(item.id)}
                onToggleOverride={() => handleToggleOverride(item.id)}
                onOverrideInput={val => handleOverrideInput(item.id, val)}
                onSubmitOverride={() => handleSubmitOverride(item.id)}
              />
            ))}
          </div>
        )}

        {/* All items section */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginTop: reviewNeeded.length === 0 ? 0 : 8,
          }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
              All items
            </span>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '6px 14px',
              borderRadius: 20,
              border: '1.5px solid var(--border)',
              background: 'white',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-secondary)',
            }}>
              Filter
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>

          {allItemsToShow.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              state={getState(item.id)}
              onConfirm={() => handleConfirm(item.id)}
              onToggleOverride={() => handleToggleOverride(item.id)}
              onOverrideInput={val => handleOverrideInput(item.id, val)}
              onSubmitOverride={() => handleSubmitOverride(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Bottom sticky bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderTop: '1px solid var(--border)',
        padding: '12px 16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
      }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500, marginBottom: 2 }}>Total</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            {totalCS} CS
          </div>
        </div>
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500, marginBottom: 2 }}>Total cost</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            ${totalCost.toFixed(2)}
          </div>
        </div>
        <button
          onClick={allActioned ? onSubmit : undefined}
          disabled={!allActioned}
          style={{
            flex: 1,
            padding: '15px',
            borderRadius: 30,
            background: allActioned ? 'var(--green-primary)' : '#C8D9C9',
            color: 'white',
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: '-0.2px',
            transition: 'background 0.25s ease',
            cursor: allActioned ? 'pointer' : 'not-allowed',
          }}
        >
          Submit Order
        </button>
      </div>
    </div>
  )
}
