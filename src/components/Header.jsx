import React from 'react'
// @ts-ignore
import "./styles/Header.css"

const Header = () => {
    return (
        <header className='Header'>
            <a href="#Hero">Inicio</a>
            <a href="#Projects">Proyectos</a>
            <a href="#Skills">Habilidades</a>
            <a href="#About">Sobre mí</a>
            <a href="#">Contacto</a>
        </header>
    )
}

export default Header