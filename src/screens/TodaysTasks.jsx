import { useEffect, useState } from 'react'
import StatusBar from '../components/StatusBar'

const CheckIcon = ({ size = 20, color = 'var(--green-primary)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const ClipboardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <line x1="12" y1="11" x2="12" y2="17"/>
    <line x1="9" y1="14" x2="15" y2="14"/>
  </svg>
)

export default function TodaysTasks({ countDone, countStats, orderSubmitted, submitTime, onStartCount, onViewOrder }) {
  const stats = [
    {
      label: 'Items confirmed',
      value: countStats ? countStats.itemsConfirmed.toLocaleString() : '0',
    },
    {
      label: 'Adjusted inventory dollars',
      value: countStats ? `$${countStats.adjustedDollars.toFixed(2)}` : '$0',
    },
    {
      label: 'Discrepancies caught',
      value: countStats ? `$${countStats.discrepanciesCaught.toFixed(2)}` : '$0',
    },
  ]
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (orderSubmitted) {
      setShowToast(true)
      const t = setTimeout(() => setShowToast(false), 4500)
      return () => clearTimeout(t)
    }
  }, [orderSubmitted])

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', background: 'var(--page-bg)',
    }}>
      <StatusBar time="9:41" />

      {/* App header row */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '6px 16px 10px', gap: 10, minHeight: 52,
      }}>
        {/* Avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--green-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 12, fontWeight: 700,
          flexShrink: 0, letterSpacing: '0.5px',
        }}>
          JD
        </div>

        {/* Toast or spacer */}
        {showToast ? (
          <div style={{
            flex: 1, background: 'var(--green-primary)', borderRadius: 26,
            padding: '10px 16px',
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: '0 4px 16px rgba(45,92,52,0.38)',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <CheckIcon size={16} color="white" />
            </div>
            <span style={{ color: 'white', fontSize: 14, fontWeight: 600, letterSpacing: '-0.2px' }}>
              Order submitted at {submitTime}
            </span>
          </div>
        ) : (
          <div style={{ flex: 1 }} />
        )}

        <button style={{ padding: 4 }} aria-label="Search">
          <SearchIcon />
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 32px' }}>
        <h1 style={{
          fontSize: 26, fontWeight: 800, color: 'var(--text-primary)',
          letterSpacing: '-0.5px', marginBottom: 16,
        }}>
          Today's tasks
        </h1>

        {/* Task 1 — Inventory count */}
        <div style={{
          background: 'var(--card-bg)', borderRadius: 16, padding: '16px',
          marginBottom: 12, boxShadow: 'var(--shadow-sm)',
          display: 'flex', alignItems: 'flex-start', gap: 14,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 13,
            background: countDone ? 'var(--green-light)' : '#F3F4F6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, transition: 'background 0.3s ease',
          }}>
            {countDone ? <CheckIcon size={22} /> : <ClipboardIcon />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 16, fontWeight: 700, color: 'var(--text-primary)',
              marginBottom: 4, letterSpacing: '-0.2px',
            }}>
              Today's inventory count
            </div>
            <div style={{
              fontSize: 14, fontWeight: 500,
              color: countDone ? 'var(--green-primary)' : 'var(--text-secondary)',
              marginBottom: countDone ? 0 : 12,
              transition: 'color 0.3s ease',
            }}>
              {countDone ? 'All targeted items confirmed' : 'Due in 12h · ~15 min'}
            </div>
            {!countDone && (
              <button onClick={onStartCount} style={{
                padding: '10px 22px', borderRadius: 22,
                border: '2px solid var(--green-primary)', background: 'transparent',
                color: 'var(--green-primary)', fontSize: 14, fontWeight: 700, letterSpacing: '-0.1px',
              }}>
                Start count
              </button>
            )}
          </div>
        </div>

        {/* Task 2 — Order review */}
        <div style={{
          background: 'var(--card-bg)', borderRadius: 16, padding: '16px',
          marginBottom: 24, boxShadow: 'var(--shadow-sm)',
          display: 'flex', alignItems: 'flex-start', gap: 14,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 13,
            background: orderSubmitted ? 'var(--green-light)' : '#F3F4F6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, transition: 'background 0.3s ease',
          }}>
            {orderSubmitted ? <CheckIcon size={22} /> : <ClipboardIcon />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 16, fontWeight: 700, color: 'var(--text-primary)',
              marginBottom: 4, letterSpacing: '-0.2px',
            }}>
              Order review
            </div>
            <div style={{
              fontSize: 14, fontWeight: 500,
              color: orderSubmitted ? 'var(--green-primary)' : 'var(--text-secondary)',
              marginBottom: 12, transition: 'color 0.3s ease',
            }}>
              {orderSubmitted ? `Order submitted at ${submitTime}` : '2 items to review'}
            </div>
            <button onClick={onViewOrder} style={{
              padding: '10px 22px', borderRadius: 22,
              border: '2px solid var(--green-primary)', background: 'transparent',
              color: 'var(--green-primary)', fontSize: 14, fontWeight: 700, letterSpacing: '-0.1px',
            }}>
              View order
            </button>
          </div>
        </div>

        {/* My stats */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            My stats
          </span>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', borderRadius: 22,
            border: '1.5px solid var(--border)', background: 'white',
            fontSize: 15, fontWeight: 500, color: 'var(--text-primary)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}>
            Today
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>

        <div style={{ background: 'var(--card-bg)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '15px 16px',
              borderBottom: i < STATS.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 400 }}>
                {stat.label}
              </span>
              <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
