import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { calculateATSScore, extractTextFromFile } from '../../../utils/atsScorer'
import './ATSScorePage.css'

const ATSScorePage = () => {
  const navigate = useNavigate()
  const [resumeFile, setResumeFile] = useState(null)
  const [atsScore, setAtsScore] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setResumeFile(file)
      setAtsScore(null)
      setShowResults(false)
    }
  }

  const handleAnalyze = async () => {
    if (!resumeFile) {
      alert('Please upload a resume first')
      return
    }

    setIsAnalyzing(true)
    
    try {
      const resumeText = await extractTextFromFile(resumeFile)
      const analysis = calculateATSScore(resumeText)
      
      setAtsScore({
        score: analysis.score,
        suggestions: analysis.suggestions,
        keywords: analysis.keywords,
        file: resumeFile.name
      })
      setIsAnalyzing(false)
      setShowResults(true)
    } catch (error) {
      console.error('Error analyzing resume:', error)
      alert('Error analyzing resume. Please try again.')
      setIsAnalyzing(false)
    }
  }

  const handleImproveResume = () => {
    alert('Improving resume based on ATS suggestions...')
    // Navigate to edit resume page
  }

  return (
    <div className="ats-container">
      <div className="ats-header">
        <button className="back-btn" onClick={() => navigate('/user-home')}>←</button>
        <h1>ATS Score Checker</h1>
        <p>Upload your resume and get instant feedback on ATS compatibility</p>
      </div>

      <div className="ats-content">
        {!showResults ? (
          <>
            <div className="upload-section">
              <div className="upload-box" onClick={() => document.getElementById('file-input').click()}>
                <input
                  type="file"
                  id="file-input"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="upload-icon">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <h3>Upload Your Resume</h3>
                <p>Click to upload or drag and drop</p>
                <span className="file-formats">PDF, DOC, DOCX (Max 5MB)</span>
                
                {resumeFile && (
                  <div className="file-selected">
                    ✓ {resumeFile.name}
                  </div>
                )}
              </div>
            </div>

            <div className="ats-info">
              <h3>What is ATS?</h3>
              <p>
                Applicant Tracking System (ATS) is software used by employers to manage job applications.
                We'll analyze your resume for ATS compatibility including keywords, formatting, and structure.
              </p>
            </div>

            <button 
              className="analyze-btn"
              onClick={handleAnalyze}
              disabled={!resumeFile || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                  Analyzing Resume...
                </>
              ) : (
                'Check ATS Score'
              )}
            </button>
          </>
        ) : (
          <div className="results-section">
            <div className="score-card">
              <h3>Your ATS Score</h3>
              <div className="score-circle">
                <span className="score-number">{atsScore.score}%</span>
                <svg className="score-ring" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth="15"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#667eea"
                    strokeWidth="15"
                    strokeLinecap="round"
                    strokeDasharray={`${atsScore.score * 5.02} 502`}
                    transform="rotate(-90 100 100)"
                  />
                </svg>
              </div>
              <p className="score-label">
                {atsScore.score >= 80 ? 'Excellent!' : 
                 atsScore.score >= 60 ? 'Good, but can be improved' : 
                 'Needs improvement'}
              </p>
            </div>

            <div className="suggestions-card">
              <h3>Suggestions to Improve</h3>
              <ul className="suggestions-list">
                {atsScore.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
              
              {atsScore.keywords && (
                <div className="keywords-section">
                  <h4>Keywords Found: {atsScore.keywords.found.length}</h4>
                  <div className="keywords-found">
                    {atsScore.keywords.found.map((keyword, i) => (
                      <span key={i} className="keyword-tag found">{keyword}</span>
                    ))}
                  </div>
                  {atsScore.keywords.missing.length > 0 && (
                    <>
                      <h4>Consider Adding:</h4>
                      <div className="keywords-missing">
                        {atsScore.keywords.missing.slice(0, 5).map((keyword, i) => (
                          <span key={i} className="keyword-tag missing">{keyword}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="action-buttons">
              <button className="improve-btn" onClick={handleImproveResume}>
                Improve Resume Now
              </button>
              <button className="edit-btn" onClick={() => navigate('/resume-generator')}>
                Edit Resume
              </button>
              <button className="retry-btn" onClick={() => {
                setAtsScore(null)
                setShowResults(false)
              }}>
                Analyze Another Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ATSScorePage

