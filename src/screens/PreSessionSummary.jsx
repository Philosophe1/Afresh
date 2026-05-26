import { useState } from 'react'
import StatusBar from '../components/StatusBar'

/* ── icons ── */
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)
const HelpIcon = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5" />
  </svg>
)
const LeafIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="var(--green-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
)
const TeamIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const TrendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
)
const InfoIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2.5"/>
  </svg>
)

/* ── bar chart ── */
function BarChart({ weeklyData, barColor }) {
  const W = 284, H = 54
  const n = weeklyData.length
  const gap = 5
  const barW = (W - (n - 1) * gap) / n
  const maxVal = Math.max(...weeklyData)

  return (
    <div>
      <div style={{
        fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)',
        letterSpacing: '0.7px', textTransform: 'uppercase', marginBottom: 7,
      }}>
        Weekly total $ impact
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}>
        {weeklyData.map((v, i) => {
          const isLast = i === n - 1
          const barH = Math.max(4, (v / maxVal) * H)
          const x = i * (barW + gap)
          const y = H - barH
          return (
            <rect key={i}
              x={x.toFixed(1)} y={y.toFixed(1)}
              width={barW.toFixed(1)} height={barH.toFixed(1)}
              rx="3" ry="3"
              fill={barColor}
              fillOpacity={isLast ? 1 : 0.28}
            />
          )
        })}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>8 wks ago</span>
        <span style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 600 }}>This week</span>
      </div>
    </div>
  )
}

