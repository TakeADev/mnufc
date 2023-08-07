import React from 'react'

function ProfilePicBubble({ profilePic }) {
  return (
    <img
      src={profilePic}
      alt='pfp'
      className='rounded-full w-10 mx-5 mt-5 h-10'
    />
  )
}

export default ProfilePicBubble
