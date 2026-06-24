import { statusMeta, urgencyTone } from '../lib/statusMeta'

export default function JobRow({ job, evaluation, selected, onClick }) {
  const meta = statusMeta[evaluation.status]
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        padding: '12px 14px', border: 'none', borderBottom: '1px solid var(--border)',
        background: selected ? 'var(--tint)' : 'var(--white)',
        borderLeft: selected ? '3px solid var(--blue)' : '3px solid transparent',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>{job.name}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)' }}>#{job.id}</div>
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--body)', marginTop: 2 }}>
        {job.contractor} · {job.location}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
        <span className={`pill ${meta.tone}`}>{meta.label}</span>
        <span className={`pill ${urgencyTone(job.bidDueDays)}`}>Due in {job.bidDueDays}d</span>
        {job.extraction.confidence < 0.7 && (
          <span className="pill tone-neutral">{Math.round(job.extraction.confidence * 100)}% confidence</span>
        )}
      </div>
    </button>
  )
}
