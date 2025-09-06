// OpenF1 stub (gated by feature flag; not used yet)
const ENABLE_OPENF1 = (import.meta?.env?.VITE_ENABLE_OPENF1 || 'false') === 'true'
const BASE_URL = 'https://api.openf1.org'

async function fetchJson(path) {
  if (!ENABLE_OPENF1) return []
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) throw new Error(`OpenF1 failed ${res.status}`)
  return res.json()
}

export async function getRaceSessions(year) {
  if (!ENABLE_OPENF1) return []
  // Placeholder; real implementation later
  return fetchJson(`/sessions?year=${year}`)
}

export const openf1 = { getRaceSessions }



