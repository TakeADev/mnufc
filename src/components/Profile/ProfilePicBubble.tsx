import { FunctionComponent, MouseEventHandler } from 'react'
import LoadingSpinner from '../LoadingSpinner'

interface IProfilePicBubbleProps {
  addedClasses?: string
  onClick?: MouseEventHandler<HTMLElement>
  profilePic: string
}

const ProfilePicBubble: FunctionComponent<IProfilePicBubbleProps> = ({
  addedClasses,
  onClick,
  profilePic,
}) => {
  return profilePic ? (
    <img src={profilePic} alt='pfp' className={`rounded-full ${addedClasses}`} onClick={onClick} />
  ) : (
    <LoadingSpinner />
  )
}

export default ProfilePicBubble
