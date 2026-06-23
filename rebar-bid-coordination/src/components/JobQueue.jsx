import { useState } from 'react'
import JobRow from './JobRow'

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'conflict', label: 'Needs your call' },
  { key: 'gated', label: 'Manual review' },
  { key: 'auto-eligible', label: 'Auto-eligible' },
]

export default function JobQueue({ jobs, evaluations, selectedId, onSelect }) {
  const [tab, setTab] = useState('all')
  const visible = jobs.filter((j) => tab === 'all' || evaluations[j.id].status === tab)

  return (
    <div style={{ width: 380, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'var(--white)' }}>
      <div style={{ padding: '14px 14px 10px', borderBottom: '1px solid var(--border)' }}>
        <div className="eyebrow">Incoming from email</div>
        <div style={{ fontWeight: 700, fontSize: 16, marginTop: 2 }}>Job Queue</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          {tabs.map((t) => {
            const count = jobs.filter((j) => t.key === 'all' || evaluations[j.id].status === t.key).length
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="btn"
                style={{
                  fontSize: 12,
                  padding: '5px 10px',
                  background: tab === t.key ? 'var(--navy)' : '#f2f4f7',
                  color: tab === t.key ? 'var(--white)' : 'var(--body)',
                }}
              >
                {t.label} <span style={{ opacity: 0.7 }}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {visible.map((job) => (
          <JobRow
            key={job.id}
            job={job}
            evaluation={evaluations[job.id]}
            selected={job.id === selectedId}
            onClick={() => onSelect(job.id)}
          />
        ))}
        {visible.length === 0 && (
          <div style={{ padding: 20, color: 'var(--muted)', fontSize: 13 }}>No jobs in this view.</div>
        )}
      </div>
    </div>
  )
}
