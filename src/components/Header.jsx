import React, { useState } from 'react'
// @ts-ignore
import "./styles/Header.css"
import ThemeSwitch from './ThemeSwitch'
import LanguageSwitch from './LanguageSwitch'
import { useLanguage } from '../context/LanguageContext'

const Header = () => {
    const { text } = useLanguage()
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <header className='Header'>
            <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                <a href="#Hero" onClick={handleLinkClick}>{text.nav.inicio}</a>
                <a href="#Projects" onClick={handleLinkClick}>{text.nav.proyectos}</a>
                <a href="#Skills" onClick={handleLinkClick}>{text.nav.habilidades}</a>
                <a href="#About" onClick={handleLinkClick}>{text.nav.sobreMi}</a>
                <a href="mailto:pedrulex.ramirez@gmail.com" onClick={handleLinkClick}>{text.nav.contacto}</a>
            </nav>

            <ThemeSwitch />

            <LanguageSwitch />

            <button
                className={`hamburger-btn ${menuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Menú de navegación"
            >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
        </header>
    )
}

export default Header