import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageBackground from '../components/PageBackground.jsx'
import podium from '../src/assets/f1_cely.png'
import Loading from '../components/Loading.jsx'
import ErrorState from '../components/ErrorState.jsx'
import Table from '../components/Table.jsx'
import { getDriverStandings } from '../lib/api/jolpica.js'

const Drivers = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setError(null)
      setLoading(true)
      const json = await getDriverStandings('current')
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

  const standings = data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || []
  const columns = useMemo(() => [
    { header: 'Pos', accessor: 'position' },
    { header: 'Driver', key: 'driver', render: (r) => `${r.Driver?.givenName} ${r.Driver?.familyName}` },
    { header: 'Code', key: 'code', render: (r) => r.Driver?.code || '-' },
    { header: 'Nationality', key: 'nat', render: (r) => r.Driver?.nationality },
    { header: 'Team', key: 'team', render: (r) => r.Constructors?.[0]?.name },
    { header: 'Points', accessor: 'points' },
  ], [])

  return (
    <PageBackground image={podium} overlay="rgba(0,0,0,0.35)">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-2xl font-semibold mb-4">Driver Standings</h2>
      {loading && <Loading rows={10} />}
      {error && <ErrorState onRetry={load} message="Failed to load driver standings." />}
      {!loading && !error && <Table columns={columns} data={standings} keyField="position" />}
      </motion.div>
    </PageBackground>
  )
}

export default Drivers
