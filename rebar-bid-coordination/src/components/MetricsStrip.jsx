function Tile({ label, value, sub }) {
  return (
    <div className="card" style={{ padding: 16, flex: 1, minWidth: 180 }}>
      <div className="eyebrow">{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, marginTop: 6, color: 'var(--navy)' }}>{value}</div>
      {sub && <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

export default function MetricsStrip({ jobs, evaluations }) {
  const total = jobs.length
  const autoEligible = jobs.filter((j) => evaluations[j.id].status === 'auto-eligible').length
  const autoPct = Math.round((autoEligible / total) * 100)

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="eyebrow">Office: Houston</div>
        <h1 style={{ fontSize: 20, margin: '4px 0 4px' }}>What success looks like for V1</h1>
        <p style={{ fontSize: 13.5, color: 'var(--body)', maxWidth: 600 }}>
          We're deliberately not leading with "% of jobs automated." A high automation rate with
          bad routing is worse than a low one — the brief is explicit that incorrect routing is
          worse than slow routing. These targets are ordered by what protects trust first.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
          <Tile
            label="Reassignment rate (don't regress)"
            value="≤ 10%"
            sub="Today's baseline. V1 should not increase how often a routed job gets reassigned."
          />
          <Tile
            label="Coordinator time per job"
            value="10 min → < 4 min"
            sub="On jobs with a clean, single rule match — not on conflicts or gated jobs."
          />
          <Tile
            label="Auto-assignable without review"
            value={`~${autoPct}%`}
            sub={`${autoEligible} of ${total} jobs in this demo set hit exactly one rule with no compliance gate.`}
          />
          <Tile
            label="Overrides reviewed weekly"
            value="100%"
            sub="Every override + reason code gets looked at to refine rules — the loop that builds trust over time."
          />
        </div>
      </div>
    </div>
  )
}
