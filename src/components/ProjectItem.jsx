import "./styles/ProjectItem.css"
import { motion } from "framer-motion"
import { useLanguage } from '../context/LanguageContext'
import useScrollDownAnimation from '../hooks/useScrollDownAnimation'

const ProjectItem = ({ project }) => {
    const { language } = useLanguage()
    const { name, img, description, tecnologies, test } = project
    const descriptionText = description?.[language] ?? description?.es ?? description

    const { ref, initial, animate } = useScrollDownAnimation({ amount: 0.25, y: 50 })

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={animate}
            className='items-projects'
        >
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
                    <p>{descriptionText}</p>
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
