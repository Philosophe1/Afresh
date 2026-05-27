import StatusBar from '../components/StatusBar'

const BackArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="var(--green-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
)

export default function InventoryCountSteps({ onBack, onLows, onTargetedList, lowsDone, targetedDone }) {
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
      <div style={{ flex: 1, padding: '0 16px 32px' }}>
        <h1 style={{
          fontSize: 26, fontWeight: 800, color: 'var(--text-primary)',
          letterSpacing: '-0.5px', marginBottom: 24,
        }}>
          Inventory count steps
        </h1>

        {/* Step 1 — Lows */}
        <div style={{
          background: 'var(--card-bg)', borderRadius: 16, marginBottom: 12,
          boxShadow: 'var(--shadow-sm)', overflow: 'hidden',
        }}>
          <button onClick={onLows} style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', padding: '18px 16px',
            background: 'transparent',
          }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>
              1.&nbsp;&nbsp;Lows
            </span>
            {lowsDone ? <CheckCircleIcon /> : <ChevronRightIcon />}
          </button>
        </div>

        {/* Step 2 — Targeted list of items */}
        <div style={{
          background: 'var(--card-bg)', borderRadius: 16,
          boxShadow: 'var(--shadow-sm)', overflow: 'hidden',
        }}>
          <button onClick={onTargetedList} style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', padding: '18px 16px',
            background: 'transparent',
          }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>
              2.&nbsp;&nbsp;Targeted list of items
            </span>
            {targetedDone ? <CheckCircleIcon /> : <ChevronRightIcon />}
          </button>
        </div>
      </div>
    </div>
  )
}
