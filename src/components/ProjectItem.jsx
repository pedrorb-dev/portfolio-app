import React from 'react'
import "./styles/ProjectItem.css"

const ProjectItem = ({ project }) => {
    const { name, img, description, tecnologies, test } = project
    return (
        <div className='items-projects'>
            <div className='img-project'>
                <img src={img} alt={name} />
            </div>
            <div className='data-project'>
                <h2>{name}</h2>
                <div className='tecnologies-project'>
                    {
                        tecnologies.map((tec, index) => (
                            <span key={index}>{tec}</span>
                        ))
                    }
                </div>
                <div className='text'>
                    <p>{description}</p>
                </div>
                <div className='test-project'>
                    {
                        test.map((t, index) => (
                            <a href='#' key={index}>{t}</a>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProjectItem