'use client'

import React, { useMemo, useState } from 'react'
import Particles from '@/components/Particles'
import '../styles/Contact.css'

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const isDisabled = useMemo(() => {
    return (
      status === 'loading' ||
      !formState.name.trim() ||
      !formState.email.trim() ||
      !formState.subject.trim() ||
      !formState.message.trim()
    )
  }, [formState, status])

  return (
    <section className="contact section-particles" id="contact">
      <div className="section-particles__bg" aria-hidden="true">
        <Particles
          particleCount={200}
          particleSpread={10}
          speed={0.2}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="container section-particles__content">
        <header className="contact__header">
          <h2>Let&apos;s Build Something Together</h2>
          <p>Have a project in mind or just want to chat about React Native? Drop me a message below.</p>
        </header>

        <div className="contact__card">
          <div className="contact__glow contact__glow--one" />
          <div className="contact__glow contact__glow--two" />

          <form
            className="contact__form"
            onSubmit={async (event) => {
              event.preventDefault()
              if (isDisabled) {
                setStatus('error')
                setStatusMessage('Please fill in all fields before sending.')
                return
              }

              setStatus('loading')
              setStatusMessage('')

              try {
                const response = await fetch('/api/contact', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(formState)
                })

                const payload = await response.json()

                if (!response.ok) {
                  throw new Error(payload?.message || 'Unable to send your message right now.')
                }

                setStatus('success')
                setStatusMessage('Thanks! Your message has been sent.')
                setFormState({
                  name: '',
                  email: '',
                  subject: '',
                  message: ''
                })
              } catch (error) {
                const message =
                  error instanceof Error ? error.message : 'Something went wrong. Please try again later.'
                setStatus('error')
                setStatusMessage(message)
              }
            }}
          >
            <div className="contact__grid">
              <label className="contact__field">
                <span>Full Name</span>
                <input
                  className="contact__input"
                  type="text"
                  placeholder="John Doe"
                  value={formState.name}
                  onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                  required
                />
              </label>

              <label className="contact__field">
                <span>Email Address</span>
                <input
                  className="contact__input"
                  type="email"
                  placeholder="john@example.com"
                  value={formState.email}
                  onChange={(event) => setFormState({ ...formState, email: event.target.value })}
                  required
                />
              </label>
            </div>

            <label className="contact__field">
              <span>Subject</span>
              <input
                className="contact__input"
                type="text"
                placeholder="Project Inquiry"
                value={formState.subject}
                onChange={(event) => setFormState({ ...formState, subject: event.target.value })}
                required
              />
            </label>

            <label className="contact__field">
              <span>Message</span>
              <textarea
                className="contact__textarea"
                rows={5}
                placeholder="Tell me about your project..."
                value={formState.message}
                onChange={(event) => setFormState({ ...formState, message: event.target.value })}
                required
              />
            </label>

            <button className="contact__submit" type="submit" disabled={isDisabled}>
              <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
              <span className="contact__submit-icon" aria-hidden="true">
                &#8594;
              </span>
            </button>

            {statusMessage ? (
              <p className={`contact__status contact__status--${status}`} role="status">
                {statusMessage}
              </p>
            ) : null}
          </form>
        </div>

        <div className="contact__socials">
          <a className="contact__social" href="#" aria-label="Github">
            <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          <a
            className="contact__social"
            href="https://www.linkedin.com/in/aniket-kumar-biswas/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          <a className="contact__social" href="#" aria-label="X">
            <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
