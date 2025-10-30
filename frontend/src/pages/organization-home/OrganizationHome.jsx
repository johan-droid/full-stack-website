import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import { Box, Typography, Button, Stack, Tabs, Tab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AppsIcon from '@mui/icons-material/Apps';
// Corrected Import Extension Below: changed to .jsx
import { OrganizationSearch } from '../../components/OrganizationSearch.jsx';
import './OrganizationHome.css';

// ... (rest of the OrganizationHome component code remains the same as provided in the previous step)
const OrganizationHome = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPremium, setIsPremium] = useState(() => {
    // Check if there's a valid payment in localStorage
    const paymentInfo = localStorage.getItem('organizationPayment');
    if (paymentInfo) {
      const { expiryDate } = JSON.parse(paymentInfo);
      return new Date(expiryDate) > new Date();
    }
    return false;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showJobModal, setShowJobModal] = useState(false);
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, processing, completed
  const [showQRCode, setShowQRCode] = useState(false);
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    requirements: '',
    jobType: 'Full-time'
  });

  const paymentPlans = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: 399,
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
      price: 499,
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
      price: 599,
      duration: '1 Year',
      features: [
        'Everything in 6 Months',
        'Dedicated account manager',
        'Custom reporting',
        'API access',
        '24/7 priority support',
        'Save 60% compared to monthly'
      ],
      popular: false
    }
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    // Generate QR code when a plan is selected
    generateQRCode(plan);
  };

  const generateQRCode = async (plan) => {
    try {
      const paymentData = {
        amount: plan.price,
        currency: 'INR',
        description: `Payment for ${plan.name} plan`,
        order_id: `ORDER_${Date.now()}`
      };
      
      // In a real app, you would send this to your backend to generate a payment request
      // For demo, we'll just create a simple UPI payment link
      const upiLink = `upi://pay?pa=your-merchant@upi&pn=Your%20Business&mc=1234&tid=${Date.now()}&tr=TR${Date.now()}&tn=Payment%20for%20${plan.name}%20Plan&am=${plan.price}&cu=INR`;
      
      const qrCodeData = await QRCode.toDataURL(upiLink, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      
      setQrCodeDataURL(qrCodeData);
      setShowQRCode(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Failed to generate QR code. Please try again.');
    }
  };

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
  ]);

  const [filteredResumes, setFilteredResumes] = useState(resumes);


  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/tutorial');
    }
  };

  // handleSearch now correctly passed to OrganizationSearch component
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredResumes(resumes);
    } else {
      const filtered = resumes.filter(resume =>
        resume.name.toLowerCase().includes(query.toLowerCase()) ||
        resume.title.toLowerCase().includes(query.toLowerCase()) ||
        resume.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredResumes(filtered);
    }
  };



  const handlePayment = async () => {
    if (!selectedPlan) return;
    
    try {
      // If QR code isn't shown yet, generate it first
      if (!showQRCode) {
        await generateQRCode(selectedPlan);
      }

      setPaymentStatus('processing');

      // Simulate payment processing
      return new Promise((resolve) => {
        setTimeout(() => {
          setPaymentStatus('completed');
          setIsPremium(true);
          
          // Store payment info in localStorage
          const paymentInfo = {
            plan: selectedPlan.name,
            amount: selectedPlan.price,
            expiryDate: new Date(Date.now() + (
              selectedPlan.duration === '1 Month' ? 30 * 24 * 60 * 60 * 1000 : 
              selectedPlan.duration === '6 Months' ? 6 * 30 * 24 * 60 * 60 * 1000 : 
              365 * 24 * 60 * 60 * 1000
            )),
            features: selectedPlan.features,
            paymentDate: new Date().toISOString(),
            status: 'active'
          };
          
          localStorage.setItem('organizationPayment', JSON.stringify(paymentInfo));
          
          // Close modal after successful payment
          setTimeout(() => {
            setShowPaymentModal(false);
            setSelectedPlan(null);
            setShowQRCode(false);
            setQrCodeDataURL('');
            setPaymentStatus('pending');
            
            // Show success message
            alert(`Payment of ₹${selectedPlan.price} for ${selectedPlan.duration} plan successful!\nYou now have full access to all features.`);
            
            // Refresh the page to update the UI
            window.location.reload();
            
            resolve(true);
          }, 2000);
        }, 3000);
      });
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setPaymentStatus('pending');
      return false;
    }
  };

  const handleCreateJob = () => {
    if (!isPremium) {
      setShowPaymentModal(true);
      return;
    }
    setShowJobModal(true);
  };

  const handleJobSubmit = (e) => {
    e.preventDefault();
    alert('Job posted successfully!');
    setShowJobModal(false);
    setJobData({
      title: '',
      description: '',
      location: '',
      salary: '',
      requirements: '',
      jobType: 'Full-time'
    });
  };

  const handleJobInputChange = (field, value) => {
    setJobData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="organization-home-container">
      {/* Header */}
      <div className="org-header">
        <div className="header-left">
          <img src="/logos/logo.png" alt="ReZoom Logo" className="header-logo" onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
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
                  setShowProfileMenu(false);
                  navigate('/organization-edit-profile');
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Edit Profile
                </button>
                <button className="profile-menu-item" onClick={() => {
                  setShowProfileMenu(false);
                  navigate('/payment-history');
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8H3v8h18v-8h-6V4a3 3 0 0 0-3-3z"></path>
                  </svg>
                  Payment History
                </button>
                <button 
                  className="profile-menu-item upgrade-plan"
                  onClick={() => {
                    setShowProfileMenu(false);
                    setShowPaymentModal(true);
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  Upgrade Plan
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

        {/* M3 Styled Search and Action Buttons */}
        <Box sx={{
          backgroundColor: '#0A4DFF',
          p: { xs: 2, md: 4 },
          borderRadius: '12px',
          mb: 3,
          mt: 2
        }}>
          {/* The M3-styled Search Bar */}
          <Box sx={{ mb: 3 }}>
            {/* Pass state and handler */}
            <OrganizationSearch searchQuery={searchQuery} onSearchChange={handleSearch} />
          </Box>

          {/* M3-styled Action Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            {/* Primary M3 Button */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateJob}
              disabled={!isPremium}
              sx={{
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 'bold',
                px: 3,
                py: 1.5,
                backgroundColor: 'white',
                color: '#0A4DFF',
                '&:hover': {
                  backgroundColor: 'grey.200',
                },
                '&.Mui-disabled': {
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'rgba(10, 77, 255, 0.5)'
                }
              }}
            >
              Create Job Post
            </Button>

            {/* Secondary M3 Button */}
            <Button
              variant="outlined"
              startIcon={<AppsIcon />}
              onClick={() => alert('Bulk actions - Coming soon!')}
              disabled={!isPremium}
              sx={{
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 'bold',
                px: 3,
                py: 1.5,
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&.Mui-disabled': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }}
            >
              Bulk Actions
            </Button>
          </Stack>
        </Box>

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
                setShowPaymentModal(false);
                setSelectedPlan(null);
                setShowQRCode(false);
                setQrCodeDataURL('');
                setPaymentStatus('pending');
              }}>
                ✕
              </button>
            </div>

             {/* Show plans ONLY if no plan is selected yet */}
            {!selectedPlan && (
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
                        onClick={() => handleSelectPlan(plan)} // This now just sets the selected plan
                      >
                        Select Plan
                      </button>
                    </div>
                  ))}
                </div>
            )}


            {/* Show summary and payment options only AFTER a plan is selected */}
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

                {/* QR Code Section - Generate QR when plan is selected, show it here */}
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

                {/* Payment Actions */}
                <div className="payment-actions">
                  {paymentStatus === 'pending' && (
                    <button className="pay-now-btn" onClick={handlePayment}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                      {showQRCode ? 'Confirm Payment' : `Pay ₹${selectedPlan.price}`}
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
                    style={{ color: '#000000', backgroundColor: '#ffffff' }}
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
                    style={{ color: '#000000', backgroundColor: '#ffffff' }}
                  />
                </div>
                <div className="form-group">
                  <label>Salary Range</label>
                  <input
                    type="text"
                    value={jobData.salary}
                    onChange={(e) => handleJobInputChange('salary', e.target.value)}
                    placeholder="e.g., ₹15,000-25,000/month"
                    style={{ color: '#000000', backgroundColor: '#ffffff' }}
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
                  style={{ color: '#000000', backgroundColor: '#ffffff' }}
                />
              </div>

              <div className="form-group">
                <label>Requirements</label>
                <textarea
                  value={jobData.requirements}
                  onChange={(e) => handleJobInputChange('requirements', e.target.value)}
                  placeholder="List the required skills, experience, physical abilities, or certifications needed..."
                  rows={3}
                  style={{ color: '#000000', backgroundColor: '#ffffff' }}
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
  );
};

export default OrganizationHome;