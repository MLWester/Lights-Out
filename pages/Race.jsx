import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageBackground from '../components/PageBackground.jsx'
import grid from '../src/assets/f1-lineup.png'
import Loading from '../components/Loading.jsx'
import ErrorState from '../components/ErrorState.jsx'
import Table from '../components/Table.jsx'
import { getRaceResults } from '../lib/api/jolpica.js'

const Race = () => {
  const { year, round } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setError(null)
      setLoading(true)
      const json = await getRaceResults(year, round)
      setData(json)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [year, round])

  const results = data?.MRData?.RaceTable?.Races?.[0]?.Results || []
  const columns = useMemo(() => [
    { header: 'Pos', accessor: 'position' },
    { header: 'Driver', key: 'driver', render: (r) => `${r.Driver?.givenName} ${r.Driver?.familyName}` },
    { header: 'Constructor', key: 'constructor', render: (r) => r.Constructor?.name },
    { header: 'Time / Status', key: 'time', render: (r) => r.Time?.time || r.status },
    { header: 'Pts', accessor: 'points' },
  ], [])

  // Simple podium highlight
  const podium = results.slice(0, 3)

  return (
    <PageBackground image={grid} overlay="rgba(0,0,0,0.35)">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-2xl font-semibold mb-4">{year} • Round {round}</h2>
      {loading && <Loading rows={10} />}
      {error && <ErrorState onRetry={load} message="Failed to load results." />}
      {!loading && !error && (
        <div className="space-y-6">
          {podium.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {podium.map((r, i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                  <div className="text-xs text-gray-500">P{i+1}</div>
                  <div className="font-semibold">{r.Driver?.familyName}</div>
                  <div className="text-sm text-gray-600">{r.Constructor?.name}</div>
                </div>
              ))}
            </div>
          )}
          <Table columns={columns} data={results} keyField="position" />
        </div>
      )}
      </motion.div>
    </PageBackground>
  )
}

export default Race
