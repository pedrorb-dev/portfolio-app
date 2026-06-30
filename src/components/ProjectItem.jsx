import React from 'react'
import "./styles/ProjectItem.css"
import { motion } from "framer-motion"

const ProjectItem = ({ project }) => {
    const { name, img, description, tecnologies, test } = project
    return (
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ amount: 0.25 }} className='items-projects'>
            <div className='img-project'>
                <img src={img} alt={name} />
            </div>
            <div className='data-project'>
                <h2>{name}</h2>
                <div className='tecnologies-project'>
                    {
                        tecnologies.map((tec, index) => (
                            <span className='tecnology' key={index}>{tec}</span>
                        ))
                    }
                </div>
                <div className='text'>
                    <p>{description}</p>
                </div>
                <div className='test-project'>
                    {
                        Object.entries(test).map(([key, value], index) => (
                            <span className='test' key={index}>
                                <a href={value.url} target='_blank' rel='noopener noreferrer'>{key}</a>
                            </span>
                        ))
                    }
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectItem