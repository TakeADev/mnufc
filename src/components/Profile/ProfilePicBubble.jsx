import React from 'react'

function ProfilePicBubble({ addedClasses, onClick }) {
  return (
    <img
      src='https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'
      alt='pfp'
      className={`rounded-full ${addedClasses}`}
      onClick={onClick}
    />
  )
}

export default ProfilePicBubble
