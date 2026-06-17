import { useState, useEffect } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'

import Header     from './components/Header'
import MobileNav from './components/MobileNav'
import Background from './components/Background'
import CommandK   from './components/CommandK'

import Home    from './pages/Home'
import CV      from './pages/CV'
import Project from './pages/Project'

function ProjectWrapper() {
  const { slug } = useParams()
  return <Project key={slug} />
}

function App() {
  const [cmdOpen, setCmdOpen] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <Background />
      <MobileNav />
      <Header onOpenCmd={() => setCmdOpen(true)} />
      <CommandK open={cmdOpen} onClose={() => setCmdOpen(false)} />

      <Routes>
        <Route path="/"              element={<Home />}           />
        <Route path="/cv"            element={<CV />}             />
        <Route path="/project/:slug" element={<ProjectWrapper />} />
      </Routes>
    </>
  )
}

export default App