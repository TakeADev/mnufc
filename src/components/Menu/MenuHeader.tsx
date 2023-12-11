import { useContext } from 'react'

import { Link } from 'react-router-dom'

import { UserContext } from '../../contexts/User'

import ProfilePicBubble from '../Profile/ProfilePicBubble'

function MenuHeader({ onClick }) {
  const { currentUserDoc } = useContext(UserContext)
  return (
    <Link onClick={onClick} to={`/${currentUserDoc.username}`}>
      <div className='flex ml-5 pl-0 mt-4'>
        <ProfilePicBubble
          addedClasses='w-10 h-10'
          profilePic={currentUserDoc.profilePic.toString()}
        />
        <span className='w-3/4 ml-3 text-xl'>
          <b>{currentUserDoc.displayName}</b>
        </span>
      </div>
    </Link>
  )
}

export default MenuHeader
