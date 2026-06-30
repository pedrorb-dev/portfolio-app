import React from 'react'
import "./styles/About.css"
import MyImg from "../assets/me2.jpeg"
import { motion } from "framer-motion"

const About = () => {
    return (
        <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ amount: 0.25 }} id='About'>
            <div className="info-data">
                <h1>Sobre mí</h1>
                <div className='text'>
                    <p>Soy Pedro Ramírez, estudiante del 7mo semestre de Ingeniería
                        en Sistemas Computacionales. Con una sólida formación en
                        lógica de programación y un enfoque autodidacta para adoptar
                        nuevas tecnologías, busco mi primera experiencia profesional.
                    </p>
                    <p>
                        Mi pasión es diseñar y desarrollar soluciones de software
                        eficientes que impacten directamente en la optimización de
                        procesos empresariales y resuelvan problemas complejos.
                    </p>
                    <p>
                        Me motiva el aprendizaje continuo y el reto de transformar
                        necesidades de negocio en código funcional y escalable.
                        Mi objetivo es crecer profesionalmente mientras aporto valor
                        real a través de la tecnología.
                    </p>
                </div>
            </div>
            <img className='img-about' src={MyImg} alt="Pedro Ramírez" />
        </motion.section>
    )
}

export default About