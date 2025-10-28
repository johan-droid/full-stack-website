import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FileUpload from '../../components/FileUpload'
import JobsDashboard from './jobs/JobsDashboard'
import './UserHome.css'

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

  const templates = [
    { id: 1, name: 'Modern', preview: '🎨' },
    { id: 2, name: 'Professional', preview: '💼' },
    { id: 3, name: 'Creative', preview: '✨' },
    { id: 4, name: 'Classic', preview: '📝' }
  ]

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

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            <div className="action-card" onClick={() => navigate('/templates')}>
              <div className="action-icon">📄</div>
              <h4>Resume Templates</h4>
              <p>Choose from professional templates</p>
            </div>

            <div className="action-card" onClick={() => navigate('/ats-score')}>
              <div className="action-icon">📊</div>
              <h4>ATS Score</h4>
              <p>Check and improve your resume score</p>
            </div>

            <div className="action-card" onClick={handleQuickUploadResume}>
              <div className="action-icon">📤</div>
              <h4>Upload Resume</h4>
              <p>Upload your existing resume</p>
            </div>

            <div className="action-card" onClick={() => navigate('/edit-profile')}>
              <div className="action-icon">✏️</div>
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

