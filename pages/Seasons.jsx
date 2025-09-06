import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Loading from '../components/Loading.jsx'
import ErrorState from '../components/ErrorState.jsx'
import PageBackground from '../components/PageBackground.jsx'
import grid from '../src/assets/night-f1-2.png'
import { getSeasons } from '../lib/api/jolpica.js'

const Seasons = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setError(null)
      setLoading(true)
      const json = await getSeasons()
      setData(json)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const seasons = data?.MRData?.SeasonTable?.Seasons || []
  const filtered = seasons.filter((s) => Number(s.season) >= 2010).reverse()

  return (
    <PageBackground image={grid} overlay="rgba(0,0,0,0.35)">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-semibold mb-4">Seasons</h2>
        {loading && <Loading rows={10} />}
        {error && <ErrorState onRetry={load} message="Failed to load seasons." />}
        {!loading && !error && (
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
              {filtered.map((s) => (
                <Link
                  key={s.season}
                  to={`/seasons/${s.season}`}
                  style={{
                    display: 'block',
                    background: 'rgba(255,255,255,0.95)',
                    color: '#111827',
                    padding: '14px 16px',
                    borderRadius: '16px',
                    textDecoration: 'none',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                    transition: 'transform .15s ease, box-shadow .15s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)'; }}
                >
                  <div style={{ fontWeight: 600, fontSize: '18px' }}>{s.season}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Tap to view races</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </PageBackground>
  )
}

export default Seasons
