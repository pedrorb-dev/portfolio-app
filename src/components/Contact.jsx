import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './styles/Contact.css'

const Contact = () => {
    const { text } = useLanguage()
    const [status, setStatus] = useState('idle')

    const handleChange = (event) => {
        event.currentTarget.setCustomValidity('')
    }

    const handleInvalid = (event, invalidMessage) => {
        const field = event.currentTarget
        field.setCustomValidity(
            field.validity.valueMissing ? text.contact.required : invalidMessage,
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const form = event.currentTarget
        const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT

        if (!endpoint) {
            setStatus('error')
            return
        }

        setStatus('sending')

        const formData = new FormData(form)
        formData.set('_replyto', formData.get('email'))
        formData.set('_gotcha', '')

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' },
            })

            if (!response.ok) {
                throw new Error('Formspree request failed')
            }

            form.querySelectorAll('input, textarea').forEach((field) => field.setCustomValidity(''))
            form.reset()
            setStatus('success')
        } catch {
            setStatus('error')
        }
    }

    return (
        <section id='Contact' className='Contact'>
            <div className='info-data'>
                <h1>{text.contact.title}</h1>
                <p className='contact-description'>{text.contact.description}</p>
            </div>

            <form className='contact-form' onSubmit={handleSubmit}>
                <div className='form-field'>
                    <label htmlFor='contact-name'>{text.contact.name}</label>
                    <input
                        id='contact-name'
                        name='name'
                        type='text'
                        placeholder={text.contact.namePlaceholder}
                        required
                        onChange={handleChange}
                        onInvalid={(event) => handleInvalid(event, text.contact.required)}
                    />
                </div>

                <div className='form-field'>
                    <label htmlFor='contact-email'>{text.contact.email}</label>
                    <input
                        id='contact-email'
                        name='email'
                        type='email'
                        placeholder={text.contact.emailPlaceholder}
                        required
                        onChange={handleChange}
                        onInvalid={(event) => handleInvalid(event, text.contact.invalidEmail)}
                    />
                </div>

                <div className='form-field'>
                    <label htmlFor='contact-message'>{text.contact.message}</label>
                    <textarea
                        id='contact-message'
                        name='message'
                        placeholder={text.contact.messagePlaceholder}
                        required
                        onChange={handleChange}
                        onInvalid={(event) => handleInvalid(event, text.contact.required)}
                    />
                </div>

                <div className='honeypot'>
                    <input
                        aria-hidden='true'
                        autoComplete='off'
                        name='_gotcha'
                        readOnly
                        tabIndex={-1}
                        type='text'
                        value=''
                    />
                </div>

                <button
                    className='btn btn-outline contact-submit'
                    disabled={status === 'sending'}
                    type='submit'
                >
                    {status === 'sending' ? text.contact.sending : text.contact.submit}
                </button>

                <p className='contact-feedback' aria-live='polite'>
                    {status === 'sending' && text.contact.sending}
                    {status === 'success' && text.contact.success}
                    {status === 'error' && text.contact.error}
                </p>
            </form>
        </section>
    )
}

export default Contact
