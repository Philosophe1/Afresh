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
      height: '844px',
      maxHeight: '100dvh',
      background: 'var(--card-bg)',
      borderRadius: 36,
      overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.30), 0 0 0 1px rgba(0,0,0,0.06)',
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
