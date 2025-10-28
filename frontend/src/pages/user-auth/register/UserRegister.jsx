import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserRegister.css'

const UserRegister = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleGenderSelect = (gender) => {
    setFormData({
      ...formData,
      gender
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Register data:', formData)
    // Navigate to home or success page
    navigate('/user-home')
  }

  return (
    <div className="register-container">
      <div className="form-header-section">
        <button className="back-btn" onClick={() => navigate('/individual-login')}>←</button>
        <h1>User Details</h1>
      </div>

      <div className="register-form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Full name <span className="required">*</span>
            </label>
            <div className="input-wrapper" data-gradient-preserve>
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              Phone number <span className="required">*</span>
            </label>
            <div className="input-wrapper" data-gradient-preserve>
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              Set Password <span className="required">*</span>
            </label>
            <div className="input-wrapper" data-gradient-preserve>
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              Confirm Password <span className="required">*</span>
            </label>
            <div className="input-wrapper" data-gradient-preserve>
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              Gender <span className="required">*</span>
            </label>
            <div className="gender-options">
              <button
                type="button"
                className={`gender-option ${formData.gender === 'male' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('male')}
              >
                <div className="gender-avatar male">
                  <img src="/logos/male_avatar.png" alt="Male Avatar" />
                </div>
                <span>Male</span>
              </button>

              <button
                type="button"
                className={`gender-option ${formData.gender === 'female' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('female')}
              >
                <div className="gender-avatar female">
                  <img src="/logos/female_avatar.png" alt="Female Avatar" />
                </div>
                <span>Female</span>
              </button>

              <button
                type="button"
                className={`gender-option ${formData.gender === 'other' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('other')}
              >
                <div className="gender-avatar other">
                  <img src="/logos/other_avatar.png" alt="Other Avatar" />
                </div>
                <span>Other</span>
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserRegister

