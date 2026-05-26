import { useEffect, useState } from 'react'
import StatusBar from '../components/StatusBar'

const CheckIcon = ({ size = 20, color = 'var(--green-primary)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const ClipboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <line x1="12" y1="11" x2="12" y2="17"/>
    <line x1="9" y1="14" x2="15" y2="14"/>
  </svg>
)

export default function TodaysTasks({ countDone, orderSubmitted, submitTime, onStartCount, onViewOrder }) {
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
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--page-bg)',
      position: 'relative',
    }}>
      <StatusBar time="9:30" />

      {/* App header row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '6px 16px 8px',
        gap: 10,
        minHeight: 50,
      }}>
        {/* Avatar */}
        <div style={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          background: 'var(--green-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 12,
          fontWeight: 700,
          flexShrink: 0,
          letterSpacing: '0.5px',
        }}>
          JD
        </div>

        {/* Toast or spacer */}
        {showToast ? (
          <div style={{
            flex: 1,
            background: 'var(--green-primary)',
            borderRadius: 24,
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 14px rgba(45,92,52,0.35)',
          }}>
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <CheckIcon size={12} color="white" />
            </div>
            <span style={{ color: 'white', fontSize: 13, fontWeight: 600, letterSpacing: '-0.1px' }}>
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
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 80px' }}>
        <h1 style={{
          fontSize: 24,
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.5px',
          marginBottom: 14,
        }}>
          Today's tasks
        </h1>

        {/* Task 1 — Inventory count */}
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: 14,
          padding: '14px',
          marginBottom: 10,
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 11,
            background: countDone ? 'var(--green-light)' : '#F3F4F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.3s ease',
          }}>
            {countDone ? <CheckIcon size={20} /> : <ClipboardIcon />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 15,
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 3,
              letterSpacing: '-0.2px',
            }}>
              Today's inventory count
            </div>
            <div style={{
              fontSize: 13,
              fontWeight: 500,
              color: countDone ? 'var(--green-primary)' : 'var(--text-secondary)',
              marginBottom: countDone ? 0 : 10,
              transition: 'color 0.3s ease',
            }}>
              {countDone ? 'All targeted items confirmed' : 'Due in 12h · ~15 min'}
            </div>
            {!countDone && (
              <button
                onClick={onStartCount}
                style={{
                  padding: '10px 22px',
                  borderRadius: 22,
                  border: '2px solid var(--green-primary)',
                  background: 'transparent',
                  color: 'var(--green-primary)',
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '-0.1px',
                }}
              >
                Start count
              </button>
            )}
          </div>
        </div>

        {/* Task 2 — Order review */}
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: 14,
          padding: '14px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 11,
            background: orderSubmitted ? 'var(--green-light)' : '#F3F4F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.3s ease',
          }}>
            {orderSubmitted
              ? <CheckIcon size={20} />
              : <ClipboardIcon />
            }
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 15,
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 3,
              letterSpacing: '-0.2px',
            }}>
              Order review
            </div>
            <div style={{
              fontSize: 13,
              fontWeight: 500,
              color: orderSubmitted ? 'var(--green-primary)' : 'var(--text-secondary)',
              marginBottom: 10,
              transition: 'color 0.3s ease',
            }}>
              {orderSubmitted
                ? `Order submitted at ${submitTime}`
                : '2 items to review'
              }
            </div>
            <button
              onClick={onViewOrder}
              style={{
                padding: '10px 22px',
                borderRadius: 22,
                border: '2px solid var(--green-primary)',
                background: 'transparent',
                color: 'var(--green-primary)',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '-0.1px',
              }}
            >
              {orderSubmitted ? 'View submitted order' : 'View order'}
            </button>
          </div>
        </div>
      </div>

      {/* Done button — bottom right */}
      <div style={{
        position: 'absolute',
        bottom: 24,
        right: 16,
        opacity: orderSubmitted ? 1 : 0,
        transform: orderSubmitted ? 'scale(1)' : 'scale(0.9)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: orderSubmitted ? 'auto' : 'none',
      }}>
        <button style={{
          background: 'var(--green-primary)',
          color: 'white',
          borderRadius: 28,
          padding: '13px 28px',
          fontSize: 15,
          fontWeight: 700,
          boxShadow: '0 6px 18px rgba(45,92,52,0.4)',
          letterSpacing: '-0.1px',
        }}>
          Done
        </button>
      </div>
    </div>
  )
}
