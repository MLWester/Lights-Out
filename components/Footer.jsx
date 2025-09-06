import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-gray-200 py-6 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-white">
        <div>© {new Date().getFullYear()} Lights Out</div>
        
      </div>
    </footer>
  )
}

export default Footer
