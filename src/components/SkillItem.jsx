import React from 'react'
import "./styles/SkillItem.css"

const SkillItem = ({ img, skill }) => {
    return (
        <article className='skill-item'>
            <div className="logo">
                <img src={img} alt={skill} />
            </div>
            <span>{skill}</span>
        </article>
    )
}

export default SkillItem