"use client"
import Particles from '@/components/Particles'
import { useTheme } from '@/hooks/ThemeContext';
import React from 'react'
import '../styles/globals.css';
import Navbar from '@/components/Navbar';

const Page = () => {
  const { theme } = useTheme();

  return (
    <>
      {/* FULL WIDTH BACKGROUND */}
      <div style={{ width: '100%', height: '100vh', position: 'absolute', background: undefined }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.2}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          theme={theme}
        />
      </div>

      {/* 80% WIDTH CONTENT */}
      <div>
        <Navbar />
        <h1>Home</h1>
      </div>
    </>
  );
};

export default Page;
