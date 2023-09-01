import React, { useContext } from 'react'

import { Link } from 'react-router-dom'

function MenuItem({ linkPath, title }) {
  return (
    <div className='w-5/6 ml-5 px-0 my-3 py-3 border-b border-gray-800'>
      <Link to={linkPath}>
        <span className='py-1 text-lg hover:text-gray-500'>{title}</span>
      </Link>
    </div>
  )
}

export default MenuItem
