const field = (label, value) => (
  <div>
    <div className="eyebrow">{label}</div>
    <div style={{ fontSize: 13.5, color: 'var(--ink)', marginTop: 2 }}>{value ?? '—'}</div>
  </div>
)

export default function ExtractedFields({ job }) {
  const low = job.extraction.confidence < 0.7
  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="eyebrow">Extracted from {job.source} by Rebar AI</div>
        <span className={`pill ${low ? 'tone-warn' : 'tone-ok'}`}>
          {Math.round(job.extraction.confidence * 100)}% confidence
        </span>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
        marginTop: 12,
      }}>
        {field('Contractor', job.contractor)}
        {field('Location', job.location)}
        {field('Building type', job.buildingType)}
        {field('Equipment', job.equipment.join(', '))}
        {field('Duct type', job.ductType)}
        {field('Estimated value', job.estValue != null ? `$${job.estValue.toLocaleString()}` : null)}
        {field('Branch', job.branch)}
        {field('Existing estimator', job.existingEstimator)}
      </div>
      {job.extraction.notes.length > 0 && (
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <div className="eyebrow" style={{ color: 'var(--warn)' }}>Extraction issues</div>
          <ul style={{ margin: '6px 0 0', paddingLeft: 18, fontSize: 13, color: 'var(--body)' }}>
            {job.extraction.notes.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}
