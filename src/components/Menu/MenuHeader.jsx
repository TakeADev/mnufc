import React, { useContext } from 'react'

import { UserContext } from '../../contexts/User'

import ProfilePicBubble from '../Profile/ProfilePicBubble'
import { Link } from 'react-router-dom'

function MenuHeader() {
  const { currentUserDoc } = useContext(UserContext)
  return (
    <Link to={`/${currentUserDoc.username}`}>
      <div className='flex ml-5 pl-0'>
        <ProfilePicBubble addedClasses='w-10 h-10' />
        <span className='w-3/4 mt-7 ml-3'>
          <b>{currentUserDoc.displayName}</b>
        </span>
      </div>
    </Link>
  )
}

export default MenuHeader
