import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import App from './App.tsx'
import { UIProvider } from './context/UIContext.tsx'
import { logger } from './utils/logger'

// Register service worker for PWA functionality on mobile
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        logger.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        logger.error('SW registration failed: ', registrationError);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UIProvider>
      <App />
      <SpeedInsights />
    </UIProvider>
  </StrictMode>,
)
