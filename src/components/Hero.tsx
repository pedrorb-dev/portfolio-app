// @ts-ignore
import "./styles/Hero.css"
// @ts-ignore
import MyImg from "../assets/me.jpg"

const Hero = () => {
    return (
        <div className="Hero">

            <section>
                <div className='info-data'>
                    <span>Disponible para proyectos</span>
                    <h1>Hey, soy pedev</h1>
                    <p>Ingeniero en Sistemas Computacionales.
                        Especializado en el desarrollo de aplicaciones web únicas.
                    </p>
                </div>
                <img className="img-hero" src={MyImg} alt="Pedro Ramírez" />
            </section>
            <div className='social'>
                <a href="">LinkIn</a>
                <a href="">GitHub</a>
            </div>
        </div>
    )
}

export default Hero