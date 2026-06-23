export const statusMeta = {
  'auto-eligible': { label: 'Auto-assign eligible', tone: 'tone-ok' },
  conflict: { label: 'Needs your call', tone: 'tone-warn' },
  gated: { label: 'Manual review required', tone: 'tone-danger' },
  'no-match': { label: 'No rule match', tone: 'tone-neutral' },
}

export function urgencyTone(days) {
  if (days <= 3) return 'tone-danger'
  if (days <= 6) return 'tone-warn'
  return 'tone-neutral'
}
