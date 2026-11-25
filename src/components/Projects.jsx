import data from "../utils/projects.json"
import ProjectItem from './ProjectItem'
import "./styles/Projects.css"
import { useLanguage } from '../context/LanguageContext'

const Projects = () => {
    const { text } = useLanguage()
    const projects = data.projects
    return (
        <div id='Projects' className='Projects'>
            <h1>{text.projects.title}</h1>
            <div className='projects-items'>
                {
                    projects.map((proy) => (
                        <ProjectItem key={proy.name} project={proy} />
                    ))
                }
            </div>
        </div>
    )
}

export default Projects