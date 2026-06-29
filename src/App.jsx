import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import "./App.css"
import Skills from './components/Skills'

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Projects />
      <Skills />
      <About />
    </>
  )
}

export default App