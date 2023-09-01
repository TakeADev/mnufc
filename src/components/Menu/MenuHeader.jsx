import React, { useContext } from 'react'

import ProfilePicBubble from '../Profile/ProfilePicBubble'

function MenuHeader() {
  return (
    <div className='flex ml-5 pl-0'>
      <ProfilePicBubble addedClasses='w-10 h-10' />
      <span className='w-3/4 mt-7 ml-3'>User</span>
    </div>
  )
}

export default MenuHeader
