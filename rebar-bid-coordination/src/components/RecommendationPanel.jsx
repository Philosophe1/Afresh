import { useState } from 'react'
import { team } from '../data/jobs'

const overrideReasons = [
  'Missed detail in extraction',
  'Workload balancing',
  'Relationship / ownership of prior phase',
  'Other',
]

function Reason({ children }) {
  return <div style={{ fontSize: 13, color: 'var(--body)', marginTop: 4 }}>{children}</div>
}

function CandidateCard({ label, reason, primary, onAssign }) {
  return (
    <div className="card" style={{ padding: 14, display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>
          {label}
          {primary && <span className="pill tone-info" style={{ marginLeft: 8 }}>Suggested</span>}
        </div>
        <Reason>{reason}</Reason>
      </div>
      <button className="btn btn-primary" style={{ flexShrink: 0 }} onClick={onAssign}>Assign</button>
    </div>
  )
}

export default function RecommendationPanel({ job, evaluation, assignment, onAssign }) {
  const [reviewed, setReviewed] = useState(false)
  const [overridePick, setOverridePick] = useState('')
  const [overrideReason, setOverrideReason] = useState('')
  const { status, suggestion, matches, advisories, gates, continuity } = evaluation

  if (assignment) {
    return (
      <div className="card" style={{ padding: 16, background: 'var(--ok-bg)', borderColor: '#abefc6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--ok)' }}>
              {assignment.via === 'auto' ? 'Auto-assigned' : assignment.via === 'override' ? 'Assigned (override)' : 'Assigned'}
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, marginTop: 2 }}>{assignment.target}</div>
            {assignment.overrideReason && <Reason>Reason: {assignment.overrideReason}</Reason>}
          </div>
          <span className="pill tone-ok">Done</span>
        </div>
      </div>
    )
  }

  const needsReviewCheck = gates.length > 0
  const blocked = needsReviewCheck && !reviewed

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {gates.map((g) => (
        <div key={g.id} className="card" style={{ padding: 14, background: 'var(--danger-bg)', borderColor: '#fda29b' }}>
          <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--danger)' }}>
            {g.id === 'federal' ? 'Federal job — manual review required' : 'Low extraction confidence'}
          </div>
          <Reason>{g.reason}</Reason>
        </div>
      ))}

      {continuity && (
        <CandidateCard
          label={continuity.target}
          reason={continuity.reason}
          primary
          onAssign={() => onAssign({ target: continuity.target, via: 'auto' })}
        />
      )}

      {!continuity && status === 'no-match' && (
        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>No rule matched this job</div>
          <Reason>None of the 10 assignment rules apply. Falls back to the general queue for manual triage.</Reason>
          <button
            className="btn btn-secondary"
            style={{ marginTop: 10 }}
            onClick={() => onAssign({ target: team.general, via: 'override' })}
          >
            Send to general queue
          </button>
        </div>
      )}

      {!continuity && matches.length > 0 && (
        <>
          {matches.length > 1 && (
            <div style={{ fontSize: 13, color: 'var(--body)' }}>
              <strong>{matches.length} rules apply and disagree</strong> — review before assigning rather than trusting the top suggestion blindly.
            </div>
          )}
          {matches.map((m) => (
            <CandidateCard
              key={m.id}
              label={m.target}
              reason={m.reason}
              primary={m.id === suggestion?.via}
              onAssign={() => {
                if (blocked) return
                onAssign({ target: m.target, via: matches.length > 1 ? 'override' : 'auto', overrideReason: matches.length > 1 ? `Selected from ${matches.length} matching rules` : undefined })
              }}
            />
          ))}
        </>
      )}

      {advisories.map((a) => (
        <div key={a.id} className="card" style={{ padding: 12, background: '#fffaeb', borderColor: '#fec84b' }}>
          <Reason><strong style={{ color: 'var(--warn)' }}>Note —</strong> {a.reason}</Reason>
        </div>
      ))}

      {needsReviewCheck && (
        <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: 'var(--body)' }}>
          <input type="checkbox" checked={reviewed} onChange={(e) => setReviewed(e.target.checked)} style={{ marginTop: 2 }} />
          I've reviewed the plan set and the fields above are correct.
        </label>
      )}

      <div className="card" style={{ padding: 14 }}>
        <div style={{ fontWeight: 600, fontSize: 13 }}>Assign to someone else</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          <select
            value={overridePick}
            onChange={(e) => setOverridePick(e.target.value)}
            style={{ flex: '1 1 200px', padding: '7px 8px', borderRadius: 'var(--radius-control)', border: '1px solid var(--border)' }}
          >
            <option value="">Choose estimator / team…</option>
            {Object.values(team).map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select
            value={overrideReason}
            onChange={(e) => setOverrideReason(e.target.value)}
            style={{ flex: '1 1 200px', padding: '7px 8px', borderRadius: 'var(--radius-control)', border: '1px solid var(--border)' }}
          >
            <option value="">Reason for change…</option>
            {overrideReasons.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <button
            className="btn btn-secondary"
            disabled={!overridePick || !overrideReason || blocked}
            onClick={() => onAssign({ target: overridePick, via: 'override', overrideReason })}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
