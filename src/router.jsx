import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Home from '../pages/Home.jsx'
import Seasons from '../pages/Seasons.jsx'
import SeasonRaces from '../pages/SeasonRaces.jsx'
import Race from '../pages/Race.jsx'
import Drivers from '../pages/Drivers.jsx'
import Constructors from '../pages/Constructors.jsx'

const RootLayout = () => (
  <div>
    <Navbar />
    <div className="mt-12">
      <App />
    </div>
    <Footer />
  </div>
)

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'seasons', element: <Seasons /> },
      { path: 'seasons/:year', element: <SeasonRaces /> },
      { path: 'seasons/:year/races/:round', element: <Race /> },
      { path: 'drivers', element: <Drivers /> },
      { path: 'constructors', element: <Constructors /> },
    ],
  },
])

export default router


