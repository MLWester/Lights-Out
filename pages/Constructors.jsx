import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageBackground from '../components/PageBackground.jsx'
import grid from '../src/assets/f1-lineup.png'
import Loading from '../components/Loading.jsx'
import ErrorState from '../components/ErrorState.jsx'
import Table from '../components/Table.jsx'
import { getConstructorStandings } from '../lib/api/jolpica.js'

const Constructors = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setError(null)
      setLoading(true)
      const json = await getConstructorStandings('current')
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

  const standings = data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings || []
  const columns = useMemo(() => [
    { header: 'Pos', accessor: 'position' },
    { header: 'Team', key: 'team', render: (r) => r.Constructor?.name },
    { header: 'Wins', accessor: 'wins' },
    { header: 'Points', accessor: 'points' },
  ], [])

  return (
    <PageBackground image={grid} overlay="rgba(0,0,0,0.35)">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-2xl font-semibold mb-4">Constructor Standings</h2>
      {loading && <Loading rows={10} />}
      {error && <ErrorState onRetry={load} message="Failed to load constructor standings." />}
      {!loading && !error && <Table columns={columns} data={standings} keyField="position" />}
      </motion.div>
    </PageBackground>
  )
}

export default Constructors
