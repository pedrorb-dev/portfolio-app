import React from 'react'
import "./styles/About.css"
import MyImg from "../assets/me2.jpeg"
import { motion } from "framer-motion"
import { useLanguage } from '../context/LanguageContext'

const About = () => {
    const { text } = useLanguage()

    return (
        <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ amount: 0.25 }} id='About'>
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