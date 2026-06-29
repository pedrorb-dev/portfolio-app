import React from 'react'
import data from '../utils/skills.json'
import SkillItem from './SkillItem'
import "./styles/Skills.css"

const Skills = () => {
    const skills = Object.values(data.skills)

    return (
        <div>
            <h1>Habilidades/Tecnologías</h1>
            <div className='skills'>
                {skills.map((skill) => (
                    <SkillItem key={skill.name} img={skill.img} skill={skill.name} />
                ))}
            </div>
        </div>
    )
}

export default Skills