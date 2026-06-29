import React from 'react'
import "./styles/About.css"
import MyImg from "../assets/me.jpg"


const About = () => {
    return (
        <section>
            <div className="info-data">
                <h1>Sobre mí</h1>
                <div className='text'>
                    <p>Me llamo Pedro Ramírez, pero mis amigos me dicen piter. Empecé en la
                        programación cuando tenía 15 años. Actualmente curso la carrera de Ingeniería
                        en Sistemas Computacionales en 7mo semestre
                    </p>
                    <p>
                        Actualmente aprendo diversas tecnologías y mejoro mi critero con problemas lógicos,
                        de esta manera ayudar a resolver mediante software algunos dificultades que presenten
                        las empresas
                    </p>
                    <p>Mi objetivo es resolver los problemas del día a día y brindar un mayor
                        acceso a la tecnología aprendiendo constantemente
                    </p>
                </div>
            </div>
            <img className='img-about' src={MyImg} alt="Pedro Ramírez" />
        </section>
    )
}

export default About