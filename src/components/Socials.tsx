import React from 'react'
import '../styles/Socials.css'
import linkedin from '../assets/images/linkedin.png'
import Image from 'next/image'

const Socials = () => {
    return (
        <div className="socials" aria-hidden="false">
            <div className="buttons">
                <a className="social-btn" href="https://www.linkedin.com/in/aniket-kumar-biswas" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                    <Image src={linkedin} alt="LinkedIn" width={24} height={24} />
                </a>

                <a
                    className="social-btn"
                    href="mailto:aniketkrbiswas239@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Aniket%2C%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20connect%20about%20opportunities.%0D%0A%0D%0AThanks%2C"
                    aria-label="Email"
                >
                    <span className="material-symbols-outlined">mail</span>
                </a>

                <a className="social-btn" href="tel:6290034904" aria-label="Call">
                    <span className="material-symbols-outlined">call</span>
                </a>
            </div>

            <div className="line" />
        </div>
    )
}

export default Socials
