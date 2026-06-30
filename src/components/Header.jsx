import React, { useState } from 'react'
// @ts-ignore
import "./styles/Header.css"

const Header = () => {
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
                <a href="#Hero" onClick={handleLinkClick}>Inicio</a>
                <a href="#Projects" onClick={handleLinkClick}>Proyectos</a>
                <a href="#Skills" onClick={handleLinkClick}>Habilidades</a>
                <a href="#About" onClick={handleLinkClick}>Sobre mí</a>
                <a href="mailto:pedrulex.ramirez@gmail.com" onClick={handleLinkClick}>Contacto</a>
            </nav>

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