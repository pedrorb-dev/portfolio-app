import "./styles/About.css"
import MyImg from "../assets/me2.jpeg"
import { motion } from "framer-motion"
import { useLanguage } from '../context/LanguageContext'
import useScrollDownAnimation from '../hooks/useScrollDownAnimation'

const About = () => {
    const { text } = useLanguage()
    const { ref, initial, animate } = useScrollDownAnimation({ amount: 0.25, y: 50 })

    return (
        <motion.section ref={ref} initial={initial} animate={animate} id='About'>
            <div className="info-data">
                <h1>{text.about.title}</h1>
                <div className='text'>
                    {text.about.paragraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
            <img className='img-about' src={MyImg} alt="Pedro Ramírez" />
        </motion.section>
    )
}

export default About