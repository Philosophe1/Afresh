import { useMemo, useState } from 'react'
import TopBar from './components/TopBar'
import JobQueue from './components/JobQueue'
import JobDetail from './components/JobDetail'
import RulesView from './components/RulesView'
import MetricsStrip from './components/MetricsStrip'
import { jobs } from './data/jobs'
import { evaluateJob } from './lib/ruleEngine'

export default function App() {
  const [view, setView] = useState('queue')
  const [selectedId, setSelectedId] = useState(jobs[0].id)
  const [assignments, setAssignments] = useState({})

  const evaluations = useMemo(() => {
    const out = {}
    for (const j of jobs) out[j.id] = evaluateJob(j)
    return out
  }, [])

  const selectedJob = jobs.find((j) => j.id === selectedId)

  const handleAssign = (jobId, { target, via, overrideReason }) => {
    setAssignments((prev) => ({ ...prev, [jobId]: { target, via, overrideReason } }))
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar view={view} onView={setView} />
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {view === 'queue' && (
          <>
            <JobQueue
              jobs={jobs}
              evaluations={evaluations}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
            {selectedJob && (
              <JobDetail
                job={selectedJob}
                evaluation={evaluations[selectedJob.id]}
                assignment={assignments[selectedJob.id]}
                onAssign={handleAssign}
              />
            )}
          </>
        )}
        {view === 'rules' && <RulesView />}
        {view === 'metrics' && <MetricsStrip jobs={jobs} evaluations={evaluations} />}
      </div>
    </div>
  )
}