/* ── sparkline (used for low state trend card) ── */
function Sparkline({ userRates, avgRates, color = 'var(--green-primary)' }) {
  const W = 290, H = 52, PX = 6, PY = 6
  const all = [...userRates, ...avgRates]
  const lo = Math.min(...all) - 4
  const hi = Math.max(...all) + 4
  const n  = userRates.length

  const cx = i => PX + (i / (n - 1)) * (W - PX * 2)
  const cy = v => H - PY - ((v - lo) / (hi - lo)) * (H - PY * 2)
  const line = arr => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${cx(i).toFixed(1)},${cy(v).toFixed(1)}`).join(' ')

  const area = [
    `M${cx(0).toFixed(1)},${cy(userRates[0]).toFixed(1)}`,
    ...userRates.slice(1).map((v, i) => `L${cx(i + 1).toFixed(1)},${cy(v).toFixed(1)}`),
    `L${cx(n - 1).toFixed(1)},${H}`,
    `L${cx(0).toFixed(1)},${H}`,
    'Z',
  ].join(' ')

  const lastX = cx(n - 1)
  const lastY = cy(userRates[n - 1])

  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.12" />
            <stop offset="100%" stopColor={color} stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#areaGrad)" />
        <path d={line(avgRates)} fill="none" stroke="#CBD5E1" strokeWidth="1.5"
          strokeDasharray="4 3" strokeLinecap="round" />
        <path d={line(userRates)} fill="none" stroke={color} strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={lastX} cy={lastY} r="3.5" fill={color} />
        <circle cx={lastX} cy={lastY} r="6" fill={color} fillOpacity="0.18" />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>8 wks ago</span>
        <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>Now</span>
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <svg width="18" height="6"><line x1="0" y1="3" x2="18" y2="3"
            stroke={color} strokeWidth="2.2" strokeLinecap="round"/></svg>
          <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>You</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <svg width="18" height="6"><line x1="0" y1="3" x2="18" y2="3"
            stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 3"/></svg>
          <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Store avg</span>
        </div>
      </div>
    </div>
  )
}

/* ── impact stat row ── */
function ImpactRow({ label, value, color = 'var(--text-primary)' }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontSize: 15, fontWeight: 800, color, letterSpacing: '-0.3px' }}>{value}</span>
    </div>
  )
}

/* ── impact block: stats + optional bar chart ── */
function ImpactBlock({ waste, sales, textColor, lightBg, showChart, weeklyTotals, barColor }) {
  const total = waste + sales
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <ImpactRow label="Waste reduced"  value={`~$${waste.toLocaleString()}`} color={textColor} />
        <div style={{ height: 1, background: 'var(--border)' }} />
        <ImpactRow label="Sales gained"   value={`~$${sales.toLocaleString()}`} color={textColor} />
        <div style={{ height: 1, background: 'var(--border)' }} />
        {/* Total $ impact */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: lightBg, borderRadius: 9, padding: '7px 10px',
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
            Total $ impact
          </span>
          <span style={{ fontSize: 17, fontWeight: 800, color: textColor, letterSpacing: '-0.4px' }}>
            ~${total.toLocaleString()}
          </span>
        </div>
      </div>
      {showChart && weeklyTotals && (
        <div style={{ marginTop: 14 }}>
          <BarChart weeklyData={weeklyTotals} barColor={barColor} />
        </div>
      )}
    </>
  )
}

/* ── section card ── */
function SectionCard({ icon, title, accent, children }) {
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 14,
      padding: '13px 14px',
      marginBottom: 10,
      boxShadow: 'var(--shadow-sm)',
      borderLeft: `3px solid ${accent}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 9,
          background: `${accent}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {icon}
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}

/* ── trend status pill styles ── */
const TREND_STYLES = {
  above:   { bg: '#ECFDF5', color: '#065F46', label: 'above' },
  in_line: { bg: '#EFF6FF', color: '#1E40AF', label: 'in line with' },
  below:   { bg: '#FEF3C7', color: '#92400E', label: 'below' },
}

/* ── demo state data ── */
const STATES = {
  good: {
    performedEnough: true,
    personal: {
      waste: 247,
      sales: 183,
      weeklyTotals: [210, 240, 195, 285, 310, 290, 360, 430],
    },
    team: {
      waste: 1240,
      sales: 890,
      weeklyTotals: [1050, 1180, 980, 1380, 1510, 1420, 1720, 2130],
    },
  },
  low: {
    performedEnough: false,
    team: { waste: 1240, sales: 890 },
    trend: {
      status: 'below',
      userRates: [67, 63, 60, 57, 55, 54, 52, 49],
      avgRates:  [68, 68, 69, 70, 70, 71, 71, 72],
    },
  },
}

/* ── main screen ── */
export default function PreSessionSummary({ onBack, onStartCount }) {
  const [demoState, setDemoState] = useState('good')
  const data   = STATES[demoState]
  const trend  = data.trend
  const tStyle = trend ? TREND_STYLES[trend.status] : null
  const tColor = demoState === 'good' ? 'var(--green-primary)' : 'var(--amber)'

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', background: 'var(--page-bg)', position: 'relative',
    }}>
      <StatusBar time="9:30" />

      {/* Nav header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 12px 8px', gap: 4 }}>
        <button onClick={onBack} style={{ padding: 6, marginLeft: -4 }}><BackIcon /></button>
        <span style={{
          flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 700,
          color: 'var(--text-primary)', letterSpacing: '-0.3px',
        }}>
          Today's count
        </span>
        <button style={{ padding: 6 }}><HelpIcon /></button>
        <div style={{ width: 34 }} />
      </div>

      {/* Demo toggle */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 6, padding: '0 14px 8px',
      }}>
        <span style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Demo:
        </span>
        {[['good', 'High performer'], ['low', 'Needs improvement']].map(([key, label]) => (
          <button key={key} onClick={() => setDemoState(key)} style={{
            padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
            background: demoState === key ? 'var(--green-primary)' : 'transparent',
            color: demoState === key ? 'white' : 'var(--text-tertiary)',
            border: `1.5px solid ${demoState === key ? 'var(--green-primary)' : 'var(--border)'}`,
            transition: 'all 0.2s',
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 14px 90px' }}>

        <div style={{
          fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500,
          marginBottom: 12, textAlign: 'center',
        }}>
          Summary for week of May 19–25
        </div>

        {/* Personal impact (high performer only) */}
        {data.performedEnough && (
          <SectionCard
            icon={<LeafIcon />}
            title="Your impact last week"
            accent="var(--green-primary)"
          >
            <ImpactBlock
              waste={data.personal.waste}
              sales={data.personal.sales}
              textColor="var(--green-primary)"
              lightBg="var(--green-light)"
              showChart={true}
              weeklyTotals={data.personal.weeklyTotals}
              barColor="var(--green-primary)"
            />
          </SectionCard>
        )}

        {/* Team impact */}
        <SectionCard
          icon={<TeamIcon />}
          title="Your team's impact last week"
          accent="#6366F1"
        >
          <ImpactBlock
            waste={data.team.waste}
            sales={data.team.sales}
            textColor="#4F46E5"
            lightBg="#EEF2FF"
            showChart={data.performedEnough}
            weeklyTotals={data.team.weeklyTotals}
            barColor="#6366F1"
          />
        </SectionCard>

        {/* Trend card (low state only) */}
        {!data.performedEnough && trend && (
          <SectionCard
            icon={<TrendIcon />}
            title="Your adjustment trend (8 weeks)"
            accent={tColor}
          >
            <div style={{
              fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.45,
              marginBottom: 12,
            }}>
              Over the past 4 weeks, your adjustment rate on low- and medium-confidence items has been{' '}
              <span style={{
                background: tStyle.bg, color: tStyle.color,
                borderRadius: 5, padding: '1px 6px', fontWeight: 700, fontSize: 12,
              }}>
                {tStyle.label}
              </span>
              {' '}the store average.
            </div>

            <Sparkline userRates={trend.userRates} avgRates={trend.avgRates} color={tColor} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
              <div style={{
                background: tStyle.bg, borderRadius: 8,
                padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{ fontSize: 11, color: tStyle.color, fontWeight: 600 }}>
                  Current: {trend.userRates[trend.userRates.length - 1]}%
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                  vs avg {trend.avgRates[trend.avgRates.length - 1]}%
                </span>
              </div>
            </div>
          </SectionCard>
        )}

        {/* Disclaimer */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 7,
          background: 'var(--card-bg)', borderRadius: 10,
          padding: '10px 12px', marginBottom: 4,
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ flexShrink: 0, marginTop: 1 }}><InfoIcon /></div>
          <span style={{
            fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.5, fontStyle: 'italic',
          }}>
            Estimates are directional and based on historical patterns. Actual results can vary.
          </span>
        </div>

      </div>

      {/* Start count CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'white', borderTop: '1px solid var(--border)',
        padding: '11px 14px 16px',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
      }}>
        <button
          onClick={onStartCount}
          style={{
            width: '100%', padding: '14px',
            borderRadius: 28, background: 'var(--green-primary)', color: 'white',
            fontSize: 15, fontWeight: 700, letterSpacing: '-0.2px',
          }}
        >
          Start count
        </button>
      </div>
    </div>
  )
}
