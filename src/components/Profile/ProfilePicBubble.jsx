import React from 'react'

function ProfilePicBubble({ addedClasses }) {
  return (
    <img
      src='https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'
      alt='pfp'
      className={`rounded-full w-10 mt-5 h-10 ${addedClasses}`}
    />
  )
}

export default ProfilePicBubble
