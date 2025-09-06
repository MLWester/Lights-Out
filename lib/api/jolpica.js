// Lightweight Ergast-compatible client with 24h sessionStorage caching

const PRIMARY_BASE = import.meta?.env?.VITE_JOLPICA_BASE || 'https://api.jolpi.ca/ergast/f1';
const FALLBACK_BASE = 'https://ergast.com/api/f1';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function getCacheKey(url) {
  return `jolpica:${url}`;
}

function readCache(url) {
  try {
    const raw = sessionStorage.getItem(getCacheKey(url));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.timestamp || !parsed.data) return null;
    if (Date.now() - parsed.timestamp > ONE_DAY_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(url, data) {
  try {
    sessionStorage.setItem(
      getCacheKey(url),
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch {
    // best-effort cache
  }
}

async function fetchFrom(baseUrl, path) {
  const url = `${baseUrl}${path}`;
  const cached = readCache(url);
  if (cached) return { data: cached, url };
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Request failed ${res.status}`);
  const json = await res.json();
  writeCache(url, json);
  return { data: json, url };
}

async function fetchJson(path) {
  try {
    const { data } = await fetchFrom(PRIMARY_BASE, path);
    return data;
  } catch (e) {
    // Fallback to Ergast if Jolpica mirror is unavailable
    const { data } = await fetchFrom(FALLBACK_BASE, path);
    return data;
  }
}

export async function getSeasons() {
  return fetchJson('/seasons.json?limit=100');
}

export async function getSeasonRaces(year) {
  return fetchJson(`/${year}.json?limit=100`);
}

export async function getRaceResults(year, round) {
  return fetchJson(`/${year}/${round}/results.json`);
}

export async function getDriverStandings(year = 'current') {
  return fetchJson(`/${year}/driverStandings.json`);
}

export async function getConstructorStandings(year = 'current') {
  return fetchJson(`/${year}/constructorStandings.json`);
}

export const jolpica = {
  getSeasons,
  getSeasonRaces,
  getRaceResults,
  getDriverStandings,
  getConstructorStandings,
};


