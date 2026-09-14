import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SearchPanelDebugPage from './pages/search-panel-debug'

const isSearchPanelDebugPage =
  window.location.pathname.replace(/\/+$/, '') === '/debug/search-panel'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isSearchPanelDebugPage ? <SearchPanelDebugPage /> : <App />}
  </StrictMode>,
)
