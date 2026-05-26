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

export default function TodaysTasks({ orderSubmitted, submitTime, onViewOrder }) {
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
        padding: '8px 18px 10px',
        gap: 10,
        minHeight: 56,
      }}>
        {/* Avatar */}
        <div style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: 'var(--green-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 13,
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
            borderRadius: 26,
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 4px 14px rgba(45,92,52,0.35)',
          }}>
            <div style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <CheckIcon size={13} color="white" />
            </div>
            <span style={{ color: 'white', fontSize: 14, fontWeight: 600, letterSpacing: '-0.1px' }}>
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
      <div style={{ flex: 1, overflowY: 'auto', padding: '2px 18px 110px' }}>
        <h1 style={{
          fontSize: 27,
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.5px',
          marginBottom: 18,
        }}>
          Today's tasks
        </h1>

        {/* Task 1 — Inventory count (complete) */}
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: 16,
          padding: '18px 16px',
          marginBottom: 12,
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 14,
        }}>
          <div style={{
            width: 46,
            height: 46,
            borderRadius: 13,
            background: 'var(--green-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <CheckIcon size={23} />
          </div>
          <div>
            <div style={{
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 4,
              letterSpacing: '-0.2px',
            }}>
              Today's inventory count
            </div>
            <div style={{
              fontSize: 14,
              color: 'var(--green-primary)',
              fontWeight: 500,
            }}>
              All targeted items confirmed
            </div>
          </div>
        </div>

        {/* Task 2 — Order review */}
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: 16,
          padding: '18px 16px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 14,
        }}>
          <div style={{
            width: 46,
            height: 46,
            borderRadius: 13,
            background: orderSubmitted ? 'var(--green-light)' : '#F3F4F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.3s ease',
          }}>
            {orderSubmitted
              ? <CheckIcon size={23} />
              : <ClipboardIcon />
            }
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 4,
              letterSpacing: '-0.2px',
            }}>
              Order review
            </div>
            <div style={{
              fontSize: 14,
              fontWeight: 500,
              color: orderSubmitted ? 'var(--green-primary)' : 'var(--text-secondary)',
              marginBottom: 12,
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
                padding: '9px 22px',
                borderRadius: 24,
                border: '2px solid var(--green-primary)',
                background: 'transparent',
                color: 'var(--green-primary)',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '-0.1px',
              }}
            >
              View order
            </button>
          </div>
        </div>
      </div>

      {/* Done button — bottom right */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        right: 20,
        opacity: orderSubmitted ? 1 : 0,
        transform: orderSubmitted ? 'scale(1)' : 'scale(0.9)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: orderSubmitted ? 'auto' : 'none',
      }}>
        <button style={{
          background: 'var(--green-primary)',
          color: 'white',
          borderRadius: 32,
          padding: '15px 32px',
          fontSize: 16,
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
