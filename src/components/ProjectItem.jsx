import { useRef } from 'react'
import "./styles/ProjectItem.css"
import { motion, useInView } from "framer-motion"
import { useLanguage } from '../context/LanguageContext'

const ProjectItem = ({ project, isLast = false }) => {
    const { language } = useLanguage()
    const { name, img, description, tecnologies, test } = project
    const descriptionText = description?.[language] ?? description?.es ?? description

    const ref = useRef(null)
    const isInView = useInView(ref, { amount: 0.25 })
    const hasEntered = useInView(ref, { amount: 0.25, once: true })

    const motionProps = isLast
        ? {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: isInView ? 1 : 0, y: hasEntered ? 0 : 50 },
        }
        : {
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { amount: 0.25 },
        }

    return (
        <motion.div
            ref={ref}
            {...motionProps}
            transition={{ duration: 0.8, ease: "easeOut" }}
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