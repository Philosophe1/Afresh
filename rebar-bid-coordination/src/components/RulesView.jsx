import { ruleDefinitions } from '../data/jobs'

export default function RulesView() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div className="eyebrow">Office: Houston</div>
        <h1 style={{ fontSize: 20, margin: '4px 0 4px' }}>Assignment Rules</h1>
        <p style={{ fontSize: 13.5, color: 'var(--body)', maxWidth: 560 }}>
          These are the rules the recommendation engine checks on every incoming job, in plain
          language. Coordinators can see exactly what's active — nothing routes silently. V1 ships
          these as fixed, reviewed rules; editing them inline is a fast follow once we trust the
          baseline.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
          {ruleDefinitions.map((r, i) => (
            <div key={r.id} className="card" style={{ padding: 14, display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Rule {i + 1}</div>
                <div style={{ fontSize: 14, marginTop: 2 }}>{r.label}</div>
              </div>
              <span className="pill tone-info" style={{ flexShrink: 0 }}>{r.target}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
