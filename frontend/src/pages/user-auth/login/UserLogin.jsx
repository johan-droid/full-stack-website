import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserLogin.css'

const UserLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    phoneNumber: '',
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
    console.log('User Login:', formData)
    // Navigate to user home
    navigate('/user-home')
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
        {/* The .form-card class was removed from the UserLogin.jsx file in the provided files,
            so this structure is correct based on the file content. */}
        <h2 className="form-title">Individual Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              autocomplete="off"
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
              autocomplete="new-password"
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
              navigate('/individual-register')
            }}>Register</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default UserLogin