import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './TutorialPage.css'

const TutorialPage = () => {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)
  const [showSignupDropdown, setShowSignupDropdown] = useState(false)
  const [showTranslationDropdown, setShowTranslationDropdown] = useState(false)
  const navigate = useNavigate()

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLoginDropdown && !event.target.closest('.login-dropdown-container')) {
        setShowLoginDropdown(false)
      }
      if (showSignupDropdown && !event.target.closest('.signup-dropdown-container')) {
        setShowSignupDropdown(false)
      }
      if (showTranslationDropdown && !event.target.closest('.translation-dropdown-container')) {
        setShowTranslationDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showLoginDropdown, showSignupDropdown, showTranslationDropdown])

  const handleLoginOption = (type) => {
    setShowLoginDropdown(false)
    if (type === 'individual') {
      navigate('/individual-login')
    } else {
      navigate('/organization-login')
    }
  }

  const handleSignupOption = (type) => {
    setShowSignupDropdown(false)
    if (type === 'individual') {
      navigate('/individual-register')
    } else {
      navigate('/organization-register')
    }
  }

  const handleLanguageSelect = (language) => {
    setShowTranslationDropdown(false)
    console.log('Selected language:', language)
    // Handle language change here
  }

  const handleGetStarted = () => {
    navigate('/guest-user')
  }

  // Indian languages list
  const indianLanguages = [
    'Hindi',
    'Bengali',
    'Telugu',
    'Marathi',
    'Tamil',
    'Urdu',
    'Gujarati',
    'Kannada',
    'Odia',
    'Malayalam',
    'Punjabi',
    'Assamese',
    'Maithili',
    'Santali',
    'Kashmiri',
    'Nepali',
    'Sindhi',
    'Konkani',
    'Dogri',
    'Manipuri',
    'Bodo',
    'Sanskrit'
  ]

  return (
    <div className="tutorial-container">
      {/* Header */}
      <div className="tutorial-header">
        <div className="header-left">
          <img src="/logos/logo.png" alt="ReZoom Logo" className="header-logo" onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextElementSibling.style.display = 'flex'
          }} />
          <div className="logo-placeholder-header" style={{ display: 'none' }}>RZ</div>
        </div>
        
        <div className="header-nav">
          <span>About</span>
          <span>Features</span>
          <span>FAQs</span>
          <span>Contact Us</span>
        </div>

        {/* Header Buttons */}
        <div className="header-buttons">
          {/* Translation Dropdown */}
          <div className="translation-dropdown-container">
            <button 
              className="translation-btn-header"
              onClick={() => setShowTranslationDropdown(!showTranslationDropdown)}
            >
              🌐 Language
            </button>
            
            {showTranslationDropdown && (
              <div className="translation-dropdown-menu">
                <button 
                  className="translation-option"
                  onClick={() => handleLanguageSelect('english')}
                >
                  English
                </button>
                {indianLanguages.map((language, index) => (
                  <button 
                    key={index}
                    className="translation-option"
                    onClick={() => handleLanguageSelect(language.toLowerCase())}
                  >
                    {language}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Login Dropdown */}
          <div className="login-dropdown-container">
            <button 
              className="login-btn-header"
              onClick={() => setShowLoginDropdown(!showLoginDropdown)}
            >
              LOGIN
            </button>
            
            {showLoginDropdown && (
              <div className="login-dropdown-menu">
                <button 
                  className="login-option"
                  onClick={() => handleLoginOption('individual')}
                >
                  Individual Login
                </button>
                <button 
                  className="login-option"
                  onClick={() => handleLoginOption('organization')}
                >
                  Organization Login
                </button>
              </div>
            )}
          </div>

          {/* Signup Dropdown */}
          <div className="signup-dropdown-container">
            <button 
              className="signup-btn-header"
              onClick={() => setShowSignupDropdown(!showSignupDropdown)}
            >
              SIGNUP
            </button>
            
            {showSignupDropdown && (
              <div className="signup-dropdown-menu">
                <button 
                  className="signup-option"
                  onClick={() => handleSignupOption('individual')}
                >
                  Individual Signup
                </button>
                <button 
                  className="signup-option"
                  onClick={() => handleSignupOption('organization')}
                >
                  Organization Signup
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content - Swapped positions */}
      <div className="tutorial-content">
        <div className="content-left">
          <div className="video-container">
            <div className="video-placeholder">
              <svg viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none"/>
                <polygon points="45,35 45,65 65,50" fill="currentColor"/>
              </svg>
              <p>Play Tutorial Video</p>
            </div>
            {/* You can add an actual video here */}
            {/* <video controls style={{ width: '100%', height: 'auto', borderRadius: '20px' }}>
              <source src="/tutorial-video.mp4" type="video/mp4" />
            </video> */}
          </div>
        </div>

        <div className="content-right">
          <h1>Welcome to ReZoom</h1>
          <p className="subtitle">Your Career Partner</p>
          <p className="description">
            Build professional resumes, check ATS scores, and connect with the best opportunities.
            Get started with our interactive tutorial below.
          </p>
          <button className="get-started-btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <h3>Resume Builder</h3>
            <p>Create professional resumes with voice input</p>
          </div>

          <div className="feature-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            <h3>ATS Score Checker</h3>
            <p>Optimize your resume to pass ATS filters</p>
          </div>

          <div className="feature-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <h3>Career Insights</h3>
            <p>Get personalized career recommendations</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorialPage