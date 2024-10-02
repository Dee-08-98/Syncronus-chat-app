import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import ContextApp from './ContextProvider/ContextApp.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <ContextApp>
    <Toaster/>
      <App />
      </ContextApp>
  // </StrictMode>
)
