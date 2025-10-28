import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModernTemplate, ClassicTemplate, CreativeTemplate } from '../../../components/ResumeTemplates'
import './TemplatesPage.css'

const TemplatesPage = () => {
  const navigate = useNavigate()
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const sampleData = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    title: 'Software Engineer',
    summary: 'Experienced software engineer with 5+ years in web development.',
    experience: [{
      title: 'Senior Developer',
      company: 'Tech Corp',
      duration: '2020-2023',
      responsibilities: ['Led development team', 'Built scalable applications']
    }],
    education: [{
      degree: 'BS Computer Science',
      school: 'University of Technology',
      year: '2018'
    }],
    skills: ['JavaScript', 'React', 'Node.js', 'Python']
  };

  const templates = [
    {
      id: 1,
      name: 'Modern Professional',
      description: 'Clean and contemporary design, perfect for tech roles',
      category: 'Professional',
      component: ModernTemplate,
      recommended: true
    },
    {
      id: 2,
      name: 'Classic Traditional',
      description: 'Timeless design, suitable for all industries',
      category: 'Traditional',
      component: ClassicTemplate,
      recommended: false
    },
    {
      id: 3,
      name: 'Creative Portfolio',
      description: 'Eye-catching design for creative professionals',
      category: 'Creative',
      component: CreativeTemplate,
      recommended: false
    }
  ]

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template)
  }

  const handleContinue = () => {
    if (!selectedTemplate) {
      alert('Please select a template first')
      return
    }
    navigate('/resume-generator', { state: { template: selectedTemplate } })
  }

  return (
    <div className="templates-container">
      <div className="templates-header">
        <button className="back-btn" onClick={() => navigate('/user-home')}>←</button>
        <h1>Choose Your Resume Template</h1>
        <p>Select a template that matches your style and industry</p>
      </div>

      <div className="templates-grid">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate?.id === template.id ? 'selected' : ''} ${template.recommended ? 'recommended' : ''}`}
            onClick={() => handleSelectTemplate(template)}
          >
            {template.recommended && <div className="recommended-badge">⭐ Recommended</div>}
            
            <div className="template-preview">
              <div className="preview-container">
                <template.component data={sampleData} />
              </div>
            </div>

            <div className="template-info">
              <h3>{template.name}</h3>
              <p className="template-category">{template.category}</p>
              <p className="template-description">{template.description}</p>
              <button className="select-template-btn">
                {selectedTemplate?.id === template.id ? '✓ Selected' : 'Select Template'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="templates-actions">
        <button className="cancel-btn" onClick={() => navigate('/user-home')}>
          Cancel
        </button>
        <button className="continue-btn" onClick={handleContinue} disabled={!selectedTemplate}>
          Continue with Selected Template
        </button>
      </div>
    </div>
  )
}

export default TemplatesPage

