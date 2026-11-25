import data from '../utils/skills.json'
import SkillItem from './SkillItem'
import "./styles/Skills.css"
import { motion } from "framer-motion"
import { useLanguage } from '../context/LanguageContext'
import useScrollDownAnimation from '../hooks/useScrollDownAnimation'

const Skills = () => {
    const { text } = useLanguage()
    const skills = Object.values(data.skills)
    const { ref, initial, animate } = useScrollDownAnimation({ amount: 0.25, y: 30 })

    return (
        <motion.div ref={ref} initial={initial} animate={animate} className='Skills' id='Skills'>
            <h1>{text.skills.title}</h1>
            <div className='skills-items'>
                {skills.map((skill) => (
                    <SkillItem key={skill.name} img={skill.img} skill={skill.name} />
                ))}
            </div>
        </motion.div>
    )
}

export default Skills