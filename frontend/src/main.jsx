import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

// --- NEW IMPORTS ---
import './styles/fonts.css'    // Import your fonts (if you created this file)
import './styles/theme.css'    // Import your new design system
import './styles/resume-templates.css'  // Resume template styles
import './styles/ats-enhancements.css'  // ATS and template enhancements
import './styles/form-fixes.css'  // Form text visibility fixes
// --- END NEW IMPORTS ---

import './styles/index.css'    // Keep this last for cascading

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

