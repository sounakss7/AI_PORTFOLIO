import React from 'react'
import CustomCursor from './components/CustomCursor'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Certifications from './components/Certifications'
import Education from './components/Education'
import Contact from './components/Contact'

function App() {
  return (
    <div className="bg-obsidian min-h-screen text-text-primary selection:bg-accent-cyan/30 selection:text-white">
      <CustomCursor />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Certifications />
        <Education />
        <Contact />
      </main>

      <footer className="border-t border-border-subtle py-8 text-center text-sm font-code text-text-muted mt-20">
        <p>© {new Date().getFullYear()} Sounak Sarkar. Neural Cartographer.</p>
        <p className="mt-2 text-xs opacity-50">Built with React, Framer Motion, and Tailwind CSS.</p>
      </footer>
    </div>
  )
}

export default App
