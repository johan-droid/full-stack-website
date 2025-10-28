import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './OrganizationLogin.css'

const OrganizationLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Organization Login:', formData)
    // Navigate to organization home
    navigate('/organization-home')
  }

  return (
    <div className="login-container">
      <div className="header-section">
        <button className="back-btn" onClick={() => navigate('/tutorial')}>←</button>
        <div className="welcome-section">
          <h1>Welcome Back!</h1>
          <p>Sign in to continue your journey</p>
        </div>
      </div>

      <div className="login-form-section">
        {/* Removed the extra <div className="form-card"> wrapper */}
        <h2 className="form-title">Organization Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <input
              type="email"
              name="email"
              placeholder="Organization email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <svg 
              className="eye-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"></path>
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </>
              )}
            </svg>
          </div>

          <a href="#" className="forgot-password" onClick={(e) => {
            e.preventDefault()
            alert('Forgot password feature - Navigate to forgot password page')
          }}>
            Forgot password?
          </a>

          <button type="submit" className="login-btn">
            LOGIN
          </button>

          <p className="register-link">
            Don't have an account? <a href="#" onClick={(e) => {
              e.preventDefault()
              navigate('/organization-register')
            }}>Register</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default OrganizationLogin