import { useState, useEffect, useMemo } from 'react'
import Papa from 'papaparse'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ScatterChart, Scatter, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  LineChart, Line
} from 'recharts'

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#84cc16']

const fmt = (n, decimals = 1) => typeof n === 'number' ? n.toFixed(decimals) : n

function StatCard({ title, value, sub, color = '#6366f1' }) {
  return (
    <div style={{
      background: '#1e1e2e', border: `1px solid ${color}33`, borderRadius: 12,
      padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 4
    }}>
      <div style={{ color: '#888', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{title}</div>
      <div style={{ color, fontSize: 28, fontWeight: 700 }}>{value}</div>
      {sub && <div style={{ color: '#666', fontSize: 12 }}>{sub}</div>}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ color: '#a5b4fc', fontSize: 18, fontWeight: 600, marginBottom: 20, borderBottom: '1px solid #333', paddingBottom: 10 }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function groupBy(data, key, valueKey, agg = 'mean') {
  const groups = {}
  data.forEach(row => {
    const k = row[key]
    if (!groups[k]) groups[k] = []
    groups[k].push(Number(row[valueKey]))
  })
  return Object.entries(groups).map(([name, vals]) => {
    const total = vals.reduce((a, b) => a + b, 0)
    return {
      name,
      value: agg === 'mean' ? total / vals.length : total,
      count: vals.length
    }
  }).sort((a, b) => b.value - a.value)
}

function countBy(data, key) {
  const counts = {}
  data.forEach(row => {
    const k = row[key]
    counts[k] = (counts[k] || 0) + 1
  })
  return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#1e1e2e', border: '1px solid #444', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
      <div style={{ color: '#ccc', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>{p.name}: {fmt(p.value, 2)}</div>
      ))}
    </div>
  )
}

export default function AIDashboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({ industry: 'All', country: 'All', education: 'All' })
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    Papa.parse('/ai_jobs.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: ({ data }) => {
        setData(data.filter(r => r.Employee_ID))
        setLoading(false)
      }
    })
  }, [])

  const industries = useMemo(() => ['All', ...new Set(data.map(d => d.Industry))].sort(), [data])
  const countries = useMemo(() => ['All', ...new Set(data.map(d => d.Country))].sort(), [data])
  const educations = useMemo(() => ['All', 'High School', 'Bachelor', 'Master', 'PhD'], [])

  const filtered = useMemo(() => data.filter(r =>
    (filter.industry === 'All' || r.Industry === filter.industry) &&
    (filter.country === 'All' || r.Country === filter.country) &&
    (filter.education === 'All' || r.Education_Level === filter.education)
  ), [data, filter])

  const stats = useMemo(() => {
    if (!filtered.length) return {}
    const avgRisk = filtered.reduce((s, r) => s + Number(r.AI_Replacement_Risk), 0) / filtered.length
    const avgSalary = filtered.reduce((s, r) => s + Number(r.Average_Salary_USD), 0) / filtered.length
    const avgDemand = filtered.reduce((s, r) => s + Number(r.Future_Demand_Score), 0) / filtered.length
    const avgGrowth = filtered.reduce((s, r) => s + Number(r.Job_Growth_2030), 0) / filtered.length
    const needUpskill = filtered.filter(r => r.Upskilling_Needed === 'Yes').length
    return { avgRisk, avgSalary, avgDemand, avgGrowth, needUpskill, total: filtered.length }
  }, [filtered])

  const riskByJob = useMemo(() => groupBy(filtered, 'Job_Title', 'AI_Replacement_Risk'), [filtered])
  const salaryByIndustry = useMemo(() => groupBy(filtered, 'Industry', 'Average_Salary_USD'), [filtered])
  const demandByJob = useMemo(() => groupBy(filtered, 'Job_Title', 'Future_Demand_Score'), [filtered])
  const growthByIndustry = useMemo(() => groupBy(filtered, 'Industry', 'Job_Growth_2030'), [filtered])
  const hiringTrend = useMemo(() => countBy(filtered, 'Hiring_Trend_2026'), [filtered])
  const automationLevel = useMemo(() => countBy(filtered, 'Automation_Level'), [filtered])
  const remoteWork = useMemo(() => countBy(filtered, 'Remote_Work_Possibility'), [filtered])
  const aiToolUsage = useMemo(() => countBy(filtered, 'AI_Tool_Usage'), [filtered])

  const salaryByEducation = useMemo(() => {
    const order = ['High School', 'Bachelor', 'Master', 'PhD']
    return order.map(edu => {
      const rows = filtered.filter(r => r.Education_Level === edu)
      const avg = rows.length ? rows.reduce((s, r) => s + Number(r.Average_Salary_USD), 0) / rows.length : 0
      return { name: edu, salary: avg, count: rows.length }
    })
  }, [filtered])

  const riskVsDemandSample = useMemo(() => {
    const sample = filtered.slice(0, 500)
    return sample.map(r => ({
      risk: Number(r.AI_Replacement_Risk),
      demand: Number(r.Future_Demand_Score),
      salary: Number(r.Average_Salary_USD),
      job: r.Job_Title
    }))
  }, [filtered])

  const skillsData = useMemo(() => {
    const counts = {}
    filtered.forEach(r => {
      if (!r.Required_Skills) return
      r.Required_Skills.split(',').forEach(s => {
        const skill = s.trim()
        if (skill) counts[skill] = (counts[skill] || 0) + 1
      })
    })
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 15)
  }, [filtered])

  const riskByExperience = useMemo(() => {
    const buckets = { '0-5': [], '6-10': [], '11-15': [], '16-20': [], '21+': [] }
    filtered.forEach(r => {
      const exp = Number(r.Years_Experience)
      if (exp <= 5) buckets['0-5'].push(r)
      else if (exp <= 10) buckets['6-10'].push(r)
      else if (exp <= 15) buckets['11-15'].push(r)
      else if (exp <= 20) buckets['16-20'].push(r)
      else buckets['21+'].push(r)
    })
    return Object.entries(buckets).map(([range, rows]) => ({
      range,
      avgRisk: rows.length ? rows.reduce((s, r) => s + Number(r.AI_Replacement_Risk), 0) / rows.length : 0,
      avgSalary: rows.length ? rows.reduce((s, r) => s + Number(r.Average_Salary_USD), 0) / rows.length : 0,
      count: rows.length
    }))
  }, [filtered])

  const tabs = ['overview', 'risk', 'salary', 'skills', 'trends']

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0f0f1a', color: '#a5b4fc', fontSize: 18 }}>
        Loading dataset...
      </div>
    )
  }

  const selectStyle = {
    background: '#1e1e2e', border: '1px solid #444', borderRadius: 8,
    color: '#ccc', padding: '6px 12px', fontSize: 13, cursor: 'pointer'
  }

  const tabStyle = (t) => ({
    padding: '8px 20px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500,
    background: activeTab === t ? '#6366f1' : 'transparent',
    color: activeTab === t ? '#fff' : '#888',
    border: 'none', transition: 'all 0.2s'
  })

  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0' }}>
      {/* Header */}
      <div style={{ background: '#13131f', borderBottom: '1px solid #2a2a3e', padding: '20px 40px' }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#a5b4fc' }}>
          AI Impact on Jobs 2030
        </h1>
        <p style={{ margin: '4px 0 0', color: '#666', fontSize: 13 }}>
          {data.length.toLocaleString()} workers across {new Set(data.map(d => d.Country)).size} countries
        </p>
      </div>

      {/* Filters */}
      <div style={{ background: '#13131f', borderBottom: '1px solid #2a2a3e', padding: '12px 40px', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ color: '#666', fontSize: 13 }}>Filter:</span>
        <select style={selectStyle} value={filter.industry} onChange={e => setFilter(f => ({ ...f, industry: e.target.value }))}>
          {industries.map(i => <option key={i}>{i}</option>)}
        </select>
        <select style={selectStyle} value={filter.country} onChange={e => setFilter(f => ({ ...f, country: e.target.value }))}>
          {countries.map(c => <option key={c}>{c}</option>)}
        </select>
        <select style={selectStyle} value={filter.education} onChange={e => setFilter(f => ({ ...f, education: e.target.value }))}>
          {educations.map(e => <option key={e}>{e}</option>)}
        </select>
        <span style={{ color: '#555', fontSize: 12, marginLeft: 8 }}>Showing {filtered.length.toLocaleString()} records</span>
      </div>

      {/* Tabs */}
      <div style={{ padding: '16px 40px 0', display: 'flex', gap: 8 }}>
        {tabs.map(t => <button key={t} style={tabStyle(t)} onClick={() => setActiveTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>)}
      </div>

      <div style={{ padding: '24px 40px 60px' }}>
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
              <StatCard title="Avg AI Risk" value={`${(stats.avgRisk * 100).toFixed(1)}%`} sub="replacement probability" color="#ef4444" />
              <StatCard title="Avg Salary" value={`$${(stats.avgSalary / 1000).toFixed(0)}K`} sub="USD per year" color="#10b981" />
              <StatCard title="Future Demand" value={fmt(stats.avgDemand)} sub="score 0–1" color="#6366f1" />
              <StatCard title="Job Growth 2030" value={`${stats.avgGrowth > 0 ? '+' : ''}${fmt(stats.avgGrowth)}%`} sub="projected" color="#f59e0b" />
              <StatCard title="Need Upskilling" value={`${((stats.needUpskill / stats.total) * 100).toFixed(0)}%`} sub={`${stats.needUpskill.toLocaleString()} workers`} color="#8b5cf6" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <Section title="Hiring Trend 2026">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={hiringTrend} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {hiringTrend.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v) => v.toLocaleString()} />
                  </PieChart>
                </ResponsiveContainer>
              </Section>

              <Section title="Automation Level Distribution">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={automationLevel} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {automationLevel.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v) => v.toLocaleString()} />
                  </PieChart>
                </ResponsiveContainer>
              </Section>

              <Section title="Remote Work Possibility">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={remoteWork}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                    <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#888', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Section>

              <Section title="AI Tool Usage">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={aiToolUsage}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                    <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#888', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Section>
            </div>
          </>
        )}

        {/* RISK */}
        {activeTab === 'risk' && (
          <>
            <Section title="AI Replacement Risk by Job Title (avg)">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={riskByJob} layout="vertical" margin={{ left: 140 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                  <XAxis type="number" domain={[0, 1]} tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#ccc', fontSize: 12 }} width={140} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Avg Risk" fill="#ef4444" radius={[0, 4, 4, 0]}
                    label={{ position: 'right', fill: '#888', fontSize: 11, formatter: v => fmt(v, 2) }} />
                </BarChart>
              </ResponsiveContainer>
            </Section>

            <Section title="AI Risk vs Future Demand Score (sample of 500)">
              <ResponsiveContainer width="100%" height={350}>
                <ScatterChart margin={{ top: 10, right: 30, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                  <XAxis dataKey="risk" name="AI Risk" type="number" domain={[0, 1]} tick={{ fill: '#888', fontSize: 12 }} label={{ value: 'AI Replacement Risk', position: 'insideBottom', fill: '#666', offset: -10 }} />
                  <YAxis dataKey="demand" name="Future Demand" type="number" domain={[0, 1]} tick={{ fill: '#888', fontSize: 12 }} label={{ value: 'Future Demand Score', angle: -90, position: 'insideLeft', fill: '#666' }} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                    if (!active || !payload?.length) return null
                    const d = payload[0].payload
                    return (
                      <div style={{ background: '#1e1e2e', border: '1px solid #444', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
                        <div style={{ color: '#a5b4fc', fontWeight: 600 }}>{d.job}</div>
                        <div>Risk: {fmt(d.risk, 2)}</div>
                        <div>Demand: {fmt(d.demand, 2)}</div>
                        <div>Salary: ${d.salary.toLocaleString()}</div>
                      </div>
                    )
                  }} />
                  <Scatter data={riskVsDemandSample} fill="#6366f1" fillOpacity={0.5} />
                </ScatterChart>
              </ResponsiveContainer>
            </Section>

            <Section title="AI Risk by Years of Experience">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={riskByExperience}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                  <XAxis dataKey="range" tick={{ fill: '#888', fontSize: 12 }} label={{ value: 'Years Experience', position: 'insideBottom', fill: '#666', offset: -8 }} />
                  <YAxis yAxisId="left" domain={[0, 1]} tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#888', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: '#888' }} />
                  <Line yAxisId="left" type="monotone" dataKey="avgRisk" name="Avg AI Risk" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} />
                </LineChart>
              </ResponsiveContainer>
            </Section>
          </>
        )}

        {/* SALARY */}
        {activeTab === 'salary' && (
          <>
            <Section title="Average Salary by Industry">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={salaryByIndustry} layout="vertical" margin={{ left: 120 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                  <XAxis type="number" tick={{ fill: '#888', fontSize: 12 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#ccc', fontSize: 12 }} width={120} />
                  <Tooltip content={<CustomTooltip />} formatter={v => [`$${v.toLocaleString()}`, 'Avg Salary']} />
                  <Bar dataKey="value" name="Avg Salary" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Section>

            <Section title="Salary by Education Level">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={salaryByEducation}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                  <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#888', fontSize: 12 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} formatter={v => [`$${Number(v).toLocaleString()}`, 'Avg Salary']} />
                  <Bar dataKey="salary" name="Avg Salary" fill="#3b82f6" radius={[4, 4, 0, 0]}
                    label={{ position: 'top', fill: '#888', fontSize: 11, formatter: v => `$${(v / 1000).toFixed(0)}K` }} />
                </BarChart>
              </ResponsiveContainer>
            </Section>

            <Section title="Salary vs AI Risk by Experience Bucket">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={riskByExperience}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                  <XAxis dataKey="range" tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fill: '#888', fontSize: 12 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: '#888' }} />
                  <Bar yAxisId="left" dataKey="avgSalary" name="Avg Salary" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Section>
          </>
        )}

        {/* SKILLS */}
        {activeTab === 'skills' && (
          <>
            <Section title="Top 15 Most Required Skills">
              <ResponsiveContainer width="100%" height={420}>
                <BarChart data={skillsData} layout="vertical" margin={{ left: 160 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                  <XAxis type="number" tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#ccc', fontSize: 12 }} width={160} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Occurrences" radius={[0, 4, 4, 0]}
                    label={{ position: 'right', fill: '#888', fontSize: 11 }}>
                    {skillsData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Section>

            <Section title="Future Demand Score by Job Title">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={demandByJob} layout="vertical" margin={{ left: 140 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                  <XAxis type="number" domain={[0, 1]} tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#ccc', fontSize: 12 }} width={140} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Avg Demand Score" fill="#8b5cf6" radius={[0, 4, 4, 0]}
                    label={{ position: 'right', fill: '#888', fontSize: 11, formatter: v => fmt(v, 2) }} />
                </BarChart>
              </ResponsiveContainer>
            </Section>
          </>
        )}

        {/* TRENDS */}
        {activeTab === 'trends' && (
          <>
            <Section title="Job Growth Projection to 2030 by Industry (avg %)">
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={growthByIndustry} layout="vertical" margin={{ left: 120 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                  <XAxis type="number" tick={{ fill: '#888', fontSize: 12 }} tickFormatter={v => `${v > 0 ? '+' : ''}${v.toFixed(0)}%`} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#ccc', fontSize: 12 }} width={120} />
                  <Tooltip content={<CustomTooltip />} formatter={v => [`${v > 0 ? '+' : ''}${fmt(v, 1)}%`, 'Avg Growth']} />
                  <Bar dataKey="value" name="Avg Growth" radius={[0, 4, 4, 0]}>
                    {growthByIndustry.map((entry, i) => <Cell key={i} fill={entry.value >= 0 ? '#10b981' : '#ef4444'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Section>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <Section title="Hiring Trend 2026">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={hiringTrend} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {hiringTrend.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v) => v.toLocaleString()} />
                    <Legend wrapperStyle={{ color: '#888', fontSize: 13 }} />
                  </PieChart>
                </ResponsiveContainer>
              </Section>

              <Section title="Upskilling Need by Automation Level">
                {(() => {
                  const d = ['Low', 'Medium', 'High'].map(level => {
                    const rows = filtered.filter(r => r.Automation_Level === level)
                    const need = rows.filter(r => r.Upskilling_Needed === 'Yes').length
                    return { name: level, pct: rows.length ? (need / rows.length) * 100 : 0, count: rows.length }
                  })
                  return (
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={d}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                        <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#888', fontSize: 12 }} tickFormatter={v => `${v.toFixed(0)}%`} />
                        <Tooltip content={<CustomTooltip />} formatter={v => [`${fmt(v, 1)}%`, 'Need Upskilling']} />
                        <Bar dataKey="pct" name="Need Upskilling %" fill="#f59e0b" radius={[4, 4, 0, 0]}
                          label={{ position: 'top', fill: '#888', fontSize: 11, formatter: v => `${fmt(v, 0)}%` }} />
                      </BarChart>
                    </ResponsiveContainer>
                  )
                })()}
              </Section>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
