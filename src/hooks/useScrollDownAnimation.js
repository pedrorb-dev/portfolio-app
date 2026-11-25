import { useCallback, useLayoutEffect, useRef } from 'react'
import {
    useAnimationControls,
    useInView,
    useMotionValueEvent,
    useScroll,
} from 'framer-motion'

const transition = { duration: 0.8, ease: 'easeOut' }

/**
 * Animación de entrada que solo se reproduce una vez y únicamente al scrollear
 * hacia abajo. Después el elemento permanece estático: no se revierte al subir
 * ni vuelve a animarse en posteriores visitas.
 */
const useScrollDownAnimation = ({ amount = 'some', y = 50 } = {}) => {
    const ref = useRef(null)
    const controls = useAnimationControls()
    const isInView = useInView(ref, { amount })
    const { scrollY } = useScroll()
    const hasShownRef = useRef(false)
    const hasScrolledRef = useRef(false)
    const isScrollingDownRef = useRef(true)

    const show = useCallback((shouldAnimate = true) => {
        if (hasShownRef.current) return
        hasShownRef.current = true
        if (shouldAnimate) {
            controls.start({ opacity: 1, y: 0, transition })
        } else {
            controls.set({ opacity: 1, y: 0 })
        }
    }, [controls])

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const goingDown = latest > scrollY.getPrevious()
        isScrollingDownRef.current = goingDown
        hasScrolledRef.current = true

        if (isInView) show(goingDown)
    })

    // Cubre el elemento ya visible al cargar (Hero), el caso en el que el
    // observer responde después del último evento de scroll y el de entrar
    // desde arriba sin haber visto el elemento todavía.
    useLayoutEffect(() => {
        if (!isInView || hasShownRef.current) return
        show(!hasScrolledRef.current || isScrollingDownRef.current)
    }, [isInView, show])

    return {
        ref,
        initial: { opacity: 0, y },
        animate: controls,
    }
}

export default useScrollDownAnimation
