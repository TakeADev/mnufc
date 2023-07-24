import React from 'react'
import { Link } from 'react-router-dom'

import Hero from '../../components/Hero'

function Home() {
  return (
    <>
      <Hero />
      <Link to='/feed'>Feed</Link>
    </>
  )
}

export default Home
