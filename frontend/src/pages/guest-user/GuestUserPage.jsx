import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './GuestUserPage.css'

// UPDATED VOICE COMPONENT DEFINITION FOR VISIBILITY
export const Voice = (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}>
        <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4">
            <rect width="14" height="27" x="17" y="4" fill="currentColor" rx="7"></rect>
            <path strokeLinecap="round" d="M9 23c0 8.284 6.716 15 15 15c8.284 0 15-6.716 15-15M24 38v6"></path>
        </g>
      </svg>
)

// 2. REPLACED PAGE TEMPLATE COMPONENT
export const PageTemplate = (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}>
    <path fill="none" stroke="#ffffff" strokeLinejoin="round" strokeWidth="4" d="M23 4H4v22h19V4Zm21 30H4v9h40v-9Zm0-30H31v8h13V4Zm0 14H31v8h13v-8Z"></path>
</svg>
    )

// 3. ADDED GRAPH BAR INCREASE COMPONENT (ATS Score)
export const GraphBarIncrease = (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}>
    <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
        <path d="M5 26c5.86-6.959 11.184-10.966 13.613-12.612c.794-.539 1.841-.363 2.444.383a95 95 0 0 1 3.31 4.377c.808 1.132 2.513 1.168 3.408.104C31.911 13.34 37.501 8.5 37.501 8.5"></path>
        <path d="M42.376 11.323c.664-3.235.657-6.087.601-7.43a.9.9 0 0 0-.869-.87a31.7 31.7 0 0 0-7.43.601c-.753.154-1.002 1.075-.46 1.618l6.54 6.54c.544.543 1.464.293 1.618-.459M5.267 44.96c-1.128-.037-1.992-.719-2.106-1.841C3.07 42.239 3 40.932 3 39s.072-3.24.16-4.119c.115-1.122.979-1.804 2.107-1.842C5.934 33.017 6.827 33 8 33s2.066.017 2.733.04c1.128.037 1.992.719 2.106 1.841c.09.88.161 2.187.161 4.119s-.072 3.24-.16 4.119c-.115 1.122-.979 1.804-2.107 1.842c-.668.022-1.56.039-2.733.039s-2.066-.017-2.733-.04m32.29-.026c-1.3-.08-2.203-1.018-2.297-2.317C35.132 40.856 35 37.667 35 32s.132-8.856.26-10.617c.094-1.299.997-2.238 2.297-2.317C38.187 19.027 38.99 19 40 19s1.813.027 2.443.066c1.3.08 2.203 1.018 2.297 2.317c.128 1.761.26 4.95.26 10.617s-.132 8.856-.26 10.617c-.094 1.299-.997 2.238-2.297 2.317c-.63.039-1.432.066-2.443.066c-1.01 0-1.813-.027-2.443-.066m-16.057.018c-1.264-.055-2.187-.9-2.293-2.16C19.098 41.494 19 39.386 19 36s.098-5.494.207-6.792c.106-1.26 1.029-2.105 2.292-2.16A57 57 0 0 1 24 27c1.042 0 1.862.02 2.5.048c1.264.055 2.187.9 2.293 2.16c.109 1.298.207 3.406.207 6.792s-.098 5.494-.207 6.792c-.106 1.26-1.029 2.105-2.292 2.16c-.639.028-1.459.048-2.501.048a58 58 0 0 1-2.5-.048"></path>
    </g>
</svg>
    )

// 4. REPLACED UPLOAD COMPONENT
export const Upload = (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path fill="#000000" fillRule="evenodd" d="M12 2a6.001 6.001 0 0 0-5.476 3.545a23.012 23.012 0 0 1-.207.452l-.02.001C6.233 6 6.146 6 6 6a4 4 0 1 0 0 8h.172l2-2H6a2 2 0 1 1 0-4h.064c.208 0 .45.001.65-.04a1.94 1.94 0 0 0 .7-.27c.241-.156.407-.35.533-.527a2.39 2.39 0 0 0 .201-.36c.053-.11.118-.255.196-.428l.004-.01a4.001 4.001 0 0 1 7.304 0l.005.01c.077.173.142.317.195.428c.046.097.114.238.201.36c.126.176.291.371.533.528c.242.156.487.227.7.27c.2.04.442.04.65.04L18 8a2 2 0 1 1 0 4h-2.172l2 2H18a4 4 0 0 0 0-8c-.146 0-.233 0-.297-.002h-.02A6.001 6.001 0 0 0 12 2m5.702 4.034" clipRule="evenodd"></path>
    <path fill="#000000" d="m12 12l-.707-.707l.707-.707l.707.707zm1 9a1 1 0 1 1-2 0zm-5.707-5.707l4-4l1.414 1.414l-4 4zm5.414-4l4 4l-1.414 1.414l-4-4zM13 12v9h-2v-9z"></path>
</svg>
    )

// 5. ADDED PERSON EDIT OUTLINE COMPONENT (Edit Profile) - COLOR CHANGED TO BLACK
export const PersonEditOutline = (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path fill="#000000" d="M4 20v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q.925 0 1.825.113t1.8.362l-1.675 1.7q-.5-.075-.975-.125T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8h6v2zm10 1v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.5 5.5zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925zM12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m0-2q.825 0 1.413-.587T14 8q0-.825-.587-1.412T12 6q-.825 0-1.412.588T10 8q0 .825.588 1.413T12 10m0-2"></path>
</svg>
    )

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
                <span className="mic-emoji">
                  <Voice /> {/* REPLACED EMOJI WITH SVG */}
                </span>
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
                  <div className="action-icon">
                    <PageTemplate /> {/* REPLACED EMOJI WITH SVG */}
                  </div>
                  <h4>Resume Templates</h4>
                  <p>Choose from professional templates</p>
                </div>

                <div className="action-card" onClick={handleATSScore}>
                  <div className="action-icon">
                    <GraphBarIncrease /> {/* REPLACED EMOJI WITH SVG */}
                  </div>
                  <h4>ATS Score</h4>
                  <p>Check and improve your resume score</p>
                </div>

                <div className="action-card disabled" onClick={() => alert('Sign up for full access!')}>
                  <div className="action-icon" style={{ fontSize: '4rem' }}> {/* Kept the larger font size here */}
                    <Upload /> {/* REPLACED EMOJI WITH SVG */}
                  </div>
                  <h4>Upload Resume</h4>
                  <p>Upload your existing resume</p>
                  <div className="LOCK">LOCK</div>
                </div>

                <div className="action-card disabled" onClick={() => alert('Sign up for full access!')}>
                  <div className="action-icon">
                    <PersonEditOutline /> {/* REPLACED EMOJI WITH SVG */}
                  </div>
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
                <div className="feature-icon">
                  <Voice /> {/* REPLACED EMOJI WITH SVG */}
                </div>
                <h3>Voice Builder</h3>
                <p>Create your resume using voice commands</p>
                <button className="feature-btn">Use Feature</button>
              </div>

              <div className="feature-card" onClick={handleATSScore}>
                <div className="feature-icon">
                  <GraphBarIncrease /> {/* REPLACED EMOJI WITH SVG */}
                </div>
                <h3>ATS Score Checker</h3>
                <p>Check how well your resume performs with ATS systems</p>
                <button className="feature-btn">Use Feature</button>
              </div>

              <div className="feature-card" onClick={handleTemplates}>
                <div className="feature-icon">
                  <PageTemplate /> {/* REPLACED EMOJI WITH SVG */}
                </div>
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
