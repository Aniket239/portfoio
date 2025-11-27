import React from 'react'
import TextType from './TextType'
import Link from 'next/link'

const Home = () => {
  return (
    <div className='container !pt-[100px] flex justify-between'>
      <div>
        <p >Hello</p>
        <p>I am Aniket Biswas</p>
        <p>Software Developer</p>
        <div>
          <Link href={''}>Hire Me</Link>
          <button>Download Resume</button>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Home
