import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './ResumeGenerator.css'

const ResumeGenerator = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedTemplate = location.state?.template || { id: 1, name: 'Modern Professional' }

  const [resumeData, setResumeData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    address: '',
    
    // Work History
    workHistory: [
      { company: '', position: '', duration: '', duties: '' }
    ],
    
    // Certifications & Licenses
    certifications: '',
    
    // Skills & Tools
    skills: ''
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const handleInputChange = (field, value, index = null) => {
    if (index !== null) {
      const updatedHistory = [...resumeData.workHistory]
      updatedHistory[index][field] = value
      setResumeData({ ...resumeData, workHistory: updatedHistory })
    } else {
      setResumeData({ ...resumeData, [field]: value })
    }
  }

  const addWorkHistory = () => {
    setResumeData({
      ...resumeData,
      workHistory: [...resumeData.workHistory, { company: '', position: '', duration: '', duties: '' }]
    })
  }

  const removeWorkHistory = (index) => {
    if (resumeData.workHistory.length > 1) {
      const updated = resumeData.workHistory.filter((_, i) => i !== index)
      setResumeData({ ...resumeData, workHistory: updated })
    }
  }

  const generateResume = () => {
    // Validate required fields
    if (!resumeData.fullName || !resumeData.email || !resumeData.phone) {
      alert('Please fill in all required fields')
      return
    }
    
    alert(`Resume generated successfully! Download will start shortly.\n\nTemplate: ${selectedTemplate.name}\nName: ${resumeData.fullName}`)
    navigate('/user-home')
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="resume-generator-container">
      <div className="generator-header">
        <button className="back-btn" onClick={() => navigate('/templates')}>←</button>
        <div className="header-info">
          <h1>Generate Your Resume</h1>
          <p>Template: <span className="template-name">{selectedTemplate.name}</span></p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`progress-step ${currentStep > i ? 'completed' : ''} ${currentStep === i + 1 ? 'active' : ''}`}
          />
        ))}
      </div>

      <div className="generator-content">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="step-content">
            <h2>Personal Information 👤</h2>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={resumeData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                value={resumeData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 234 567 8900"
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={resumeData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="City, State"
              />
            </div>
          </div>
        )}

        {/* Step 2: Work History */}
        {currentStep === 2 && (
          <div className="step-content">
            <h2>Work History 🔧</h2>
            {resumeData.workHistory.map((job, index) => (
              <div key={index} className="work-history-card">
                <div className="card-header">
                  <h3>Job {index + 1}</h3>
                  {resumeData.workHistory.length > 1 && (
                    <button className="remove-btn" onClick={() => removeWorkHistory(index)}>Remove</button>
                  )}
                </div>
                <div className="form-group">
                  <label>Company Name *</label>
                  <input
                    type="text"
                    value={job.company}
                    onChange={(e) => handleInputChange('company', e.target.value, index)}
                    placeholder="ABC Construction"
                  />
                </div>
                <div className="form-group">
                  <label>Job Position *</label>
                  <input
                    type="text"
                    value={job.position}
                    onChange={(e) => handleInputChange('position', e.target.value, index)}
                    placeholder="Construction Worker"
                  />
                </div>
                <div className="form-group">
                  <label>Duration *</label>
                  <input
                    type="text"
                    value={job.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value, index)}
                    placeholder="Jan 2020 - Present"
                  />
                </div>
                <div className="form-group">
                  <label>Job Duties & Responsibilities</label>
                  <textarea
                    value={job.duties}
                    onChange={(e) => handleInputChange('duties', e.target.value, index)}
                    placeholder="List your responsibilities, achievements..."
                    rows="4"
                  />
                </div>
              </div>
            ))}
            <button className="add-more-btn" onClick={addWorkHistory}>+ Add Another Job</button>
          </div>
        )}

        {/* Step 3: Certifications */}
        {currentStep === 3 && (
          <div className="step-content">
            <h2>Licenses & Certifications 🎖️</h2>
            <div className="form-group">
              <label>Certifications & Licenses</label>
              <textarea
                value={resumeData.certifications}
                onChange={(e) => handleInputChange('certifications', e.target.value)}
                placeholder="Example: CDL License, OSHA 30-Hour, OSHA 10-Hour, Welding Certification, Forklift Operator, etc."
                rows="6"
              />
              <p className="helper-text">List your certifications, licenses, and training (one per line or comma separated)</p>
            </div>
          </div>
        )}

        {/* Step 4: Skills */}
        {currentStep === 4 && (
          <div className="step-content">
            <h2>Skills & Tools Experience 🔨</h2>
            <div className="form-group">
              <label>Skills & Tools</label>
              <textarea
                value={resumeData.skills}
                onChange={(e) => handleInputChange('skills', e.target.value)}
                placeholder="Example: Power tools, Hand tools, Heavy machinery, Forklift operation, Carpentry, Welding, etc."
                rows="6"
              />
              <p className="helper-text">List your skills, tools, equipment, and machinery experience (one per line or comma separated)</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="step-navigation">
          <button className="prev-btn" onClick={prevStep} disabled={currentStep === 1}>
            Previous
          </button>
          <div className="step-indicator">Step {currentStep} of {totalSteps}</div>
          <button className="next-btn" onClick={currentStep === totalSteps ? generateResume : nextStep}>
            {currentStep === totalSteps ? 'Generate Resume' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResumeGenerator

