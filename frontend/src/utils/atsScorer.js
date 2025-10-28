// Real ATS scoring algorithm
export const calculateATSScore = (resumeText, jobDescription = '') => {
  const analysis = {
    score: 0,
    issues: [],
    suggestions: [],
    keywords: { found: [], missing: [] }
  };

  // Common ATS-friendly keywords
  const commonKeywords = [
    'experience', 'skills', 'education', 'management', 'leadership',
    'project', 'team', 'development', 'analysis', 'communication',
    'problem-solving', 'strategic', 'results', 'achievement'
  ];

  // Check for basic sections (30 points)
  const sections = ['experience', 'education', 'skills', 'contact'];
  const foundSections = sections.filter(section => 
    resumeText.toLowerCase().includes(section)
  );
  analysis.score += (foundSections.length / sections.length) * 30;

  // Check for keywords (25 points)
  const foundKeywords = commonKeywords.filter(keyword =>
    resumeText.toLowerCase().includes(keyword.toLowerCase())
  );
  analysis.keywords.found = foundKeywords;
  analysis.keywords.missing = commonKeywords.filter(k => !foundKeywords.includes(k));
  analysis.score += (foundKeywords.length / commonKeywords.length) * 25;

  // Check formatting (20 points)
  let formatScore = 0;
  if (resumeText.includes('@')) formatScore += 5; // Email
  if (/\d{3}[-.]?\d{3}[-.]?\d{4}/.test(resumeText)) formatScore += 5; // Phone
  if (resumeText.split('\n').length > 10) formatScore += 5; // Proper structure
  if (resumeText.length > 500) formatScore += 5; // Adequate length
  analysis.score += formatScore;

  // Check for action verbs (15 points)
  const actionVerbs = ['managed', 'led', 'developed', 'created', 'implemented', 'achieved', 'improved'];
  const foundVerbs = actionVerbs.filter(verb =>
    resumeText.toLowerCase().includes(verb)
  );
  analysis.score += (foundVerbs.length / actionVerbs.length) * 15;

  // Check for quantifiable achievements (10 points)
  const hasNumbers = /\d+%|\$\d+|\d+\+/.test(resumeText);
  if (hasNumbers) analysis.score += 10;

  // Generate suggestions based on analysis
  if (foundSections.length < 4) {
    analysis.suggestions.push('Add missing sections: ' + sections.filter(s => !foundSections.includes(s)).join(', '));
  }
  if (foundKeywords.length < 8) {
    analysis.suggestions.push('Include more industry keywords: ' + analysis.keywords.missing.slice(0, 3).join(', '));
  }
  if (foundVerbs.length < 4) {
    analysis.suggestions.push('Use more action verbs to describe your achievements');
  }
  if (!hasNumbers) {
    analysis.suggestions.push('Add quantifiable achievements (percentages, dollar amounts, numbers)');
  }
  if (formatScore < 15) {
    analysis.suggestions.push('Ensure contact information is clearly formatted');
  }

  // Cap score at 100
  analysis.score = Math.min(100, Math.round(analysis.score));

  return analysis;
};

// Extract text from different file types
export const extractTextFromFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target.result;
      // For demo purposes, return the text as-is
      // In production, you'd use libraries like pdf-parse for PDFs
      resolve(text);
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    
    if (file.type === 'text/plain') {
      reader.readAsText(file);
    } else {
      // For PDF/DOC files, simulate text extraction
      setTimeout(() => {
        resolve(`Sample resume text for ${file.name}
        
        John Doe
        Software Engineer
        john.doe@email.com
        (555) 123-4567
        
        Experience:
        Senior Software Developer at Tech Corp (2020-2023)
        - Developed and maintained web applications
        - Led a team of 5 developers
        - Improved system performance by 40%
        - Managed project timelines and deliverables
        
        Skills:
        JavaScript, React, Node.js, Python, SQL, Project Management
        
        Education:
        Bachelor of Science in Computer Science
        University of Technology (2018)`);
      }, 1000);
    }
  });
};