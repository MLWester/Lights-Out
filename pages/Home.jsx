import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageBackground from '../components/PageBackground.jsx'
import hero from '../src/assets/hero-car.png'
import LOLogoSmall from '../src/assets/LO-logo-small.png'

const Home = () => {
  const navigate = useNavigate()
  return (
    <PageBackground image={hero} overlay="rgba(0,0,0,0.45)">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .3 }}
        className="text-white"
        style={{ marginTop: '-28vh' }}
      >
        <img src={LOLogoSmall} alt="Lights Out" className="block mx-auto"
          style={{ height: '420px', width: 'auto', maxHeight: '420px', marginBottom: '0px' }} />
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mt-1">Lights Out – F1 Explorer</h1>
        <p className="mt-3 text-white/90 text-lg">Browse seasons, races, results, drivers and constructors.</p>
        <div className="mt-8" style={{ display: 'inline-flex', gap: '16px' }}>
          <button
            type="button"
            onClick={() => navigate('/seasons')}
            className="glass-btn"
            style={{ background: 'rgba(225, 29, 46, 0.25)', color: '#ffffff', borderRadius: '9999px', border: '1px solid rgba(225, 29, 46, 0.8)', cursor: 'pointer', backdropFilter: 'blur(2px)', padding: '12px 24px' }}
          >
            Start Exploring
          </button>
          <button
            type="button"
            onClick={() => navigate('/drivers')}
            className="glass-btn glass-btn--light"
            style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', borderRadius: '9999px', border: '1px solid rgba(255, 255, 255, 0.7)', cursor: 'pointer', backdropFilter: 'blur(2px)', padding: '12px 24px' }}
          >
            Drivers
          </button>
        </div>
      </motion.div>
    </PageBackground>
  )
}

export default Home
