import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AIDashboard from './screens/AIDashboard.jsx'

createRoot(document.getElementById('dashboard-root')).render(
  <StrictMode>
    <AIDashboard />
  </StrictMode>
)
