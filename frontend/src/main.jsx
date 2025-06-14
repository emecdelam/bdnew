import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BDHomepageAntd from './components/BDHomepageAntd'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BDHomepageAntd />
  </StrictMode>,
)
