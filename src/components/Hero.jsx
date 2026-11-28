// @ts-ignore
import "./styles/Hero.css"
// @ts-ignore
import MyImg from "../assets/me.jpg"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdOutlineMail } from 'react-icons/md';
import { motion } from "framer-motion"
import { useLanguage } from '../context/LanguageContext'
import useScrollDownAnimation from '../hooks/useScrollDownAnimation'

const Hero = () => {
    const { text } = useLanguage()
    const { ref, initial, animate } = useScrollDownAnimation({ y: 30 })

    return (
        <motion.div ref={ref} className="Hero" id="Hero" initial={initial} animate={animate}>

            <section>
                <div className='info-data'>
                    <span className="subtitle">{text.hero.subtitle}</span>
                    <h1>{text.hero.title}</h1>
                    <p>{text.hero.description}</p>
                </div>
                <img className="img-hero" src={MyImg} alt="Pedro Ramírez" />
            </section>
            <div className='social'>
                <a href="#Contact" whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }} className="btn btn-outline">
                    <MdOutlineMail className="btn-icon" />
                    <span>{text.hero.contact}</span>
                </a>
                <a
                    href="https://linkedin.com/in/pedro-ramírez-b36241325"
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