import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../landing/LandingPage.css'

const LandingPage = () => {
  const [showLogo, setShowLogo] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Trigger logo animation
    setTimeout(() => setShowLogo(true), 300)
    
    // Auto-navigate to language selection after 4 seconds
    const timer = setTimeout(() => {
      navigate('/language-selection')
    }, 4000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="landing-container">
      <div className="logo-container">
        <div className="logo-background"></div>
        <img 
          src="/logos/logo.png" 
          alt="ReZoom Logo" 
          className="logo"
          onError={(e) => {
            // If logo doesn't exist, show placeholder
            e.target.style.display = 'none'
            e.target.nextElementSibling.style.display = 'flex'
          }}
        />
        <div className="logo-placeholder" style={{ display: 'none' }}>
          RZ
        </div>
      </div>
      
      {showLogo && (
        <div className="loading-text">
          Loading...
        </div>
      )}
    </div>
  )
}

export default LandingPage