import { useState } from 'react'
import TodaysTasks from './screens/TodaysTasks'
import OrderReview from './screens/OrderReview'

export default function App() {
  const [screen, setScreen] = useState('tasks')
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const [submitTime, setSubmitTime] = useState('')

  const handleOrderSubmit = () => {
    const now = new Date()
    const h = now.getHours()
    const m = now.getMinutes().toString().padStart(2, '0')
    const ampm = h >= 12 ? 'pm' : 'am'
    const h12 = h % 12 || 12
    setSubmitTime(`${h12}:${m} ${ampm}`)
    setOrderSubmitted(true)
    setScreen('tasks')
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'var(--card-bg)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {screen === 'tasks' && (
        <TodaysTasks
          orderSubmitted={orderSubmitted}
          submitTime={submitTime}
          onViewOrder={() => setScreen('orderReview')}
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
