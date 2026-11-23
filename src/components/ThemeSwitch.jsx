import { FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-switch"
      role="switch"
      aria-checked={isDark}
      aria-label="Tema obscuro"
      onClick={toggleTheme}
    >
      {isDark ? <FaMoon /> : <FaSun />}
    </button>
  )
}

export default ThemeSwitch
