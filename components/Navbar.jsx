import React from 'react'
import { NavLink } from 'react-router-dom'
import LOLogoSmall from '../src/assets/LO-logo-small.png'

const linkStyle = ({ isActive }) => ({
  color: '#fff',
  textDecoration: 'none',
  borderBottom: isActive ? '2px solid #E11D2E' : '2px solid transparent',
  display: 'inline-flex',
  alignItems: 'center',
  height: '48px',
  paddingInline: '6px',
})

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full shadow-sm" 
    style={{ backgroundColor: '#0F172A', color: '#fff', zIndex: 9999, position: 'fixed', width: '100vw' }}>
      <div className="w-full overflow-hidden" 
      style={{ height: '48px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', paddingInline: '16px' }}>
        {/* Logo left */}
        <NavLink to="/" aria-label="Lights Out Home" className="shrink-0" style={{ justifySelf: 'start' }}>
          <img src={LOLogoSmall} alt="Lights Out" className="block object-contain" 
          style={{ height: '70px', width: 'auto', maxHeight: '70px' }} />
        </NavLink>

        {/* Centered links */}
        <ul className="list-none" style={{ display: 'flex', gap: '28px', 
          alignItems: 'center', whiteSpace: 'nowrap', height: '100%', margin: 0, padding: 0, justifySelf: 'center', justifyContent: 'center' }}>
          <NavLink to="/" style={linkStyle}>Home</NavLink>
          <NavLink to="/drivers" style={linkStyle}>Drivers</NavLink>
          <NavLink to="/constructors" style={linkStyle}>Constructors</NavLink>
          <NavLink to="/seasons" style={linkStyle}>Seasons</NavLink>
        </ul>

        {/* Right spacer to keep links centered */}
        <div aria-hidden style={{ justifySelf: 'end' }} />
      </div>
    </nav>
  )
}

export default Navbar
