import { useLanguage } from '../context/LanguageContext'

const LanguageSwitch = () => {
  const { language, toggleLanguage } = useLanguage()
  const isSpanish = language === 'es'

  return (
    <button
      type="button"
      className="language-switch"
      aria-label={isSpanish ? 'Cambiar idioma a inglés' : 'Cambiar idioma a español'}
      onClick={toggleLanguage}
    >
      {isSpanish ? 'EN' : 'ES'}
    </button>
  )
}

export default LanguageSwitch
