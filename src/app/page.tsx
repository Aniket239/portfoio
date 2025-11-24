"use client"
import Particles from '@/components/Particles'
import { useTheme } from '@/hooks/ThemeContext';
import React from 'react'

const page = () => {
    const { theme } = useTheme();
  return (
    <div>
      <div style={{ width: '100%', height: '100vh', position: 'relative', background: undefined }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          theme={theme}
        />
      </div>
    </div>
  )
}

export default page
