/* eslint-disable react-refresh/only-export-components -- igual que ThemeContext, este archivo expone el provider y su hook */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import content from '../utils/content.json'

const STORAGE_KEY = 'language'

const LanguageContext = createContext(null)

const getInitialLanguage = () => {
  try {
    const storedLanguage = localStorage.getItem(STORAGE_KEY)
    if (storedLanguage === 'es' || storedLanguage === 'en') {
      return storedLanguage
    }
  } catch {
    // localStorage puede estar bloqueado; se usa el idioma inicial.
  }

  return 'es'
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const text = useMemo(() => ({
    hero: { ...content.es.hero, ...(content[language]?.hero ?? {}) },
    about: { ...content.es.about, ...(content[language]?.about ?? {}) },
    nav: { ...content.es.nav, ...(content[language]?.nav ?? {}) },
    projects: { ...content.es.projects, ...(content[language]?.projects ?? {}) },
    skills: { ...content.es.skills, ...(content[language]?.skills ?? {}) },
    contact: { ...content.es.contact, ...(content[language]?.contact ?? {}) },
  }), [language])

  const toggleLanguage = useCallback(() => {
    const nextLanguage = language === 'en' ? 'es' : 'en'
    setLanguage(nextLanguage)

    try {
      localStorage.setItem(STORAGE_KEY, nextLanguage)
    } catch {
      // Sin persistencia, el idioma sigue funcionando durante la sesión.
    }
  }, [language])

  const value = useMemo(
    () => ({ language, toggleLanguage, text }),
    [language, toggleLanguage, text],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage no puede ser usado fuera de un LanguageProvider')
  }

  return context
}
