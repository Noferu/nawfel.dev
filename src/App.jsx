import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Header    from './components/Header'
import Background from './components/Background'
import CommandK  from './components/CommandK'

import Home    from './pages/Home'
import CV      from './pages/CV'
import Project from './pages/Project'

function App() {
  const [cmdOpen, setCmdOpen] = useState(false)

  // Ctrl+K / Cmd+K
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
      <Header onOpenCmd={() => setCmdOpen(true)} />
      <CommandK open={cmdOpen} onClose={() => setCmdOpen(false)} />

      <Routes>
        <Route path="/"              element={<Home />}    />
        <Route path="/cv"            element={<CV />}      />
        <Route path="/project/:slug" element={<Project />} />
      </Routes>
    </>
  )
}

export default App