import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './GuestATSScorePage.css'

const GuestATSScorePage = () => {
  const navigate = useNavigate()
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [atsScore, setAtsScore] = useState(null)
  const [recommendations, setRecommendations] = useState([])

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setUploadedFile(file)
      setAnalysisComplete(false)
      setAtsScore(null)
      setRecommendations([])
    }
  }

  const handleAnalyzeResume = () => {
    if (!uploadedFile) {
      alert('Please upload a resume file first!')
      return
    }

    setIsAnalyzing(true)
    
    // Simulate analysis process
    setTimeout(() => {
      const score = Math.floor(Math.random() * 40) + 60 // Score between 60-100
      setAtsScore(score)
      
      // Generate sample recommendations
      const sampleRecommendations = [
        {
          type: 'keyword',
          title: 'Add More Keywords',
          description: 'Include industry-specific keywords from the job description',
          priority: 'high'
        },
        {
          type: 'format',
          title: 'Improve Formatting',
          description: 'Use standard fonts and avoid complex layouts',
          priority: 'medium'
        },
        {
          type: 'content',
          title: 'Quantify Achievements',
          description: 'Add numbers and metrics to your accomplishments',
          priority: 'high'
        },
        {
          type: 'structure',
          title: 'Optimize Structure',
          description: 'Ensure clear section headers and consistent formatting',
          priority: 'low'
        }
      ]
      
      setRecommendations(sampleRecommendations)
      setAnalysisComplete(true)
      setIsAnalyzing(false)
    }, 3000)
  }

  const handleSignUp = () => {
    navigate('/tutorial')
  }

  const getScoreColor = (score) => {
    if (score >= 90) return '#27ae60'
    if (score >= 80) return '#f39c12'
    if (score >= 70) return '#e67e22'
    return '#e74c3c'
  }

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent'
    if (score >= 80) return 'Good'
    if (score >= 70) return 'Fair'
    return 'Needs Improvement'
  }

  return (
    <div className="guest-ats-container">
      {/* Header */}
      <div className="guest-ats-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/guest-user')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Back
          </button>
          <h1>ATS Score Checker</h1>
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
          <h2>📊 Check Your ATS Score!</h2>
          <p>Upload your resume to see how well it performs with Applicant Tracking Systems.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="guest-ats-content">
        <div className="upload-section">
          <div className="upload-card">
            <h2>Upload Your Resume</h2>
            <p>Upload your resume to get an instant ATS compatibility score</p>
            
            <div className="upload-area">
              <div className="upload-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </div>
              
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="file-input"
                />
                <label htmlFor="resume-upload" className="file-input-label">
                  Choose File
                </label>
              </div>
              
              {uploadedFile && (
                <div className="file-info">
                  <div className="file-name">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    {uploadedFile.name}
                  </div>
                  <div className="file-size">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              )}
              
              <p className="file-types">Supports PDF, DOC, DOCX files (Max 5MB)</p>
            </div>
            
            <button 
              className="analyze-btn" 
              onClick={handleAnalyzeResume}
              disabled={!uploadedFile || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <div className="spinner"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                  Analyze Resume
                </>
              )}
            </button>
          </div>
        </div>

        {analysisComplete && (
          <div className="results-section">
            <div className="score-card">
              <h2>Your ATS Score</h2>
              <div className="score-display">
                <div 
                  className="score-circle"
                  style={{ borderColor: getScoreColor(atsScore) }}
                >
                  <span 
                    className="score-number"
                    style={{ color: getScoreColor(atsScore) }}
                  >
                    {atsScore}
                  </span>
                  <span className="score-label">ATS Score</span>
                </div>
                <div className="score-info">
                  <h3 
                    className="score-grade"
                    style={{ color: getScoreColor(atsScore) }}
                  >
                    {getScoreLabel(atsScore)}
                  </h3>
                  <p className="score-description">
                    {atsScore >= 90 
                      ? "Your resume is highly optimized for ATS systems!"
                      : atsScore >= 80
                      ? "Your resume performs well with ATS systems."
                      : atsScore >= 70
                      ? "Your resume has room for improvement."
                      : "Your resume needs significant optimization for ATS systems."
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="recommendations-card">
              <h2>Recommendations</h2>
              <div className="recommendations-list">
                {recommendations.map((rec, index) => (
                  <div key={index} className={`recommendation-item ${rec.priority}`}>
                    <div className="recommendation-icon">
                      {rec.type === 'keyword' && '🔑'}
                      {rec.type === 'format' && '📝'}
                      {rec.type === 'content' && '📊'}
                      {rec.type === 'structure' && '🏗️'}
                    </div>
                    <div className="recommendation-content">
                      <h4>{rec.title}</h4>
                      <p>{rec.description}</p>
                    </div>
                    <div className={`priority-badge ${rec.priority}`}>
                      {rec.priority}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="action-card">
              <h2>Improve Your Resume</h2>
              <p>Use our templates and tools to create an ATS-optimized resume</p>
              <div className="action-buttons">
                <button 
                  className="templates-btn"
                  onClick={() => navigate('/guest-templates')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  Use Templates
                </button>
                <button 
                  className="signup-btn"
                  onClick={handleSignUp}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                  Sign Up for More
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GuestATSScorePage
