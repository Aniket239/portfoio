import React from 'react'
import '../styles/About.css'

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__header">
          <span className="about__kicker">01 / Profile</span>
          <h2>About Me</h2>
        </div>

        <div className="about__hero">
          <div className="about__copy">
            <h1>
              Crafting <span>Seamless</span> Mobile Experiences.
            </h1>
            <div className="about__body">
              <p>
                Hi, I&apos;m Aniket. I specialize in building high-performance, cross-platform mobile
                applications using React Native. My journey is fueled by a passion for clean code and
                fluid user interfaces, bridging the gap between design and functionality.
              </p>
              <p>
                With a deep understanding of the mobile ecosystem, I focus on creating apps that
                aren&apos;t just functional, but delightful to use. I thrive on solving complex
                architectural challenges while maintaining pixel-perfect UI precision.
              </p>
            </div>

            <div className="about__stats">
              <div className="about__stat">
                <p>Experience</p>
                <h3>2+ Years</h3>
                <span>Growth +100%</span>
              </div>
              <div className="about__stat">
                <p>Apps Shipped</p>
                <h3>3+</h3>
                <span>Play Store &amp; App Store</span>
              </div>
            </div>

            <div className="about__actions">
              <a className="about__btn about__btn--primary" href="/aniket_kumar_biswas_cv.pdf" download>
                Download CV
              </a>
              <a className="about__btn about__btn--ghost" href="#projects">
                View My Work
              </a>
            </div>

            <div className="about__meta">
              <span>Doltala, Madhyamgram, West Bengal, Kolkata – 700132</span>
              <span>+91 6290034904</span>
              <span>aniketkrbiswas239@gmail.com</span>
              <a href="https://www.linkedin.com/in/aniket-kumar-biswas/" target="_blank" rel="noreferrer">
                linkedin.com/in/aniket-kumar-biswas
              </a>
            </div>
          </div>

          <div className="about__stack">
            <div className="about__stack-grid">
              <div className="about__stack-card">
                <div className="about__stack-icon">RN</div>
                <h4>React Native</h4>
                <p>Core Framework</p>
              </div>
              <div className="about__stack-card is-offset">
                <div className="about__stack-icon">TS</div>
                <h4>TypeScript</h4>
                <p>Type Safety</p>
              </div>
              <div className="about__stack-card">
                <div className="about__stack-icon">FB</div>
                <h4>Firebase</h4>
                <p>Backend Logic</p>
              </div>
              <div className="about__stack-card is-lifted">
                <div className="about__stack-icon">RX</div>
                <h4>Redux</h4>
                <p>State Management</p>
              </div>
              <div className="about__stack-card is-shifted">
                <div className="about__stack-icon">ND</div>
                <h4>Node.js</h4>
                <p>Server Side</p>
              </div>
              <div className="about__stack-card is-floated">
                <div className="about__stack-icon">GT</div>
                <h4>Git</h4>
                <p>Version Control</p>
              </div>
            </div>
            <div className="about__accent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
