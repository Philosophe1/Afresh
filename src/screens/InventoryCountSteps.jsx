import StatusBar from '../components/StatusBar'

const BackArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const CheckIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="var(--green-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const TrendingDownIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
)

const ListIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" strokeWidth="2.5" />
    <line x1="3" y1="12" x2="3.01" y2="12" strokeWidth="2.5" />
    <line x1="3" y1="18" x2="3.01" y2="18" strokeWidth="2.5" />
  </svg>
)

const STEPS = [
  {
    id: 'lows',
    label: 'Lows',
    description: 'Scan and count near-zero items on the floor and in the back',
    doneText: 'Floor and back lows confirmed',
    buttonLabel: 'Start',
    Icon: TrendingDownIcon,
  },
  {
    id: 'targeted',
    label: 'Targeted list of items',
    description: 'Count system-targeted items by category',
    doneText: 'All targeted items confirmed',
    buttonLabel: 'Start',
    Icon: ListIcon,
  },
]

export default function InventoryCountSteps({ onBack, onLows, onTargetedList, lowsDone, targetedDone }) {
  const handlers = { lows: onLows, targeted: onTargetedList }
  const doneMap  = { lows: lowsDone, targeted: targetedDone }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', background: 'var(--page-bg)',
    }}>
      <StatusBar time="9:41" />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px 8px', gap: 4 }}>
        <button onClick={onBack} style={{ padding: 6, flexShrink: 0 }}>
          <BackArrowIcon />
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 32px' }}>
        <h1 style={{
          fontSize: 26, fontWeight: 800, color: 'var(--text-primary)',
          letterSpacing: '-0.5px', marginBottom: 16,
        }}>
          Inventory count steps
        </h1>

        {STEPS.map((step, idx) => {
          const done = doneMap[step.id]
          const onPress = handlers[step.id]
          return (
            <div key={step.id} style={{
              background: 'var(--card-bg)', borderRadius: 16, padding: '16px',
              marginBottom: 12, boxShadow: 'var(--shadow-sm)',
              display: 'flex', alignItems: 'flex-start', gap: 14,
            }}>
              {/* Icon box */}
              <div style={{
                width: 44, height: 44, borderRadius: 13,
                background: done ? 'var(--green-light)' : '#F3F4F6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'background 0.3s ease',
              }}>
                {done ? <CheckIcon size={22} /> : <step.Icon />}
              </div>

              {/* Text + button */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 16, fontWeight: 700, color: 'var(--text-primary)',
                  marginBottom: 4, letterSpacing: '-0.2px',
                }}>
                  {idx + 1}. {step.label}
                </div>
                <div style={{
                  fontSize: 14, fontWeight: 500,
                  color: done ? 'var(--green-primary)' : 'var(--text-secondary)',
                  marginBottom: done ? 0 : 12,
                  transition: 'color 0.3s ease',
                }}>
                  {done ? step.doneText : step.description}
                </div>
                {!done && (
                  <button onClick={onPress} style={{
                    padding: '10px 22px', borderRadius: 22,
                    border: '2px solid var(--green-primary)', background: 'transparent',
                    color: 'var(--green-primary)', fontSize: 14, fontWeight: 700,
                    letterSpacing: '-0.1px',
                  }}>
                    {step.buttonLabel}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
