import ExtractedFields from './ExtractedFields'
import RecommendationPanel from './RecommendationPanel'
import { urgencyTone } from '../lib/statusMeta'

export default function JobDetail({ job, evaluation, assignment, onAssign }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
      <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <h1 style={{ fontSize: 19, fontWeight: 700, margin: 0 }}>{job.name}</h1>
            <span className={`pill ${urgencyTone(job.bidDueDays)}`}>Bid due in {job.bidDueDays}d</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>Job #{job.id} · pulled in from email automatically</div>
        </div>

        <ExtractedFields job={job} />

        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Assignment</div>
          <RecommendationPanel job={job} evaluation={evaluation} assignment={assignment} onAssign={(a) => onAssign(job.id, a)} />
        </div>
      </div>
    </div>
  )
}
