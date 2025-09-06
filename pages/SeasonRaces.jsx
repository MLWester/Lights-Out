import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Loading from '../components/Loading.jsx'
import ErrorState from '../components/ErrorState.jsx'
import PageBackground from '../components/PageBackground.jsx'
import grid from '../src/assets/f1-lineup.png'
import { getSeasonRaces } from '../lib/api/jolpica.js'

const SeasonRaces = () => {
  const { year } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setError(null)
      setLoading(true)
      const json = await getSeasonRaces(year)
      setData(json)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [year])

  const races = data?.MRData?.RaceTable?.Races || []

  return (
    <PageBackground image={grid} overlay="rgba(0,0,0,0.35)">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-semibold mb-4">Season {year}</h2>
        {loading && <Loading rows={10} />}
        {error && <ErrorState onRetry={load} message="Failed to load races." />}
        {!loading && !error && (
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '16px',
              padding: '16px',
              maxHeight: '70vh',
              overflowY: 'auto',
              backdropFilter: 'blur(2px)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {races.map((r) => {
                const date = r.date || ''
                const circuit = r.Circuit?.circuitName || ''
                return (
                  <Link
                    key={r.round}
                    to={`/seasons/${year}/races/${r.round}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr auto',
                      alignItems: 'center',
                      gap: '10px',
                      background: 'rgba(255,255,255,0.90)',
                      color: '#111827',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      border: '1px solid #e5e7eb',
                      transition: 'transform .15s ease, box-shadow .15s ease',
                      minHeight: '76px'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: '#0F172A',
                      color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700
                    }}>
                      {r.round}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{r.raceName}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{circuit} • {date}</div>
                    </div>
                    <div>
                      <span style={{
                        background: 'rgba(225, 29, 46, 0.20)',
                        color: '#111827',
                        borderRadius: '9999px',
                        border: '1px solid rgba(225, 29, 46, 0.6)',
                        padding: '6px 12px'
                      }}>View results</span>
                    </div>
                  </Link>
                )
              })}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </PageBackground>
  )
}

export default SeasonRaces
