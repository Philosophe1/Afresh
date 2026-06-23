import { team } from '../data/jobs.js'

const hasEquip = (job, keyword) =>
  job.equipment.some((e) => e.toLowerCase().includes(keyword.toLowerCase()))

const isGrdOnly = (job) =>
  job.equipment.length === 1 && hasEquip(job, 'grd')

// Each rule either names a routing candidate (kind: 'route') or is an
// advisory note that doesn't point at a person/team (kind: 'advisory').
const rules = [
  {
    id: 'value',
    kind: 'route',
    target: team.senior,
    test: (j) => typeof j.estValue === 'number' && j.estValue > 250000,
    reason: (j) => `Equipment value is $${j.estValue.toLocaleString()}, above the $250,000 senior-estimator threshold.`,
  },
  {
    id: 'healthcare',
    kind: 'route',
    target: team.healthcare,
    test: (j) => ['Hospital', 'Lab'].includes(j.buildingType),
    reason: (j) => `Building type is ${j.buildingType} — hospital/lab projects route to the healthcare specialist.`,
  },
  {
    id: 'spiral',
    kind: 'route',
    target: team.spiral,
    test: (j) => j.ductType === 'Spiral' && j.branch !== 'Branch West',
    reason: () => `Duct type is spiral, and the job isn't in Branch West.`,
  },
  {
    id: 'grd',
    kind: 'route',
    target: team.smallJobs,
    test: (j) => isGrdOnly(j) && typeof j.estValue === 'number' && j.estValue < 25000,
    reason: (j) => `Equipment is GRDs only and value ($${j.estValue.toLocaleString()}) is under $25,000.`,
  },
  {
    id: 'contractorX',
    kind: 'route',
    target: team.dallasTeam,
    test: (j) => j.contractor === 'Contractor X',
    reason: () => `Contractor is Contractor X — always routes to the Dallas team, regardless of branch.`,
  },
  {
    id: 'school',
    kind: 'route',
    target: team.schools,
    test: (j) => j.buildingType === 'School' && j.branch === 'North Texas',
    reason: () => `Building type is School and branch is North Texas.`,
  },
  {
    id: 'bundle',
    kind: 'route',
    target: team.commercialApplied,
    test: (j) => hasEquip(j, 'fan') && hasEquip(j, 'rtu') && hasEquip(j, 'duct accessor'),
    reason: () => `Equipment includes fans + RTUs + duct accessories — the commercial-applied equipment bundle.`,
  },
  {
    id: 'designBuild',
    kind: 'advisory',
    test: (j) => j.isDesignBuild && j.bidDueDays <= 5,
    reason: (j) => `Design-build with bid due in ${j.bidDueDays} day${j.bidDueDays === 1 ? '' : 's'} — speed may matter more here than a perfect specialization match.`,
  },
]

// Continuity and the Federal gate are handled outside the rule list because
// they don't behave like the other rules: continuity overrides routing
// entirely, and Federal forces manual review no matter what else matches.
function evaluateContinuity(job) {
  if (job.isAddendumOnly && job.existingEstimator) {
    return {
      target: job.existingEstimator,
      reason: `Addendum-only update on a job ${job.existingEstimator} already owns — stays with the original estimator.`,
    }
  }
  return null
}

export function evaluateJob(job) {
  const continuity = evaluateContinuity(job)
  const matches = rules
    .filter((r) => r.kind === 'route' && r.test(job))
    .map((r) => ({ id: r.id, target: r.target, reason: r.reason(job) }))
  const advisories = rules
    .filter((r) => r.kind === 'advisory' && r.test(job))
    .map((r) => ({ id: r.id, reason: r.reason(job) }))

  const lowConfidence = job.extraction.confidence < 0.6
  const gates = []
  if (job.isFederal) {
    gates.push({ id: 'federal', reason: 'Federal jobs always require manual review before assignment, regardless of confidence or routing match.' })
  }
  if (lowConfidence) {
    gates.push({ id: 'lowConfidence', reason: `Extraction confidence is only ${Math.round(job.extraction.confidence * 100)}% — key fields are missing or unclear, so this needs a human look before it can be routed at all.` })
  }

  let status
  let suggestion = null

  if (continuity) {
    status = gates.length ? 'gated' : 'auto-eligible'
    suggestion = { target: continuity.target, reason: continuity.reason, via: 'continuity' }
  } else if (gates.length > 0) {
    status = 'gated'
    suggestion = matches[0] ? { target: matches[0].target, reason: matches[0].reason, via: matches[0].id } : null
  } else if (matches.length === 0) {
    status = 'no-match'
  } else if (matches.length === 1) {
    status = 'auto-eligible'
    suggestion = { target: matches[0].target, reason: matches[0].reason, via: matches[0].id }
  } else {
    status = 'conflict'
    suggestion = { target: matches[0].target, reason: matches[0].reason, via: matches[0].id }
  }

  return { status, suggestion, matches, advisories, gates, continuity }
}
