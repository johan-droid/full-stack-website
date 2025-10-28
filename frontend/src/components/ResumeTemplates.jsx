// Real resume template components
export const ModernTemplate = ({ data }) => (
  <div className="resume-template modern-template">
    <div className="header-section">
      <h1>{data.name || 'Your Name'}</h1>
      <div className="contact-info">
        <span>{data.email || 'email@example.com'}</span>
        <span>{data.phone || '+1 (555) 123-4567'}</span>
        <span>{data.location || 'City, State'}</span>
      </div>
    </div>
    
    <div className="content-grid">
      <div className="main-content">
        <section className="experience">
          <h2>Experience</h2>
          {(data.experience || []).map((exp, i) => (
            <div key={i} className="experience-item">
              <h3>{exp.title}</h3>
              <div className="company-date">
                <span>{exp.company}</span>
                <span>{exp.duration}</span>
              </div>
              <ul>
                {exp.responsibilities?.map((resp, j) => (
                  <li key={j}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
      
      <div className="sidebar">
        <section className="skills">
          <h2>Skills</h2>
          <div className="skills-list">
            {(data.skills || []).map((skill, i) => (
              <span key={i} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>
        
        <section className="education">
          <h2>Education</h2>
          {(data.education || []).map((edu, i) => (
            <div key={i} className="education-item">
              <h3>{edu.degree}</h3>
              <p>{edu.school}</p>
              <span>{edu.year}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  </div>
);

export const ClassicTemplate = ({ data }) => (
  <div className="resume-template classic-template">
    <div className="header">
      <h1>{data.name || 'Your Name'}</h1>
      <div className="contact-line">
        {data.email || 'email@example.com'} | {data.phone || '+1 (555) 123-4567'} | {data.location || 'City, State'}
      </div>
    </div>
    
    <section className="summary">
      <h2>Professional Summary</h2>
      <p>{data.summary || 'Professional summary goes here...'}</p>
    </section>
    
    <section className="experience">
      <h2>Professional Experience</h2>
      {(data.experience || []).map((exp, i) => (
        <div key={i} className="job">
          <div className="job-header">
            <h3>{exp.title}</h3>
            <span className="duration">{exp.duration}</span>
          </div>
          <p className="company">{exp.company}</p>
          <ul>
            {exp.responsibilities?.map((resp, j) => (
              <li key={j}>{resp}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
    
    <section className="education">
      <h2>Education</h2>
      {(data.education || []).map((edu, i) => (
        <div key={i} className="education-entry">
          <h3>{edu.degree}</h3>
          <p>{edu.school} | {edu.year}</p>
        </div>
      ))}
    </section>
    
    <section className="skills">
      <h2>Technical Skills</h2>
      <p>{(data.skills || []).join(', ')}</p>
    </section>
  </div>
);

export const CreativeTemplate = ({ data }) => (
  <div className="resume-template creative-template">
    <div className="left-column">
      <div className="profile-section">
        <div className="profile-circle">
          {(data.name || 'YN').split(' ').map(n => n[0]).join('')}
        </div>
        <h1>{data.name || 'Your Name'}</h1>
        <p className="title">{data.title || 'Professional Title'}</p>
      </div>
      
      <section className="contact">
        <h2>Contact</h2>
        <div className="contact-item">{data.email || 'email@example.com'}</div>
        <div className="contact-item">{data.phone || '+1 (555) 123-4567'}</div>
        <div className="contact-item">{data.location || 'City, State'}</div>
      </section>
      
      <section className="skills">
        <h2>Skills</h2>
        {(data.skills || []).map((skill, i) => (
          <div key={i} className="skill-item">
            <span>{skill}</span>
            <div className="skill-bar">
              <div className="skill-fill" style={{width: '85%'}}></div>
            </div>
          </div>
        ))}
      </section>
    </div>
    
    <div className="right-column">
      <section className="about">
        <h2>About Me</h2>
        <p>{data.summary || 'Professional summary goes here...'}</p>
      </section>
      
      <section className="experience">
        <h2>Experience</h2>
        {(data.experience || []).map((exp, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>{exp.title}</h3>
              <p className="company">{exp.company}</p>
              <span className="duration">{exp.duration}</span>
              <ul>
                {exp.responsibilities?.map((resp, j) => (
                  <li key={j}>{resp}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </div>
  </div>
);

export const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate
};