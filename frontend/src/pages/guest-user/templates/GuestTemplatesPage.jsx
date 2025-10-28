import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './GuestTemplatesPage.css'

const GuestTemplatesPage = () => {
  const navigate = useNavigate()
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showResumeForm, setShowResumeForm] = useState(false)
  const [resumeData, setResumeData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    experience: '',
    education: '',
    skills: ''
  })

  const templates = [
    {
      id: 1,
      name: 'Modern Professional',
      preview: '🎨',
      description: 'Clean and contemporary design',
      color: '#667eea'
    },
    {
      id: 2,
      name: 'Classic Executive',
      preview: '💼',
      description: 'Traditional and formal layout',
      color: '#2c3e50'
    },
    {
      id: 3,
      name: 'Creative Designer',
      preview: '✨',
      description: 'Bold and artistic style',
      color: '#e74c3c'
    },
    {
      id: 4,
      name: 'Tech Specialist',
      preview: '💻',
      description: 'Modern tech-focused design',
      color: '#27ae60'
    }
  ]

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    setShowResumeForm(true)
  }

  const handleInputChange = (e) => {
    setResumeData({
      ...resumeData,
      [e.target.name]: e.target.value
    })
  }

  const handleGenerateResume = () => {
    // Generate resume with selected template and data
    alert(`Resume generated successfully with ${selectedTemplate.name} template!`)
    // Here you would typically generate and show the resume preview
  }

  const handleDownloadResume = () => {
    // Download the generated resume
    alert('Resume downloaded successfully!')
    // Here you would typically trigger the download
  }

  const handleBackToTemplates = () => {
    setShowResumeForm(false)
    setSelectedTemplate(null)
  }

  const handleSignUp = () => {
    navigate('/tutorial')
  }

  return (
    <div className="guest-templates-container">
      {/* Header */}
      <div className="guest-templates-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/guest-user')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Back
          </button>
          <h1>Resume Templates</h1>
        </div>
        
        <div className="header-right">
          <button className="signup-btn" onClick={handleSignUp}>
            Sign Up for More Features
          </button>
        </div>
      </div>

      {/* Guest Notice */}
      <div className="guest-notice">
        <div className="notice-content">
          <h2>🎉 Generate Your Resume!</h2>
          <p>Choose a template, fill in your details, and download your professional resume instantly.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="guest-templates-content">
        {!showResumeForm ? (
          <>
            <div className="templates-section">
              <h2>Choose Your Template</h2>
              <p>Select a professional template for your resume</p>
              
              <div className="templates-grid">
                {templates.map((template) => (
                  <div 
                    key={template.id} 
                    className="template-card"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className="template-preview" style={{ backgroundColor: template.color }}>
                      <div className="template-icon">{template.preview}</div>
                      <div className="template-sample">
                        <div className="sample-header">
                          <div className="sample-name">John Doe</div>
                          <div className="sample-title">Software Engineer</div>
                        </div>
                        <div className="sample-content">
                          <div className="sample-section">
                            <h4>Experience</h4>
                            <p>Senior Developer</p>
                          </div>
                          <div className="sample-section">
                            <h4>Education</h4>
                            <p>Computer Science</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="template-info">
                      <h3>{template.name}</h3>
                      <p>{template.description}</p>
                      <button className="select-template-btn">
                        Use This Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="resume-form-section">
            <div className="form-header">
              <button className="back-to-templates-btn" onClick={handleBackToTemplates}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Back to Templates
              </button>
              <h2>Fill Your Details</h2>
              <p>Complete your resume information</p>
            </div>

            <div className="resume-form">
              <div className="form-section">
                <h3>Personal Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={resumeData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={resumeData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={resumeData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={resumeData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Professional Summary</h3>
                <div className="form-group">
                  <label>Summary</label>
                  <textarea
                    name="summary"
                    value={resumeData.summary}
                    onChange={handleInputChange}
                    placeholder="Write a brief summary about yourself and your career goals"
                    rows="4"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Work Experience</h3>
                <div className="form-group">
                  <label>Experience</label>
                  <textarea
                    name="experience"
                    value={resumeData.experience}
                    onChange={handleInputChange}
                    placeholder="Describe your work experience, including job titles, companies, and key achievements"
                    rows="6"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Education</h3>
                <div className="form-group">
                  <label>Education</label>
                  <textarea
                    name="education"
                    value={resumeData.education}
                    onChange={handleInputChange}
                    placeholder="List your educational background, including degrees, institutions, and graduation years"
                    rows="4"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Skills</h3>
                <div className="form-group">
                  <label>Skills</label>
                  <textarea
                    name="skills"
                    value={resumeData.skills}
                    onChange={handleInputChange}
                    placeholder="List your key skills and competencies"
                    rows="3"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button className="generate-btn" onClick={handleGenerateResume}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  Generate Resume
                </button>
                <button className="download-btn" onClick={handleDownloadResume}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7,10 12,15 17,10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GuestTemplatesPage
