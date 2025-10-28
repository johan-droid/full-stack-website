import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './GuestUserPage.css'

const GuestUserPage = () => {
  const navigate = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [currentView, setCurrentView] = useState('dashboard') // 'dashboard' or 'limited-features'

  const handleSignUp = () => {
    navigate('/tutorial')
  }

  const handleLogin = () => {
    navigate('/tutorial')
  }

  const handleVoiceBuilder = () => {
    navigate('/voice-builder')
  }

  const handleATSScore = () => {
    navigate('/ats-score')
  }

  const handleTemplates = () => {
    navigate('/templates')
  }

  return (
    <div className="user-home-container">
      {/* Header */}
      <div className="user-header">
        <div className="header-left">
          <img src="/logos/logo.png" alt="ReZoom Logo" className="header-logo" onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextElementSibling.style.display = 'flex'
          }} />
          <div className="logo-placeholder-header" style={{ display: 'none' }}>RZ</div>
          <h1 className="app-name">ReZoom</h1>
        </div>

        <div className="header-right">
          <div className="profile-dropdown">
            <button className="profile-btn" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Guest User
            </button>

            {showProfileMenu && (
              <div className="profile-dropdown-menu">
                <button className="profile-menu-item" onClick={() => {
                  setShowProfileMenu(false)
                  handleLogin()
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                  Login
                </button>
                <button className="profile-menu-item" onClick={() => {
                  setShowProfileMenu(false)
                  handleSignUp()
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                  Sign Up
                </button>
                <hr className="menu-divider" />
                <div className="profile-menu-item guest-notice">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <div>
                    <p style={{ fontWeight: '600', marginBottom: '0.3rem' }}>Guest Mode</p>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>Limited features available</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="navigation-tabs">
        <button 
          className={`nav-tab ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentView('dashboard')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          Dashboard
        </button>
        <button 
          className={`nav-tab ${currentView === 'limited-features' ? 'active' : ''}`}
          onClick={() => setCurrentView('limited-features')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
          Features
        </button>
      </div>

      {/* Main Content */}
      <div className="user-main-content">
        {currentView === 'dashboard' ? (
          <>
            <div className="welcome-section">
              <h2>Welcome, Guest User! 👋</h2>
              <p>Experience ReZoom with limited features. Sign up for full access!</p>
            </div>

            {/* Build with Voice Section */}
            <div className="voice-build-section">
              <button className="voice-build-btn" onClick={handleVoiceBuilder}>
                <span className="mic-emoji">🎤</span>
                <div className="voice-text">
                  <h3>Build with Voice</h3>
                  <p>Speak your details and let AI create your resume</p>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="arrow-icon">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            {/* Quick Actions - Limited Features Only */}
            <div className="quick-actions-section">
              <h3>Available Features</h3>
              <div className="quick-actions-grid">
                <div className="action-card" onClick={handleTemplates}>
                  <div className="action-icon">📄</div>
                  <h4>Resume Templates</h4>
                  <p>Choose from professional templates</p>
                </div>

                <div className="action-card" onClick={handleATSScore}>
                  <div className="action-icon">📊</div>
                  <h4>ATS Score</h4>
                  <p>Check and improve your resume score</p>
                </div>

                <div className="action-card disabled" onClick={() => alert('Sign up for full access!')}>
                  <div className="action-icon">📤</div>
                  <h4>Upload Resume</h4>
                  <p>Upload your existing resume</p>
                  <div className="LOCK">LOCK</div>
                </div>

                <div className="action-card disabled" onClick={() => alert('Sign up for full access!')}>
                  <div className="action-icon">✏️</div>
                  <h4>Edit Profile</h4>
                  <p>Update your personal information</p>
                  <div className="LOCK">LOCK</div>
                </div>
              </div>
            </div>

            {/* Guest Notice */}
            <div className="recent-activity-section">
              <h3>Get Full Access</h3>
              <div className="activity-card">
                <div className="activity-icon">⭐</div>
                <div className="activity-details">
                  <p>Sign up to unlock all features</p>
                  <span>Get access to profile management, job applications, and more!</span>
                </div>
                <button className="signup-cta-btn" onClick={handleSignUp}>
                  Sign Up Now
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="features-view">
            <div className="welcome-section">
              <h2>Available Features</h2>
              <p>These are the features you can use as a guest user</p>
            </div>

            <div className="features-grid">
              <div className="feature-card" onClick={handleVoiceBuilder}>
                <div className="feature-icon">🎤</div>
                <h3>Voice Builder</h3>
                <p>Create your resume using voice commands</p>
                <button className="feature-btn">Use Feature</button>
              </div>

              <div className="feature-card" onClick={handleATSScore}>
                <div className="feature-icon">📊</div>
                <h3>ATS Score Checker</h3>
                <p>Check how well your resume performs with ATS systems</p>
                <button className="feature-btn">Use Feature</button>
              </div>

              <div className="feature-card" onClick={handleTemplates}>
                <div className="feature-icon">📄</div>
                <h3>Resume Templates</h3>
                <p>Choose from professional resume templates</p>
                <button className="feature-btn">Use Feature</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GuestUserPage
