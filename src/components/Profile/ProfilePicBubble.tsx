import { FunctionComponent, ReactEventHandler } from 'react'

interface IProfilePicBubbleProps {
  addedClasses?: String
  onClick?: (e?: ReactEventHandler) => void
  profilePic: String
}

const ProfilePicBubble: FunctionComponent<IProfilePicBubbleProps> = ({ addedClasses, onClick }) => {
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
