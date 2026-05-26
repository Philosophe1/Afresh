export default function StatusBar({ time = '9:30' }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 18px 4px',
      background: 'var(--page-bg)',
    }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>
        {time}
      </span>
      <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
        {/* WiFi */}
        <svg width="17" height="12" viewBox="0 0 20 14" fill="none">
          <path d="M10 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="#1C1C1E"/>
          <path d="M5.2 8.8A6.8 6.8 0 0 1 10 7c1.9 0 3.6.7 4.8 1.8l-1.5 1.5A4.7 4.7 0 0 0 10 9c-1.3 0-2.5.5-3.3 1.3L5.2 8.8z" fill="#1C1C1E"/>
          <path d="M1.5 5A11.5 11.5 0 0 1 10 1.5c3.3 0 6.2 1.4 8.3 3.6L17 6.5A9.4 9.4 0 0 0 10 3.5 9.4 9.4 0 0 0 3 6.5L1.5 5z" fill="#1C1C1E"/>
        </svg>
        {/* Signal */}
        <svg width="15" height="12" viewBox="0 0 20 14" fill="#1C1C1E">
          <rect x="0" y="8" width="4" height="6" rx="1"/>
          <rect x="6" y="5" width="4" height="9" rx="1"/>
          <rect x="12" y="2" width="4" height="12" rx="1" opacity="0.3"/>
          <rect x="18" y="0" width="2" height="14" rx="1" opacity="0.15"/>
        </svg>
        {/* Battery */}
        <svg width="24" height="12" viewBox="0 0 28 13" fill="none">
          <rect x="0.75" y="0.75" width="23.5" height="11.5" rx="2.25" stroke="#1C1C1E" strokeWidth="1.5"/>
          <rect x="25" y="4" width="3" height="5" rx="1" fill="#1C1C1E" opacity="0.4"/>
          <rect x="2.5" y="2.5" width="12" height="8" rx="1.5" fill="#1C1C1E"/>
        </svg>
      </div>
    </div>
  )
}
