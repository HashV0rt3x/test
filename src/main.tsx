import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Telegram Mini App initialization
const tg = (window as any).Telegram?.WebApp
if (tg) {
  tg.ready()
  tg.expand() // Full screen ochish
  tg.setHeaderColor('#0f0f13')
  tg.setBackgroundColor('#0f0f13')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
