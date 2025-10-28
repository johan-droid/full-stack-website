import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './EditProfile.css'

const EditProfile = () => {
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState({
    profilePicture: null,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    mobileNumber: '+91 9876543210',
    aboutMe: '',
    jobPreferences: {
      jobTitle: '',
      location: '',
      experience: '',
      salary: '',
      jobType: 'Full-time',
      skills: []
    },
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswordFields, setShowPasswordFields] = useState(false)

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }))
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          profilePicture: 'File size must be less than 5MB'
        }))
        return
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          profilePicture: 'Please select an image file'
        }))
        return
      }

      setProfileData(prev => ({
        ...prev,
        profilePicture: file
      }))
      
      setErrors(prev => ({
        ...prev,
        profilePicture: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!profileData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!profileData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!profileData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required'
    } else if (!/^\+?[\d\s-()]+$/.test(profileData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid mobile number'
    }

    if (showPasswordFields) {
      if (!profileData.currentPassword) {
        newErrors.currentPassword = 'Current password is required'
      }
      
      if (!profileData.newPassword) {
        newErrors.newPassword = 'New password is required'
      } else if (profileData.newPassword.length < 6) {
        newErrors.newPassword = 'Password must be at least 6 characters'
      }
      
      if (profileData.newPassword !== profileData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Profile updated successfully!')
      navigate('/user-home')
    } catch (error) {
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const addSkill = (skill) => {
    if (skill.trim() && !profileData.jobPreferences.skills.includes(skill.trim())) {
      setProfileData(prev => ({
        ...prev,
        jobPreferences: {
          ...prev.jobPreferences,
          skills: [...prev.jobPreferences.skills, skill.trim()]
        }
      }))
    }
  }

  const removeSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      jobPreferences: {
        ...prev.jobPreferences,
        skills: prev.jobPreferences.skills.filter(skill => skill !== skillToRemove)
      }
    }))
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header">
        <button className="back-btn" onClick={() => navigate('/user-home')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back
        </button>
        <h1>Edit Profile</h1>
      </div>

      <div className="edit-profile-content">
        <form onSubmit={handleSubmit} className="profile-form">
          {/* Profile Picture Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Profile Picture</h2>
              <p>Upload a professional photo of yourself</p>
            </div>
            
            <div className="profile-picture-section">
              <div className="profile-picture-container">
                <img 
                  src={profileData.profilePicture ? URL.createObjectURL(profileData.profilePicture) : '/default-avatar.svg'} 
                  alt="Profile" 
                  className="profile-picture"
                />
                <div className="profile-picture-overlay">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </div>
              </div>
              
              <div className="upload-actions">
                <input
                  type="file"
                  id="profile-picture-input"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="profile-picture-input" className="upload-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  Upload Photo
                </label>
                <button type="button" className="remove-btn" onClick={() => setProfileData(prev => ({ ...prev, profilePicture: null }))}>
                  Remove
                </button>
              </div>
              
              {errors.profilePicture && (
                <div className="error-message">{errors.profilePicture}</div>
              )}
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              <p>Update your basic information</p>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <div className="error-message">{errors.firstName}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
              </div>
            </div>

           
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number *</label>
              <input
                type="tel"
                id="mobileNumber"
                value={profileData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                className={errors.mobileNumber ? 'error' : ''}
                placeholder="+91 9876543210"
              />
              {errors.mobileNumber && <div className="error-message">{errors.mobileNumber}</div>}
            </div>
          </div>

          {/* About Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>About Me</h2>
              <p>Tell us about yourself and your professional background</p>
            </div>
            
            <div className="form-group">
              <label htmlFor="aboutMe">Bio</label>
              <textarea
                id="aboutMe"
                value={profileData.aboutMe}
                onChange={(e) => handleInputChange('aboutMe', e.target.value)}
                placeholder="Write a brief description about yourself, your skills, and what makes you unique..."
                rows={4}
                maxLength={500}
              />
              <div className="character-count">
                {profileData.aboutMe.length}/500 characters
              </div>
            </div>
          </div>

          {/* Job Preferences Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Job Preferences</h2>
              <p>Help us match you with the right opportunities</p>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="jobTitle">Preferred Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  value={profileData.jobPreferences.jobTitle}
                  onChange={(e) => handleInputChange('jobPreferences.jobTitle', e.target.value)}
                  placeholder="e.g., cook, driver, maid, etc"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Preferred Location</label>
                <input
                  type="text"
                  id="location"
                  value={profileData.jobPreferences.location}
                  onChange={(e) => handleInputChange('jobPreferences.location', e.target.value)}
                  placeholder="e.g., Mumbai, Delhi, etc"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="experience">Experience Level</label>
                <select
                  id="experience"
                  value={profileData.jobPreferences.experience}
                  onChange={(e) => handleInputChange('jobPreferences.experience', e.target.value)}
                >
                  <option value="">Select experience level</option>
                  <option value="0-1">0-1 years (Fresher)</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="jobType">Job Type</label>
                <select
                  id="jobType"
                  value={profileData.jobPreferences.jobType}
                  onChange={(e) => handleInputChange('jobPreferences.jobType', e.target.value)}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Skills</label>
              <div className="skills-container">
                <div className="skills-input">
                  <input
                    type="text"
                    placeholder="Add a skill and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addSkill(e.target.value)
                        e.target.value = ''
                      }
                    }}
                  />
                </div>
                <div className="skills-list">
                  {profileData.jobPreferences.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Security</h2>
              <p>Update your password for account security</p>
            </div>
            
            <div className="password-toggle">
              <button 
                type="button" 
                className="toggle-password-btn"
                onClick={() => setShowPasswordFields(!showPasswordFields)}
              >
                {showPasswordFields ? 'Cancel Password Change' : 'Change Password'}
              </button>
            </div>

            {showPasswordFields && (
              <div className="password-fields">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password *</label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={profileData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    className={errors.currentPassword ? 'error' : ''}
                  />
                  {errors.currentPassword && <div className="error-message">{errors.currentPassword}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password *</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={profileData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    className={errors.newPassword ? 'error' : ''}
                  />
                  {errors.newPassword && <div className="error-message">{errors.newPassword}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={profileData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate('/user-home')}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
