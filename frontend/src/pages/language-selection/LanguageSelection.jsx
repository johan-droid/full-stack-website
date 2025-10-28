import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import '../language-selection/LanguageSelection.css'

const languages = [
  { code: 'hindi', name: 'Hindi', native: 'हिन्दी', script: 'हिन्दी' },
  { code: 'english', name: 'English', native: 'English', script: 'English' },
  { code: 'bengali', name: 'Bengali', native: 'বাংলা', script: 'বাংলা' },
  { code: 'telugu', name: 'Telugu', native: 'తెలుగు', script: 'తెలుగు' },
  { code: 'marathi', name: 'Marathi', native: 'मराठी', script: 'मराठी' },
  { code: 'tamil', name: 'Tamil', native: 'தமிழ்', script: 'தமிழ்' },
  { code: 'gujarati', name: 'Gujarati', native: 'ગુજરાતી', script: 'ગુજરાતી' },
  { code: 'kannada', name: 'Kannada', native: 'ಕನ್ನಡ', script: 'ಕನ್ನಡ' },
  { code: 'malayalam', name: 'Malayalam', native: 'മലയാളം', script: 'മലയാളം' },
  { code: 'punjabi', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', script: 'ਪੰਜਾਬੀ' },
  { code: 'odia', name: 'Odia', native: 'ଓଡ଼ିଆ', script: 'ଓଡ଼ିଆ' },
  { code: 'assamese', name: 'Assamese', native: 'অসমীয়া', script: 'অসমীয়া' },
  { code: 'maithili', name: 'Maithili', native: 'मैथिली', script: 'मैथिली' },
  { code: 'urdu', name: 'Urdu', native: 'اردو', script: 'اردو' },
  { code: 'sanskrit', name: 'Sanskrit', native: 'संस्कृतम्', script: 'संस्कृतम्' },
  { code: 'nepali', name: 'Nepali', native: 'नेपाली', script: 'नेपाली' },
  { code: 'konkani', name: 'Konkani', native: 'ಕೊಂಕಣಿ', script: 'ಕೊಂಕಣಿ' },
  { code: 'manipuri', name: 'Manipuri', native: 'ꯃꯤꯇꯩꯂꯣꯟ', script: 'ꯃꯤꯇꯩꯂꯣꯟ' },
  { code: 'khasi', name: 'Khasi', native: 'Ka Ktien Khasi', script: 'Ka Ktien Khasi' },
  { code: 'bodo', name: 'Bodo', native: 'बड़ो', script: 'बड़ो' },
  { code: 'dogri', name: 'Dogri', native: 'डोगरी', script: 'डोगरी' },
  { code: 'santhali', name: 'Santhali', native: 'संथाली', script: 'संथाली' }
]

const LanguageSelection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const { setSelectedLanguage: setGlobalLanguage } = useLanguage()
  const navigate = useNavigate()

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language)
  }

  const handleContinue = () => {
    if (selectedLanguage) {
      setGlobalLanguage(selectedLanguage.code)
      navigate('/tutorial')
    }
  }

  return (
    <div className="language-selection-container">
      <div className="language-header">
        <h1>Select Your Language</h1>
        <p>अपनी भाषा चुनें - Choose your preferred language</p>
      </div>

      <div className="languages-grid">
        {languages.map((language) => (
          <div
            key={language.code}
            className={`language-card ${selectedLanguage?.code === language.code ? 'selected' : ''}`}
            onClick={() => handleLanguageSelect(language)}
          >
            <div className="language-name">{language.name}</div>
            <div className="language-native">{language.script}</div>
          </div>
        ))}
      </div>

      <button
        className="continue-button"
        onClick={handleContinue}
        disabled={!selectedLanguage}
      >
        Continue / जारी रखें
      </button>
    </div>
  )
}

export default LanguageSelection