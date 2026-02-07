import React from 'react'
import Particles from '@/components/Particles'
import '../styles/Projects.css'

type ProjectLink = {
  label: string
  href?: string
}

type Project = {
  category: string
  title: string
  description: string
  tags: string[]
  links: ProjectLink[]
  tone: string
}

const projects: Project[] = [
  {
    category: 'SaaS Platform',
    title: 'Agent CRM',
    description:
      'Multi-tenant CRM app with KYC capture, customer management, policy assignment, push reminders, and secure document uploads.',
    tags: ['React Native', 'TypeScript', 'Redux Toolkit', 'FCM', 'AWS S3'],
    links: [{ label: 'Private Build' }, { label: 'Request Demo', href: 'mailto:aniketkrbiswas239@gmail.com' }],
    tone: 'tone-saas',
  },
  {
    category: 'Operations',
    title: 'Zventory',
    description:
      'Inventory management suite with attendance tracking, geolocation, dashboards, and multi-theming for production and HR workflows.',
    tags: ['React Native', 'Redux Toolkit', 'Axios', 'REST APIs', 'Geolocation'],
    links: [
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.zventory' },
      { label: 'App Store', href: 'https://apps.apple.com/in/app/zventory/id6757734452' },
    ],
    tone: 'tone-ops',
  },
  {
    category: 'E-Commerce',
    title: 'Yumdut',
    description:
      'Multi-vendor marketplace featuring reels, live streaming via ZEGO, Razorpay checkout, and real-time notifications.',
    tags: ['React Native', 'Razorpay', 'Zego Cloud', 'Redux Toolkit', 'FCM'],
    links: [
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.yumdut' },
      { label: 'App Store', href: 'https://apps.apple.com/in/app/yumdut/id6753862501' },
    ],
    tone: 'tone-commerce',
  },
  {
    category: 'Services',
    title: 'Pink Paws',
    description:
      'Cross-platform app for pet services and products with maps-based booking, secure payments, and encrypted API flows.',
    tags: ['React Native', 'Razorpay', 'Google Maps', 'Apple Maps', 'AES Encryption'],
    links: [
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.mignonne.pinkpaws' },
      { label: 'App Store', href: 'https://apps.apple.com/in/app/mignonne-pink-paws/id6742444159' },
    ],
    tone: 'tone-services',
  },
]

const filters = ['All Projects', 'SaaS', 'Operations', 'E-Commerce', 'Services']

const Projects = () => {
  return (
    <section className="projects section-particles" id="projects">
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
        <header className="projects__hero">
          <h2>Projects Gallery</h2>
          <p>
            Explore a collection of high-performance React Native applications designed with a focus on seamless UX
            and production-grade scalability.
          </p>
        </header>

        <div className="projects__filters">
          {filters.map((filter) => (
            <button key={filter} className={filter === 'All Projects' ? 'is-active' : undefined} type="button">
              {filter}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-card__media">
                <div className={`project-card__device ${project.tone}`}>
                  <div className="project-card__notch"></div>
                  <div className="project-card__screen">
                    <p>{project.title}</p>
                    <span>{project.category}</span>
                  </div>
                </div>
              </div>

              <div className="project-card__content">
                <span className="project-card__tag">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="project-card__chips">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="project-card__links">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href ? '_blank' : undefined}
                      rel={link.href ? 'noreferrer' : undefined}
                      className={link.href ? undefined : 'is-disabled'}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <button className="project-card__cta" type="button">
                  View Case Study →
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="projects__cta">
          <h3>Have a project in mind?</h3>
          <p>I’m available for freelance React Native development and consulting engagements.</p>
          <div className="projects__cta-actions">
            <a href="mailto:aniketkrbiswas239@gmail.com">Start a Conversation</a>
            <a href="https://www.linkedin.com/in/aniket-kumar-biswas/" target="_blank" rel="noreferrer">
              View LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
