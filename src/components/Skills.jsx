import React from 'react'
import data from '../utils/skills.json'
import SkillItem from './SkillItem'
import "./styles/Skills.css"
import { motion } from "framer-motion"

const Skills = () => {
    const skills = Object.values(data.skills)

    return (
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ amount: 0.25 }} className='Skills' id='Skills'>
            <h1>Habilidades</h1>
            <div className='skills-items'>
                {skills.map((skill) => (
                    <SkillItem key={skill.name} img={skill.img} skill={skill.name} />
                ))}
            </div>
        </motion.div>
    )
}

export default Skills