import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './RoleSelection.css'

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState('user') // 'user' or 'organization'
  const navigate = useNavigate()

  const handleRoleChange = (role) => {
    setSelectedRole(role)
  }

  const handleLoginClick = () => {
    if (selectedRole === 'user') {
      navigate('/user-login')
    } else {
      navigate('/organization-login')
    }
  }

  const handleRegisterClick = () => {
    if (selectedRole === 'user') {
      navigate('/user-register')
    } else {
      navigate('/organization-register')
    }
  }

  return (
    <div className="role-selection-container">
      <div className="header-section">
        <div className="welcome-section">
          <h1>Welcome Back!</h1>
          <p>Sign in to continue your journey</p>
        </div>

        <div className="role-chooser">
          <h2>Choose your role</h2>
          <div className="role-buttons">
            <button
              className={`role-btn ${selectedRole === 'user' ? 'selected' : ''}`}
              onClick={() => handleRoleChange('user')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>User</span>
            </button>
            <button
              className={`role-btn ${selectedRole === 'organization' ? 'selected' : ''}`}
              onClick={() => handleRoleChange('organization')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <span>Organization</span>
            </button>
          </div>
        </div>
      </div>

      <div className="action-section">
        <div className="action-buttons">
          <button className="primary-btn" onClick={handleLoginClick}>
            Login
          </button>
          <button className="secondary-btn" onClick={handleRegisterClick}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoleSelection

