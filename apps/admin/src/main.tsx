import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import App from './app'
import { ErrorBoundary } from './components/ErrorBoundary'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
)