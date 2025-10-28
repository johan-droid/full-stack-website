import { createContext, useState, useContext } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null)

  const translations = {
    hindi: {
      appName: "ReZoom",
      welcome: "स्वागत है",
      selectLanguage: "अपनी भाषा चुनें",
      select: "चुनें"
    },
    english: {
      appName: "ReZoom",
      welcome: "Welcome",
      selectLanguage: "Select Your Language",
      select: "Select"
    },
    // Add more translations as needed
  }

  const translate = (key) => {
    if (!selectedLanguage) return key
    return translations[selectedLanguage]?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  )
}

