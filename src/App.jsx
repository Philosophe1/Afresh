import { useState } from 'react'
import TodaysTasks from './screens/TodaysTasks'
import PreSessionSummary from './screens/PreSessionSummary'
import OrderReview from './screens/OrderReview'
import InventoryCount from './screens/InventoryCount'
import InventoryCountSteps from './screens/InventoryCountSteps'

export default function App() {
  const [screen, setScreen] = useState('tasks')
  const [countDone, setCountDone] = useState(false)
  const [countStats, setCountStats] = useState(null)
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const [submitTime, setSubmitTime] = useState('')

  const handleOrderSubmit = () => {
    const now = new Date()
    const h = now.getHours()
    const m = now.getMinutes().toString().padStart(2, '0')
    const ampm = h >= 12 ? 'pm' : 'am'
    setSubmitTime(`${h % 12 || 12}:${m} ${ampm}`)
    setOrderSubmitted(true)
    setScreen('tasks')
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--card-bg)',
      overflow: 'hidden', position: 'relative',
    }}>
      {screen === 'tasks' && (
        <TodaysTasks
          countDone={countDone}
          countStats={countStats}
          orderSubmitted={orderSubmitted}
          submitTime={submitTime}
          onStartCount={() => setScreen('preSession')}
          onViewOrder={() => setScreen('orderReview')}
        />
      )}
      {screen === 'preSession' && (
        <PreSessionSummary
          onBack={() => setScreen('tasks')}
          onStartCount={() => setScreen('countSteps')}
        />
      )}
      {screen === 'countSteps' && (
        <InventoryCountSteps
          onBack={() => setScreen('preSession')}
          onTargetedList={() => setScreen('inventoryCount')}
        />
      )}
      {screen === 'inventoryCount' && (
        <InventoryCount
          onBack={() => setScreen('countSteps')}
          onDone={stats => { setCountDone(true); setCountStats(stats); setScreen('tasks') }}
        />
      )}
      {screen === 'orderReview' && (
        <OrderReview
          onBack={() => setScreen('tasks')}
          onSubmit={handleOrderSubmit}
        />
      )}
    </div>
  )
}
