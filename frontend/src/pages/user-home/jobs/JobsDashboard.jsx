import { useState } from 'react'
import './JobsDashboard.css'

const JobsDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedJobType, setSelectedJobType] = useState('')
  const [selectedExperience, setSelectedExperience] = useState('')
  const [showJobModal, setShowJobModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)

  // Mock job data - UPDATED FOR BLUE-COLLAR WORKERS
  const [jobs] = useState([
    {
      id: 1,
      title: 'Plumber & Pipe Fitter',
      company: 'City Maintenance Services',
      location: 'Mumbai',
      jobType: 'Full-time',
      experience: '2-4 years',
      salary: '₹3-5 LPA',
      description: 'We are seeking an experienced Plumber for general maintenance and new installations in residential and commercial buildings. Must be reliable and skilled in leak repair.',
      requirements: [
        'ITI certification or equivalent vocational training.',
        '2+ years of hands-on plumbing experience.',
        'Knowledge of safety procedures and water system regulations.',
        'Ability to read blueprints and diagnostic tools.',
        'Must own basic set of tools.'
      ],
      skills: ['Pipe Fitting', 'Leak Repair', 'Water Heaters', 'Drain Cleaning', 'Safety Procedures'],
      postedDate: '2024-10-25',
      applications: 65
    },
    {
      id: 2,
      title: 'Heavy Vehicle Driver (Trucks)',
      company: 'Logistics India Pvt Ltd',
      location: 'Delhi',
      jobType: 'Full-time',
      experience: '3-5 years',
      salary: '₹4-6 LPA',
      description: 'Require responsible drivers for long-haul and city deliveries. Must have a valid heavy vehicle license and a clean driving record. Night shifts may be required.',
      requirements: [
        'Valid Heavy Motor Vehicle (HMV) driving license.',
        'Minimum 3 years of commercial truck driving experience.',
        'Knowledge of basic vehicle maintenance checks.',
        'Ability to handle delivery paperwork and logs.',
        'Must be punctual and adhere to strict schedules.'
      ],
      skills: ['Long Haul', 'Route Planning', 'Vehicle Inspection', 'Loading/Unloading', 'Log Book Maintenance'],
      postedDate: '2024-10-24',
      applications: 52
    },
    {
      id: 3,
      title: 'Construction Site Helper',
      company: 'New Age Infra',
      location: 'Bangalore',
      jobType: 'Full-time',
      experience: '0-1 years',
      salary: '₹2-3 LPA',
      description: 'We need energetic site helpers for our new project. Duties include moving materials, preparing concrete, cleaning the site, and assisting skilled workers. No prior experience needed.',
      requirements: [
        'Physically fit and capable of lifting heavy materials (50+ kg).',
        'Willingness to work outdoors in various weather conditions.',
        'Basic understanding of safety protocols.',
        'Hardworking and reliable.',
        'Able to follow verbal instructions.'
      ],
      skills: ['Material Handling', 'Site Cleanup', 'Concrete Mixing', 'Scaffolding Assist', 'Tool Organization'],
      postedDate: '2024-10-23',
      applications: 98
    },
    {
      id: 4,
      title: 'Welder (TIG/MIG Certified)',
      company: 'Fabrication Works Pune',
      location: 'Pune',
      jobType: 'Contract',
      experience: '2-4 years',
      salary: '₹3.5-5.5 LPA',
      description: 'Contract opportunity for a certified Welder to work on precision metal fabrication projects. TIG and MIG certifications are mandatory.',
      requirements: [
        'Valid TIG/MIG welding certification from a recognized institution.',
        '2+ years of structural or pipe welding experience.',
        'Ability to read and interpret engineering drawings.',
        'Strong focus on quality control and precision.',
        'Adherence to all industrial safety standards.'
      ],
      skills: ['TIG Welding', 'MIG Welding', 'Blueprint Reading', 'Metal Fabrication', 'Grinding'],
      postedDate: '2024-10-22',
      applications: 35
    },
    {
      id: 5,
      title: 'Residential Electrician (Entry Level)',
      company: 'Power Solutions Chennai',
      location: 'Chennai',
      jobType: 'Full-time',
      experience: '1-2 years',
      salary: '₹2.5-4 LPA',
      description: 'Entry-level position assisting senior electricians with wiring, fixture installation, and troubleshooting in new homes and apartments. Great opportunity to learn and grow.',
      requirements: [
        'Diploma or certificate in Electrical Trade (Wireman License preferred).',
        'Basic knowledge of residential wiring codes.',
        '1+ years of apprenticeship or assistant experience.',
        'Comfortable working at heights (ladders).',
        'Must be detail-oriented and organized.'
      ],
      skills: ['Wiring Installation', 'Circuit Breakers', 'Fixture Mounting', 'Troubleshooting', 'Safety Compliance'],
      postedDate: '2024-10-21',
      applications: 77
    },
    {
      id: 6,
      title: 'Delivery Rider (Bike/Scooter)',
      company: 'QuickShip Services',
      location: 'Remote (Local City Routes)',
      jobType: 'Part-time',
      experience: '0-1 years',
      salary: '₹1.5-3 LPA (Plus incentives)',
      description: 'Part-time job for enthusiastic delivery riders. Deliver packages quickly and safely within your city. Flexible hours available.',
      requirements: [
        'Valid two-wheeler driving license (Bike/Scooter).',
        'Must own a reliable two-wheeler.',
        'Familiarity with local city routes and navigation apps.',
        'Good communication skills with customers.',
        'Punctual and customer-focused.'
      ],
      skills: ['Local Navigation', 'Time Management', 'Customer Service', 'Cash Handling', 'Safe Driving'],
      postedDate: '2024-10-20',
      applications: 112
    }
  ])

  const [filteredJobs, setFilteredJobs] = useState(jobs)

  const locations = ['All', 'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Remote']
  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract']
  const experienceLevels = ['All', '0-1 years', '1-2 years', '2-4 years', '3-5 years', '5+ years']

  const handleSearch = (query) => {
    setSearchQuery(query)
    filterJobs(query, selectedLocation, selectedJobType, selectedExperience)
  }

  const handleLocationChange = (location) => {
    setSelectedLocation(location)
    filterJobs(searchQuery, location, selectedJobType, selectedExperience)
  }

  const handleJobTypeChange = (jobType) => {
    setSelectedJobType(jobType)
    filterJobs(searchQuery, selectedLocation, jobType, selectedExperience)
  }

  const handleExperienceChange = (experience) => {
    setSelectedExperience(experience)
    filterJobs(searchQuery, selectedLocation, selectedJobType, experience)
  }

  const filterJobs = (query, location, jobType, experience) => {
    let filtered = jobs

    if (query.trim()) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
      )
    }

    if (location && location !== 'All') {
      filtered = filtered.filter(job => job.location.includes(location) || job.location.includes('Local City'))
    }

    if (jobType && jobType !== 'All') {
      filtered = filtered.filter(job => job.jobType === jobType)
    }

    if (experience && experience !== 'All') {
      filtered = filtered.filter(job => job.experience === experience)
    }

    setFilteredJobs(filtered)
  }

  const handleJobClick = (job) => {
    setSelectedJob(job)
    setShowJobModal(true)
  }
  
  // Custom message box function instead of alert()
  const customAlert = (message) => {
      const modal = document.createElement('div');
      modal.className = 'custom-alert-modal';
      modal.innerHTML = `
          <div class="custom-alert-content">
              <p>${message}</p>
              <button onclick="document.querySelector('.custom-alert-modal').remove()">OK</button>
          </div>
      `;
      document.body.appendChild(modal);
  }

  const handleApplyJob = (jobId) => {
    // Replaced alert() with custom message box
    customAlert(`Application submitted for ${jobs.find(j => j.id === jobId)?.title} at ${jobs.find(j => j.id === jobId)?.company}!`);
    setShowJobModal(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  return (
    <div className="jobs-dashboard">
      {/* Header */}
      <div className="jobs-header">
        <h2>Find Your Job 🛠️</h2>
        <p>Skilled jobs available now in your area</p>
      </div>

      {/* Search and Filters */}
      <div className="search-filters-section">
        <div className="search-container">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search jobs by title, company, or skills..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label>Location</label>
            <select value={selectedLocation} onChange={(e) => handleLocationChange(e.target.value)}>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Job Type</label>
            <select value={selectedJobType} onChange={(e) => handleJobTypeChange(e.target.value)}>
              {jobTypes.map(jobType => (
                <option key={jobType} value={jobType}>{jobType}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Experience</label>
            <select value={selectedExperience} onChange={(e) => handleExperienceChange(e.target.value)}>
              {experienceLevels.map(experience => (
                <option key={experience} value={experience}>{experience}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-count">
        <span>{filteredJobs.length} jobs found</span>
      </div>

      {/* Jobs Grid */}
      <div className="jobs-grid">
        {filteredJobs.map(job => (
          <div key={job.id} className="job-card" onClick={() => handleJobClick(job)}>
            <div className="job-header">
              <div className="company-logo">
                {job.company.charAt(0)}
              </div>
              <div className="job-info">
                <h3>{job.title}</h3>
                <p className="company-name">{job.company}</p>
              </div>
            </div>

            <div className="job-details">
              <div className="detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{job.location}</span>
              </div>
              <div className="detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                <span>{job.experience}</span>
              </div>
              <div className="detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <span>{job.salary}</span>
              </div>
            </div>

            <div className="job-type-badge">
              <span className={`type-badge ${job.jobType.toLowerCase().replace('-', '')}`}>
                {job.jobType}
              </span>
            </div>

            <div className="skills-section">
              {job.skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
              {job.skills.length > 3 && (
                <span className="more-skills">+{job.skills.length - 3} more</span>
              )}
            </div>

            <div className="job-footer">
              <span className="posted-date">{formatDate(job.postedDate)}</span>
              <span className="applications">{job.applications} applications</span>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="no-jobs">
          <div className="no-jobs-icon">🔍</div>
          <h3>No jobs found</h3>
          <p>Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Job Details Modal */}
      {showJobModal && selectedJob && (
        <div className="job-modal">
          <div className="job-modal-content">
            <div className="job-modal-header">
              <div className="modal-job-info">
                <h2>{selectedJob.title}</h2>
                <p className="modal-company">{selectedJob.company}</p>
              </div>
              <button className="close-btn" onClick={() => setShowJobModal(false)}>
                ✕
              </button>
            </div>

            <div className="job-modal-body">
              <div className="modal-job-details">
                <div className="modal-detail-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{selectedJob.location}</span>
                </div>
                <div className="modal-detail-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                  <span>{selectedJob.experience}</span>
                </div>
                <div className="modal-detail-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  <span>{selectedJob.salary}</span>
                </div>
                <div className="modal-detail-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  <span>{selectedJob.jobType}</span>
                </div>
              </div>

              <div className="modal-section">
                <h3>Job Description</h3>
                <p>{selectedJob.description}</p>
              </div>

              <div className="modal-section">
                <h3>Requirements</h3>
                <ul>
                  {selectedJob.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h3>Skills Required</h3>
                <div className="modal-skills">
                  {selectedJob.skills.map((skill, index) => (
                    <span key={index} className="modal-skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h3>Job Details</h3>
                <div className="job-meta">
                  <div className="meta-item">
                    <span className="meta-label">Posted:</span>
                    <span className="meta-value">{formatDate(selectedJob.postedDate)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Applications:</span>
                    <span className="meta-value">{selectedJob.applications}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="job-modal-actions">
              <button className="cancel-btn" onClick={() => setShowJobModal(false)}>
                Cancel
              </button>
              <button className="apply-btn" onClick={() => handleApplyJob(selectedJob.id)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobsDashboard