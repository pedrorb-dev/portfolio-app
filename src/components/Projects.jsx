import React from 'react'
import data from "../utils/projects.json"
import ProjectItem from './ProjectItem'
import "./styles/Projects.css"

const Projects = () => {
    const projects = data.projects
    return (
        <div id='Projects' className='Projects'>
            <h1>Proyectos</h1>
            <div className='projects-items'>
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