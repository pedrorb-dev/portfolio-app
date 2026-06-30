// @ts-ignore
import "./styles/Hero.css"
// @ts-ignore
import MyImg from "../assets/me.jpg"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdOutlineMail } from 'react-icons/md';
import { motion } from "framer-motion"

const Hero = () => {
    return (
        <motion.div className="Hero" id="Hero" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>

            <section>
                <div className='info-data'>
                    <span className="subtitle">Disponible para proyectos</span>
                    <h1>Hey, soy pidev</h1>
                    <p>Ingeniero en Sistemas Computacionales.
                        Especializado en el desarrollo de aplicaciones web únicas.
                    </p>
                </div>
                <img className="img-hero" src={MyImg} alt="Pedro Ramírez" />
            </section>
            <div className='social'>
                <a href="mailto:tu-correo@gmail.com" whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }} className="btn btn-outline">
                    <MdOutlineMail className="btn-icon" />
                    <span>Contáctame</span>
                </a>
                <a
                    href="https://linkedin.com/in/tu-perfil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaLinkedin className="btn-icon" />
                    <span>LinkedIn</span>
                </a>
                <a
                    href="https://github.com/pedrorb-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaGithub className="btn-icon" />
                    <span>GitHub</span>
                </a>
            </div>
        </motion.div>
    )
}

export default Hero