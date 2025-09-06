import React from 'react'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <Outlet />
    </main>
  )
}

export default App
