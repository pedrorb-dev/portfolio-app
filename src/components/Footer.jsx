import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './styles/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="Footer">
            <div className="footer-container">
                <div className="footer-left">
                    <span>© {currentYear} pidev. Casi todos los derechos reservados.</span>
                </div>

                <div className="footer-right">
                    <a href="https://github.com/pedrorb-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub />
                    </a>
                    <a href="https://linkedin.com/in/pedro-ramírez-b36241325" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;