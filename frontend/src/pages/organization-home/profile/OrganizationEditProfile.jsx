import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './OrganizationEditProfile.css'

const OrganizationEditProfile = () => {
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState({
    companyLogo: null,
    companyName: 'TechCorp Solutions',
    industry: 'Technology',
    companySize: '50-200',
    foundedYear: '2015',
    website: 'https://techcorp.com',
    description: '',
    contactPerson: {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@techcorp.com',
      phone: '+91 9876543210',
      designation: 'HR Manager'
    },
    address: {
      street: '123 Business Park',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    },
    jobPreferences: {
      defaultJobType: 'Full-time',
      defaultLocation: 'Mumbai',
      defaultExperience: '2-4 years',
      defaultSalaryRange: '₹5-10 LPA',
      autoApproveApplications: false,
      requireCoverLetter: true,
      maxApplicationsPerJob: 100
    },
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswordFields, setShowPasswordFields] = useState(false)

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
    'Retail', 'Consulting', 'Media', 'Real Estate', 'Automotive',
    'Food & Beverage', 'Travel & Tourism', 'Energy', 'Telecommunications',
    'Government', 'Non-Profit', 'Other'
  ]

  const companySizes = [
    '1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'
  ]

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
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          companyLogo: 'File size must be less than 5MB'
        }))
        return
      }
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          companyLogo: 'Please select an image file'
        }))
        return
      }
      setProfileData(prev => ({
        ...prev,
        companyLogo: file
      }))
      setErrors(prev => ({
        ...prev,
        companyLogo: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!profileData.companyName.trim()) {
      newErrors.companyName = 'Company name is required'
    }

    if (!profileData.contactPerson.firstName.trim()) {
      newErrors['contactPerson.firstName'] = 'Contact person first name is required'
    }

    if (!profileData.contactPerson.lastName.trim()) {
      newErrors['contactPerson.lastName'] = 'Contact person last name is required'
    }

    if (!profileData.contactPerson.email.trim()) {
      newErrors['contactPerson.email'] = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.contactPerson.email)) {
      newErrors['contactPerson.email'] = 'Please enter a valid email'
    }

    if (!profileData.contactPerson.phone.trim()) {
      newErrors['contactPerson.phone'] = 'Phone number is required'
    }

    if (!profileData.address.city.trim()) {
      newErrors['address.city'] = 'City is required'
    }

    if (!profileData.address.state.trim()) {
      newErrors['address.state'] = 'State is required'
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
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Organization profile updated successfully!')
      navigate('/organization-home')
    } catch (error) {
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="org-edit-profile-container">
      {/* Fixed top-left back SVG */}
      <button
        className="back-svg-btn"
        onClick={() => navigate('/organization-home')}
        aria-label="Back"
        type="button"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <div className="org-edit-profile-header">
        <h1>Edit Organization Profile</h1>
      </div>
      <div className="org-edit-profile-content">
        <form onSubmit={handleSubmit} className="org-profile-form">
          {/* Company Logo Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Company Logo</h2>
              <p>Upload your company logo for branding</p>
            </div>
            <div className="logo-section">
              <div className="logo-container">
                <img
                  src={profileData.companyLogo ? URL.createObjectURL(profileData.companyLogo) : '/default-company-logo.svg'}
                  alt="Company Logo"
                  className="company-logo"
                />
                <label htmlFor="company-logo-input" className="logo-upload-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </label>
                <input
                  type="file"
                  id="company-logo-input"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
              <div>
                {profileData.companyLogo && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => setProfileData(prev => ({ ...prev, companyLogo: null }))}
                  >
                    Remove
                  </button>
                )}
                {errors.companyLogo && <div className="error-message">{errors.companyLogo}</div>}
              </div>
            </div>
          </div>

          {/* Company Information Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Company Information</h2>
              <p>Update your company details</p>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="companyName">Company Name *</label>
                <input
                  type="text"
                  id="companyName"
                  value={profileData.companyName}
                  onChange={e => handleInputChange('companyName', e.target.value)}
                  className={errors.companyName ? 'error' : ''}
                />
                {errors.companyName && <div className="error-message">{errors.companyName}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="industry">Industry</label>
                <select
                  id="industry"
                  value={profileData.industry}
                  onChange={e => handleInputChange('industry', e.target.value)}
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="companySize">Company Size</label>
                <select
                  id="companySize"
                  value={profileData.companySize}
                  onChange={e => handleInputChange('companySize', e.target.value)}
                >
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size} employees</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="foundedYear">Founded Year</label>
                <input
                  type="number"
                  id="foundedYear"
                  value={profileData.foundedYear}
                  onChange={e => handleInputChange('foundedYear', e.target.value)}
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="website">Company Website</label>
              <input
                type="url"
                id="website"
                value={profileData.website}
                onChange={e => handleInputChange('website', e.target.value)}
                placeholder="https://yourcompany.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Company Description</label>
              <textarea
                id="description"
                value={profileData.description}
                onChange={e => handleInputChange('description', e.target.value)}
                placeholder="Tell us about your company, mission, and what makes you unique..."
                rows={4}
                maxLength={1000}
              />
              <div className="character-count">
                {profileData.description.length}/1000 characters
              </div>
            </div>
          </div>

          {/* Contact Person Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Contact Person</h2>
              <p>Primary contact for job postings</p>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  value={profileData.contactPerson.firstName}
                  onChange={e => handleInputChange('contactPerson.firstName', e.target.value)}
                  className={errors['contactPerson.firstName'] ? 'error' : ''}
                />
                {errors['contactPerson.firstName'] && <div className="error-message">{errors['contactPerson.firstName']}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  value={profileData.contactPerson.lastName}
                  onChange={e => handleInputChange('contactPerson.lastName', e.target.value)}
                  className={errors['contactPerson.lastName'] ? 'error' : ''}
                />
                {errors['contactPerson.lastName'] && <div className="error-message">{errors['contactPerson.lastName']}</div>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  value={profileData.contactPerson.email}
                  onChange={e => handleInputChange('contactPerson.email', e.target.value)}
                  className={errors['contactPerson.email'] ? 'error' : ''}
                />
                {errors['contactPerson.email'] && <div className="error-message">{errors['contactPerson.email']}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  value={profileData.contactPerson.phone}
                  onChange={e => handleInputChange('contactPerson.phone', e.target.value)}
                  className={errors['contactPerson.phone'] ? 'error' : ''}
                />
                {errors['contactPerson.phone'] && <div className="error-message">{errors['contactPerson.phone']}</div>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="designation">Designation</label>
              <input
                type="text"
                id="designation"
                value={profileData.contactPerson.designation}
                onChange={e => handleInputChange('contactPerson.designation', e.target.value)}
                placeholder="e.g., HR Manager, Talent Acquisition Lead"
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Company Address</h2>
              <p>Your company's physical location</p>
            </div>
            <div className="form-group">
              <label htmlFor="street">Street Address</label>
              <input
                type="text"
                id="street"
                value={profileData.address.street}
                onChange={e => handleInputChange('address.street', e.target.value)}
                placeholder="Building name, street address"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  value={profileData.address.city}
                  onChange={e => handleInputChange('address.city', e.target.value)}
                  className={errors['address.city'] ? 'error' : ''}
                />
                {errors['address.city'] && <div className="error-message">{errors['address.city']}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  value={profileData.address.state}
                  onChange={e => handleInputChange('address.state', e.target.value)}
                  className={errors['address.state'] ? 'error' : ''}
                />
                {errors['address.state'] && <div className="error-message">{errors['address.state']}</div>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  value={profileData.address.pincode}
                  onChange={e => handleInputChange('address.pincode', e.target.value)}
                  placeholder="400001"
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  value={profileData.address.country}
                  onChange={e => handleInputChange('address.country', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Job Preferences Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Job Posting Preferences</h2>
              <p>Set default preferences for your job postings</p>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="defaultJobType">Default Job Type</label>
                <select
                  id="defaultJobType"
                  value={profileData.jobPreferences.defaultJobType}
                  onChange={e => handleInputChange('jobPreferences.defaultJobType', e.target.value)}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="defaultLocation">Default Location</label>
                <input
                  type="text"
                  id="defaultLocation"
                  value={profileData.jobPreferences.defaultLocation}
                  onChange={e => handleInputChange('jobPreferences.defaultLocation', e.target.value)}
                  placeholder="e.g., Mumbai, Delhi, Remote"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="defaultExperience">Default Experience Level</label>
                <select
                  id="defaultExperience"
                  value={profileData.jobPreferences.defaultExperience}
                  onChange={e => handleInputChange('jobPreferences.defaultExperience', e.target.value)}
                >
                  <option value="0-1 years">0-1 years (Fresher)</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="2-4 years">2-4 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="defaultSalaryRange">Default Salary Range</label>
                <input
                  type="text"
                  id="defaultSalaryRange"
                  value={profileData.jobPreferences.defaultSalaryRange}
                  onChange={e => handleInputChange('jobPreferences.defaultSalaryRange', e.target.value)}
                  placeholder="e.g., ₹5-10 LPA"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="maxApplicationsPerJob">Max Applications per Job</label>
              <input
                type="number"
                id="maxApplicationsPerJob"
                value={profileData.jobPreferences.maxApplicationsPerJob}
                onChange={e => handleInputChange('jobPreferences.maxApplicationsPerJob', e.target.value)}
                min="1"
                max="1000"
              />
            </div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={profileData.jobPreferences.autoApproveApplications}
                  onChange={e => handleInputChange('jobPreferences.autoApproveApplications', e.target.checked)}
                />
                <span className="checkmark"></span>
                Auto-approve applications (applications will be automatically accepted)
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={profileData.jobPreferences.requireCoverLetter}
                  onChange={e => handleInputChange('jobPreferences.requireCoverLetter', e.target.checked)}
                />
                <span className="checkmark"></span>
                Require cover letter for applications
              </label>
            </div>
          </div>

          {/* Security Section */}
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
                    onChange={e => handleInputChange('currentPassword', e.target.value)}
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
                    onChange={e => handleInputChange('newPassword', e.target.value)}
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
                    onChange={e => handleInputChange('confirmPassword', e.target.value)}
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                </div>
              </div>
            )}
          </div>
          {/* Submit Buttons */}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate('/organization-home')}>
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

export default OrganizationEditProfile
