import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode'
import './OrganizationHome.css'

const OrganizationHome = () => {
  const navigate = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isPremium, setIsPremium] = useState(true) // Set to true to test features
  const [searchQuery, setSearchQuery] = useState('')
  const [showJobModal, setShowJobModal] = useState(false)
  const [qrCodeDataURL, setQrCodeDataURL] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('pending') // pending, processing, completed
  const [showQRCode, setShowQRCode] = useState(false)
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    requirements: '',
    jobType: 'Full-time'
  })

  // Mock resume data for blue collar workers
  const [resumes] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      title: 'Experienced Driver',
      experience: '8 years',
      location: 'Mumbai',
      skills: ['Car Driving', 'Route Knowledge', 'Vehicle Maintenance', 'Defensive Driving'],
      uploadedDate: '2024-01-15',
      license: 'LMV, HMV',
      languages: ['Hindi', 'Marathi', 'English']
    },
    {
      id: 2,
      name: 'Priya Sharma',
      title: 'Professional Cook',
      experience: '6 years',
      location: 'Delhi',
      skills: ['Indian Cuisine', 'Chinese Cooking', 'Baking', 'Kitchen Management'],
      uploadedDate: '2024-01-14',
      specialty: 'North Indian & Mughlai',
      languages: ['Hindi', 'English']
    },
    {
      id: 3,
      name: 'Suresh Patel',
      title: 'Mechanical Technician',
      experience: '10 years',
      location: 'Ahmedabad',
      skills: ['AC Repair', 'Refrigerator Maintenance', 'Electrical Work', 'Plumbing'],
      uploadedDate: '2024-01-13',
      certification: 'ITI Mechanical',
      languages: ['Hindi', 'Gujarati']
    },
    {
      id: 4,
      name: 'Meena Devi',
      title: 'House Maid',
      experience: '5 years',
      location: 'Bangalore',
      skills: ['House Cleaning', 'Cooking', 'Child Care', 'Laundry', 'Groceries'],
      uploadedDate: '2024-01-12',
      availability: 'Full Time',
      languages: ['Hindi', 'Kannada', 'Tamil']
    },
    {
      id: 5,
      name: 'Amit Singh',
      title: 'Construction Worker',
      experience: '7 years',
      location: 'Pune',
      skills: ['Masonry', 'Carpentry', 'Painting', 'Tiling', 'Plumbing Basics'],
      uploadedDate: '2024-01-11',
      physicalAbility: 'Heavy Lifting',
      languages: ['Hindi', 'Marathi']
    },
    {
      id: 6,
      name: 'Laxmi Nair',
      title: 'Beautician',
      experience: '4 years',
      location: 'Chennai',
      skills: ['Hair Styling', 'Facial Treatments', 'Makeup', 'Waxing', 'Manicure'],
      uploadedDate: '2024-01-10',
      certification: 'Beauty Course Certified',
      languages: ['Tamil', 'Hindi', 'English']
    }
  ])

  const [filteredResumes, setFilteredResumes] = useState(resumes)

  const paymentPlans = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: 299,
      duration: '1 Month',
      features: [
        'Access to worker database',
        'Search and filter candidates',
        'Create and post jobs',
        'Email support'
      ],
      popular: false
    },
    {
      id: 'six-monthly',
      name: '6 Months Plan',
      price: 799,
      duration: '6 Months',
      features: [
        'Everything in Monthly',
        'Advanced search filters',
        'Priority support',
        'Analytics dashboard',
        'Bulk candidate management'
      ],
      popular: true
    },
    {
      id: 'yearly',
      name: 'Yearly Plan',
      price: 1399,
      duration: '1 Year',
      features: [
        'Everything in 6 Months',
        'Unlimited job postings',
        'Custom branding',
        'API access',
        'Dedicated account manager'
      ],
      popular: false
    }
  ]

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/tutorial')
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setFilteredResumes(resumes)
    } else {
      const filtered = resumes.filter(resume => 
        resume.name.toLowerCase().includes(query.toLowerCase()) ||
        resume.title.toLowerCase().includes(query.toLowerCase()) ||
        resume.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
      )
      setFilteredResumes(filtered)
    }
  }

  const generateQRCode = async (plan) => {
    try {
      // Create payment data for QR code
      const paymentData = {
        amount: plan.price,
        plan: plan.name,
        duration: plan.duration,
        timestamp: new Date().toISOString(),
        transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }
      
      const qrData = JSON.stringify(paymentData)
      const qrCodeDataURL = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      
      setQrCodeDataURL(qrCodeDataURL)
      setShowQRCode(true)
      setPaymentStatus('pending')
    } catch (error) {
      console.error('Error generating QR code:', error)
      alert('Error generating QR code. Please try again.')
    }
  }

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
    setShowPaymentModal(true)
    generateQRCode(plan)
  }

  const handlePayment = () => {
    if (paymentStatus === 'pending') {
      setPaymentStatus('processing')
      
      // Simulate payment processing
      setTimeout(() => {
        setPaymentStatus('completed')
        alert(`Payment of ₹${selectedPlan.price} for ${selectedPlan.duration} plan successful!`)
        setIsPremium(true)
        
        // Close modal after successful payment
        setTimeout(() => {
          setShowPaymentModal(false)
          setSelectedPlan(null)
          setShowQRCode(false)
          setQrCodeDataURL('')
          setPaymentStatus('pending')
        }, 2000)
      }, 3000)
    }
  }

  const handleCreateJob = () => {
    if (!isPremium) {
      alert('Please upgrade to premium to create and post jobs!')
      return
    }
    setShowJobModal(true)
  }

  const handleJobSubmit = (e) => {
    e.preventDefault()
    alert('Job posted successfully!')
    setShowJobModal(false)
    setJobData({
      title: '',
      description: '',
      location: '',
      salary: '',
      requirements: '',
      jobType: 'Full-time'
    })
  }

  const handleJobInputChange = (field, value) => {
    setJobData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="organization-home-container">
      {/* Header */}
      <div className="org-header">
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
                  navigate('/organization-edit-profile')
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Edit Profile
                </button>
                <button className="profile-menu-item" onClick={() => {
                  setShowProfileMenu(false)
                  navigate('/payment-history')
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  Payment History
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

      {/* Main Content */}
      <div className="org-main-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h2>Welcome to ReZoom Dashboard! 👋</h2>
          <p>Find the perfect blue collar workers for your organization</p>
        </div>

        {/* Premium Status */}
        {!isPremium && (
          <div className="premium-banner">
            <div className="premium-content">
              <div className="premium-icon">🔒</div>
              <div className="premium-text">
                <h3>Upgrade to Premium</h3>
                <p>Unlock access to worker database, job posting, and advanced features</p>
              </div>
              <button className="upgrade-btn" onClick={() => setShowPaymentModal(true)}>
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* Search Section */}
        <div className="search-section">
          <div className="search-container">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search workers by name, skills, or job type..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className={!isPremium ? 'locked' : ''}
              disabled={!isPremium}
            />
            {!isPremium && (
              <div className="lock-overlay">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className={`action-btn ${!isPremium ? 'locked' : ''}`}
            onClick={handleCreateJob}
            disabled={!isPremium}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
            Create Job Post
          </button>
          
          <button 
            className={`action-btn ${!isPremium ? 'locked' : ''}`}
            onClick={() => alert('Bulk actions - Coming soon!')}
            disabled={!isPremium}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
            Bulk Actions
          </button>
        </div>

        {/* Workers Section */}
        <div className="resumes-section">
          <div className="section-header">
            <h3>Available Workers</h3>
            <span className="count">{filteredResumes.length} workers found</span>
          </div>

          {!isPremium ? (
            <div className="locked-content">
              <div className="lock-icon">🔒</div>
              <h4>Premium Feature</h4>
              <p>Upgrade to premium to view and access worker profiles</p>
              <button className="upgrade-btn" onClick={() => setShowPaymentModal(true)}>
                Upgrade Now
              </button>
            </div>
          ) : (
            <div className="resumes-grid">
              {filteredResumes.map(worker => (
                <div key={worker.id} className="resume-card">
                  <div className="resume-header">
                    <div className="candidate-avatar">
                      {worker.name.charAt(0)}
                    </div>
                    <div className="candidate-info">
                      <h4>{worker.name}</h4>
                      <p>{worker.title}</p>
                    </div>
                  </div>
                  
                  <div className="resume-details">
                    <div className="detail-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{worker.location}</span>
                    </div>
                    <div className="detail-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                      <span>{worker.experience}</span>
                    </div>
                  </div>

                  <div className="skills-section">
                    {worker.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>

                  {worker.license && (
                    <div className="additional-info">
                      <strong>License:</strong> {worker.license}
                    </div>
                  )}

                  {worker.certification && (
                    <div className="additional-info">
                      <strong>Certification:</strong> {worker.certification}
                    </div>
                  )}

                  {worker.specialty && (
                    <div className="additional-info">
                      <strong>Specialty:</strong> {worker.specialty}
                    </div>
                  )}

                  <div className="resume-actions">
                    <button className="view-resume-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      View Profile
                    </button>
                    <button className="contact-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <div className="payment-header">
              <h2>Choose Your Plan</h2>
              <button className="close-btn" onClick={() => {
                setShowPaymentModal(false)
                setSelectedPlan(null)
                setShowQRCode(false)
                setQrCodeDataURL('')
                setPaymentStatus('pending')
              }}>
                ✕
              </button>
            </div>

            <div className="plans-grid">
              {paymentPlans.map(plan => (
                <div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
                  {plan.popular && <div className="popular-badge">Most Popular</div>}
                  
                  <div className="plan-header">
                    <h3>{plan.name}</h3>
                    <div className="plan-price">
                      <span className="currency">₹</span>
                      <span className="amount">{plan.price}</span>
                      <span className="duration">/{plan.duration}</span>
                    </div>
                  </div>

                  <div className="plan-features">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    className="select-plan-btn"
                    onClick={() => handleSelectPlan(plan)}
                  >
                    Select Plan
                  </button>
                </div>
              ))}
            </div>

            {selectedPlan && (
              <div className="payment-summary">
                <div className="summary-content">
                  <h3>Payment Summary</h3>
                  <div className="summary-item">
                    <span>{selectedPlan.name}</span>
                    <span>₹{selectedPlan.price}</span>
                  </div>
                  <div className="summary-total">
                    <span>Total</span>
                    <span>₹{selectedPlan.price}</span>
                  </div>
                </div>

                {showQRCode && (
                  <div className="qr-payment-section">
                    <div className="qr-code-container">
                      <h4>Scan QR Code to Pay</h4>
                      <div className="qr-code-wrapper">
                        <img src={qrCodeDataURL} alt="Payment QR Code" className="qr-code" />
                      </div>
                      <p className="qr-instructions">
                        Scan this QR code with your UPI app to complete the payment
                      </p>
                    </div>
                  </div>
                )}

                <div className="payment-actions">
                  {paymentStatus === 'pending' && (
                    <button className="pay-now-btn" onClick={handlePayment}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                      Pay ₹{selectedPlan.price}
                    </button>
                  )}
                  
                  {paymentStatus === 'processing' && (
                    <button className="pay-now-btn processing" disabled>
                      <div className="spinner"></div>
                      Processing Payment...
                    </button>
                  )}
                  
                  {paymentStatus === 'completed' && (
                    <div className="payment-success">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      Payment Successful!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Job Creation Modal */}
      {showJobModal && (
        <div className="job-modal">
          <div className="job-modal-content">
            <div className="job-header">
              <h2>Create Job Post</h2>
              <button className="close-btn" onClick={() => setShowJobModal(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleJobSubmit} className="job-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Job Title *</label>
                  <input
                    type="text"
                    value={jobData.title}
                    onChange={(e) => handleJobInputChange('title', e.target.value)}
                    placeholder="e.g., Driver, Cook, Mechanic, Maid"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Job Type</label>
                  <select
                    value={jobData.jobType}
                    onChange={(e) => handleJobInputChange('jobType', e.target.value)}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    value={jobData.location}
                    onChange={(e) => handleJobInputChange('location', e.target.value)}
                    placeholder="e.g., Mumbai, Delhi, Bangalore"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Salary Range</label>
                  <input
                    type="text"
                    value={jobData.salary}
                    onChange={(e) => handleJobInputChange('salary', e.target.value)}
                    placeholder="e.g., ₹15,000-25,000/month"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Job Description *</label>
                <textarea
                  value={jobData.description}
                  onChange={(e) => handleJobInputChange('description', e.target.value)}
                  placeholder="Describe the role, responsibilities, and what you're looking for in a worker..."
                  rows={4}
                  required
                />
              </div>

              <div className="form-group">
                <label>Requirements</label>
                <textarea
                  value={jobData.requirements}
                  onChange={(e) => handleJobInputChange('requirements', e.target.value)}
                  placeholder="List the required skills, experience, physical abilities, or certifications needed..."
                  rows={3}
                />
              </div>

              <div className="job-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowJobModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="post-job-btn">
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrganizationHome