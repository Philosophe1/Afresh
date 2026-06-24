export default function TopBar({ view, onView }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 20px', background: 'var(--navy)', color: 'var(--white)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8, background: 'var(--blue)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 14,
        }}>R</div>
        <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em' }}>Rebar</div>
        <div className="eyebrow" style={{ color: 'var(--fill)', marginLeft: 4 }}>Bid Coordination · V1</div>
      </div>
      <nav style={{ display: 'flex', gap: 4 }}>
        {[
          ['queue', 'Job Queue'],
          ['rules', 'Assignment Rules'],
          ['metrics', 'This Week'],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => onView(key)}
            className="btn"
            style={{
              background: view === key ? 'rgba(255,255,255,0.16)' : 'transparent',
              color: 'var(--white)',
              fontWeight: 600,
            }}
          >
            {label}
          </button>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
        <span style={{ color: 'var(--fill)' }}>Houston Branch Office</span>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', background: 'var(--avatar-olive)',
          color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 12,
        }}>JC</div>
      </div>
    </header>
  )
}
