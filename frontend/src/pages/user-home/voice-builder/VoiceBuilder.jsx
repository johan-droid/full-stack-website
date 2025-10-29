import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './VoiceBuilder.css'

const VoiceBuilder = () => {
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [sections, setSections] = useState({
    personalInfo: '',
    workHistory: '',
    licensesCertifications: '',
    skillsTools: ''
  })
  const [currentSection, setCurrentSection] = useState('personalInfo')
  const recognitionRef = useRef(null)

  useEffect(() => {
    // Initialize Speech Recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onresult = (event) => {
        const lastResult = event.results[event.results.length - 1]
        if (lastResult.isFinal) {
          const text = lastResult[0].transcript
          setTranscript(prev => prev + ' ' + text)
          
          // Update current section
          setSections(prev => ({
            ...prev,
            [currentSection]: prev[currentSection] + ' ' + text
          }))
        }
      }

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        if (event.error === 'no-speech') {
          setIsListening(false)
        }
      }

      recognitionRef.current = recognition
    }
  }, [currentSection])

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
      setIsRecording(true)
      setIsListening(true)
    } else {
      alert('Speech recognition not supported in this browser. Please use Chrome or Edge.')
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
      setIsListening(false)
    }
  }

  const saveResume = () => {
    alert('Resume saved! You can now download it or continue editing.')
    navigate('/user-home')
  }

  const sectionsList = [
    { key: 'personalInfo', name: 'Personal Information', icon: '👤' },
    { key: 'workHistory', name: 'Work History', icon: '🔧' },
    { key: 'licensesCertifications', name: 'Licenses & Certifications', icon: '🎖️' },
    { key: 'skillsTools', name: 'Skills & Tools Experience', icon: '🔨' }
  ]

  return (
    <div className="voice-builder-container">
      <div className="voice-header">
        <button className="back-btn" onClick={() => navigate('/user-home')}>←</button>
        <h1>Build Your Resume with Voice</h1>
        <p>Tell us about your work experience and we'll create your professional resume</p>
      </div>

      <div className="voice-content">
        {/* Sections Navigation */}
        <div className="sections-nav">
          {sectionsList.map((section) => (
            <button
              key={section.key}
              className={`section-tab ${currentSection === section.key ? 'active' : ''}`}
              onClick={() => setCurrentSection(section.key)}
            >
              <span className="section-icon">{section.icon}</span>
              {section.name}
            </button>
          ))}
        </div>

        {/* Voice Recorder */}
        <div className="voice-recorder-section">
          <div className="recorder-box">
            <div className={`mic-button ${isRecording ? 'recording' : ''}`} onClick={isRecording ? stopRecording : startRecording}>
              {/* The SVG is used as the constant icon, replacing the emoji. */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="mic-icon">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
              {/* The pulse ring is conditionally rendered when recording */}
              {isRecording && <div className="pulse-ring"></div>}
            </div>
            <h3>{isRecording ? 'Listening... Speak now' : 'Click to Start Recording'}</h3>
            <p>{sectionsList.find(s => s.key === currentSection)?.name}</p>
          </div>

          {/* Live Transcript */}
          <div className="transcript-box">
            <h4>Live Transcript:</h4>
            <div className="transcript-text">
              {transcript || 'Your spoken words will appear here...'}
            </div>
          </div>

          {/* Current Section Content */}
          <div className="section-content-box">
            <h4>Your {sectionsList.find(s => s.key === currentSection)?.name}:</h4>
            <textarea
              value={sections[currentSection]}
              onChange={(e) => setSections(prev => ({ ...prev, [currentSection]: e.target.value }))}
              placeholder={currentSection === 'personalInfo' ? 'Name, phone, address' : 
                         currentSection === 'workHistory' ? 'List your jobs: Company, job title, dates, duties' : 
                         currentSection === 'licensesCertifications' ? 'CDL, OSHA, certifications, training completed' : 
                         'Tools, machinery, equipment, physical skills you know'}
              className="section-textarea"
            />
          </div>

          {/* Quick Tips */}
          <div className="tips-box">
            <h4>💡 Tips for Best Results:</h4>
            <ul>
              <li>Mention job titles, companies, and dates</li>
              <li>List your certifications (CDL, OSHA, welding, etc.)</li>
              <li>Describe tools and equipment you're experienced with</li>
              <li>Include any training or apprenticeships</li>
              <li>Speak clearly - you can edit manually later</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="preview-btn" onClick={() => alert('Preview resume coming soon!')}>
            Preview Resume
          </button>
          <button className="save-btn" onClick={saveResume}>
            Save & Finish
          </button>
        </div>
      </div>
    </div>
  )
}

export default VoiceBuilder