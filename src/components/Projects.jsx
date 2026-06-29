import React from 'react'
import data from "../utils/projects.json"
import ProjectItem from './ProjectItem'

const Projects = () => {
    const projects = data.projects
    return (
        <div>
            <h1>Proyectos</h1>
            <div className='projects'>
                {
                    projects.map((proy, index) => (
                        <ProjectItem key={index} project={proy} />
                    ))
                }
            </div>
        </div>
    )
}

export default Projects