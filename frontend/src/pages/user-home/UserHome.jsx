import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FileUpload from '../../components/FileUpload'
import JobsDashboard from './jobs/JobsDashboard'
import './UserHome.css'

// UPDATED VOICE COMPONENT DEFINITION FOR VISIBILITY
export const Voice = (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}>
        <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4">
            <rect width="14" height="27" x="17" y="4" fill="currentColor" rx="7"></rect>
            <path strokeLinecap="round" d="M9 23c0 8.284 6.716 15 15 15c8.284 0 15-6.716 15-15M24 38v6"></path>
        </g>
      </svg>
)

// PageTemplate COMPONENT with stroke color changed to currentColor
export const PageTemplate = (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}>
    <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeLinecap="round" strokeWidth="4" d="M23 4H4v22h19V4Zm21 30H4v9h40v-9Zm0-30H31v8h13V4Zm0 14H31v8h13v-8Z"></path>
</svg>
    )

// GraphBarIncreaseRemix COMPONENT with fill color changed to white (#ffffff)
export const GraphBarIncreaseRemix = (props) => (
      <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
    <path fill="#ffffff" fillRule="evenodd" d="M44.222 10.875c-.41 2.003-2.819 2.546-4.147 1.217l-1.88-1.879q-.354.32-.778.696c-1.836 1.634-4.598 4.092-7.743 7.787c-1.7 1.998-4.952 1.987-6.552-.228a93 93 0 0 0-3.152-4.13l-.164.11c-2.65 1.771-8.76 5.854-12.914 11.819A2 2 0 1 1 3.61 23.98c4.599-6.605 11.26-11.05 13.927-12.828l.338-.226c1.68-1.126 3.873-.735 5.107.775a96 96 0 0 1 3.382 4.424a.1.1 0 0 0 .024.02a.2.2 0 0 0 .08.017c.084.002.136-.031.16-.06c3.357-3.944 6.424-6.67 8.234-8.278l.002-.001l.498-.444l-1.827-1.828c-1.33-1.328-.786-3.736 1.217-4.147a33.2 33.2 0 0 1 7.795-.63a2.4 2.4 0 0 1 2.305 2.305c.06 1.416.067 4.399-.63 7.795M40 17.25c1.046 0 1.89.028 2.565.07c2.35.143 4.007 1.921 4.17 4.168c.133 1.828.265 5.07.265 10.762s-.132 8.934-.265 10.762c-.163 2.247-1.82 4.025-4.17 4.169A42 42 0 0 1 40 47.25a42 42 0 0 1-2.565-.07c-2.35-.143-4.007-1.921-4.17-4.168c-.133-1.828-.265-5.07-.265-10.762s.132-8.934.265-10.762c.163-2.247 1.82-4.025 4.17-4.169A42 42 0 0 1 40 17.25m2.32 4.062A38 38 0 0 0 40 21.25c-.975 0-1.736.026-2.32.062c-.185.011-.262.071-.297.107c-.04.04-.113.141-.129.36C37.131 23.471 37 26.606 37 32.25s.131 8.778.254 10.472c.016.218.09.319.129.359c.035.036.112.096.296.107c.584.036 1.346.062 2.321.062s1.736-.026 2.32-.062c.185-.011.262-.071.297-.107c.04-.04.113-.141.129-.36c.123-1.693.254-4.828.254-10.471s-.131-8.778-.254-10.472c-.016-.218-.09-.319-.129-.359c-.035-.036-.112-.096-.296-.107M8 31.25c1.192 0 2.107.017 2.8.04c1.956.066 3.798 1.36 4.029 3.64c.098.965.171 2.343.171 4.32s-.073 3.355-.171 4.32c-.231 2.28-2.072 3.574-4.028 3.64A84 84 0 0 1 8 47.25c-1.192 0-2.107-.017-2.8-.04c-1.957-.066-3.798-1.36-4.029-3.64C1.073 42.606 1 41.228 1 39.25s.073-3.355.171-4.32c.231-2.28 2.072-3.574 4.028-3.64A85 85 0 0 1 8 31.25m2.666 4.038c-.642-.021-1.512-.038-2.666-.038s-2.024.017-2.666.038a.6.6 0 0 0-.181.03l-.002.015C5.07 36.126 5 37.363 5 39.25s.07 3.124.15 3.917l.002.01v.005a.6.6 0 0 0 .182.03c.642.021 1.512.038 2.666.038s2.024-.017 2.666-.038a.6.6 0 0 0 .181-.03l.002-.015c.08-.793.151-2.03.151-3.917c0-1.886-.07-3.124-.15-3.917l-.003-.015a.6.6 0 0 0-.18-.03M26.588 25.3c-.671-.03-1.52-.05-2.588-.05s-1.917.02-2.588.05c-2.22.097-4.003 1.68-4.198 3.99C17.1 30.664 17 32.83 17 36.25s.099 5.587.214 6.96c.195 2.31 1.978 3.893 4.198 3.99c.671.03 1.52.05 2.588.05s1.917-.02 2.588-.05c2.22-.097 4.003-1.68 4.198-3.99c.115-1.373.214-3.54.214-6.96s-.099-5.587-.214-6.96c-.195-2.31-1.978-3.893-4.198-3.99M24 29.25c1.017 0 1.808.02 2.413.046c.202.009.281.072.302.091c.016.016.07.07.085.24c.103 1.222.2 3.27.2 6.623s-.097 5.4-.2 6.624c-.014.17-.069.223-.085.239c-.02.019-.1.082-.302.091c-.605.027-1.396.046-2.413.046s-1.808-.02-2.413-.046c-.202-.009-.281-.072-.302-.091c-.016-.016-.07-.07-.085-.24c-.103-1.222-.2-3.27-.2-6.623s.097-5.4.2-6.624c.014-.17.069-.223.085-.239c.02-.019.1-.082.302-.091A56 56 0 0 1 24 29.25" clipRule="evenodd"></path>
</svg>
    )

// Upload COMPONENT - Stroke changed to currentColor for better scaling/color inheritance
export const Upload = (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v9m0-9l3 3m-3-3l-3 3m8.5 2c1.519 0 2.5-1.231 2.5-2.75a2.75 2.75 0 0 0-2.016-2.65A5 5 0 0 0 8.37 8.108a3.5 3.5 0 0 0-1.87 6.746"></path>
</svg>
    )

// NEW PersonEditOutline COMPONENT
export const PersonEditOutline = (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path fill="#ffffff" d="M4 20v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q.925 0 1.825.113t1.8.362l-1.675 1.7q-.5-.075-.975-.125T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8h6v2zm10 1v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.5 5.5zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925zM12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m0-2q.825 0 1.413-.587T14 8q0-.825-.587-1.412T12 6q-.825 0-1.412.588T10 8q0 .825.588 1.413T12 10m0-2"></path>
</svg>
    )

const UserHome = () => {
  const navigate = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [currentView, setCurrentView] = useState('dashboard') // 'dashboard' or 'jobs'

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/tutorial')
    }
  }

  const handleFileSelect = (file) => {
    setUploadedFile(file)
  }

  const handleUploadResume = () => {
    setShowUploadModal(true)
    setShowProfileMenu(false)
  }

  const handleQuickUploadResume = () => {
    setShowUploadModal(true)
  }

  const handleUploadSubmit = () => {
    if (uploadedFile) {
      // Here you would typically upload the file to your server
      alert(`Resume "${uploadedFile.name}" uploaded successfully!`)
      setShowUploadModal(false)
      setUploadedFile(null)
    }
  }

  const handleUploadCancel = () => {
    setShowUploadModal(false)
    setUploadedFile(null)
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
              Profile
            </button>

            {showProfileMenu && (
              <div className="profile-dropdown-menu">
                <button className="profile-menu-item" onClick={() => {
                  setShowProfileMenu(false)
                  navigate('/edit-profile')
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Edit Profile
                </button>
                <button className="profile-menu-item" onClick={handleUploadResume}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  Upload Resume
                </button>
                <button className="profile-menu-item" onClick={() => {
                  setShowProfileMenu(false)
                  navigate('/ats-score')
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                  Check ATS Score
                </button>
                <button className="profile-menu-item" onClick={() => {
                  setShowProfileMenu(false)
                  navigate('/templates')
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                  </svg>
                  Choose Templates
                </button>
                <hr className="menu-divider" />
                <button className="profile-menu-item logout" onClick={handleLogout}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
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
          className={`nav-tab ${currentView === 'jobs' ? 'active' : ''}`}
          onClick={() => setCurrentView('jobs')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          Find Jobs
        </button>
      </div>

      {/* Main Content */}
      <div className="user-main-content">
        {currentView === 'dashboard' ? (
          <>
            <div className="welcome-section">
              <h2>Welcome Back! 👋</h2>
              <p>Let's build your professional resume</p>
            </div>

        {/* Build with Voice Section */}
        <div className="voice-build-section">
          <button className="voice-build-btn" onClick={() => navigate('/voice-builder')}>
            <Voice className="mic-emoji" />
            <div className="voice-text">
              <h3>Build with Voice</h3>
              <p>Speak your details and let AI create your resume</p>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="arrow-icon">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            <div className="action-card" onClick={() => navigate('/templates')}>
              <div className="action-icon">
                <PageTemplate />
              </div>
              <h4>Resume Templates</h4>
              <p>Choose from professional templates</p>
            </div>

            <div className="action-card" onClick={() => navigate('/ats-score')}>
              <div className="action-icon">
                <GraphBarIncreaseRemix />
              </div>
              <h4>ATS Score</h4>
              <p>Check and improve your resume score</p>
            </div>

            <div className="action-card" onClick={handleQuickUploadResume}>
              <div className="action-icon" style={{ fontSize: '4rem' }}>
                <Upload />
              </div>
              <h4>Upload Resume</h4>
              <p>Upload your existing resume</p>
            </div>

            <div className="action-card" onClick={() => navigate('/edit-profile')}>
              <div className="action-icon">
                <PersonEditOutline />
              </div>
              <h4>Edit Profile</h4>
              <p>Update your personal information</p>
            </div>
          </div>
        </div>

            {/* Recent Activity */}
            <div className="recent-activity-section">
              <h3>Recent Activity</h3>
              <div className="activity-card">
                <div className="activity-icon">🕐</div>
                <div className="activity-details">
                  <p>No recent activity</p>
                  <span>Start building your resume to see activity here</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <JobsDashboard />
        )}
      </div>

      {/* Upload Resume Modal */}
      {showUploadModal && (
        <div className="upload-modal">
          <div className="upload-modal-content">
            <div className="upload-modal-header">
              <h2>Upload Resume</h2>
              <button className="close-modal-btn" onClick={handleUploadCancel}>
                ✕
              </button>
            </div>
            
            <FileUpload 
              onFileSelect={handleFileSelect}
              accept=".pdf,.doc,.docx"
              maxSize={5}
            />
            
            <div className="upload-modal-actions">
              <button className="cancel-btn" onClick={handleUploadCancel}>
                Cancel
              </button>
              <button 
                className="upload-btn" 
                onClick={handleUploadSubmit}
                disabled={!uploadedFile}
              >
                Upload Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserHome