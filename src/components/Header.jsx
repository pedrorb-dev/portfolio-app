import { useEffect, useState } from 'react'
// @ts-ignore
import "./styles/Header.css"
import ThemeSwitch from './ThemeSwitch'
import LanguageSwitch from './LanguageSwitch'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitch from './LanguageSwitch'
import { useLanguage } from '../context/LanguageContext'

const Header = () => {
    const { text } = useLanguage()
    const { text } = useLanguage()
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('Hero');

    useEffect(() => {
        const sectionIds = ['Hero', 'Projects', 'Skills', 'About'];
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        if (sections.length === 0) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visibleEntries.length > 0) {
                    setActiveSection(visibleEntries[0].target.id);
                }
            },
            {
                rootMargin: '-20% 0px -70% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLinkClick = (sectionId) => {
        if (sectionId) {
            setActiveSection(sectionId);
        }
        setMenuOpen(false);
    };

    return (
        <header className='Header'>
            <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                <a
                    href="#Hero"
                    className={`menu-item ${activeSection === 'Hero' ? 'active' : ''}`}
                    aria-current={activeSection === 'Hero' ? 'true' : undefined}
                    onClick={() => handleLinkClick('Hero')}
                >
                    {text.nav.inicio}
                </a>
                <a
                    href="#Projects"
                    className={`menu-item ${activeSection === 'Projects' ? 'active' : ''}`}
                    aria-current={activeSection === 'Projects' ? 'true' : undefined}
                    onClick={() => handleLinkClick('Projects')}
                >
                    {text.nav.proyectos}
                </a>
                <a
                    href="#Skills"
                    className={`menu-item ${activeSection === 'Skills' ? 'active' : ''}`}
                    aria-current={activeSection === 'Skills' ? 'true' : undefined}
                    onClick={() => handleLinkClick('Skills')}
                >
                    {text.nav.habilidades}
                </a>
                <a
                    href="#About"
                    className={`menu-item ${activeSection === 'About' ? 'active' : ''}`}
                    aria-current={activeSection === 'About' ? 'true' : undefined}
                    onClick={() => handleLinkClick('About')}
                >
                    {text.nav.sobreMi}
                </a>
            </nav>

            <ThemeSwitch />

            <LanguageSwitch />

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