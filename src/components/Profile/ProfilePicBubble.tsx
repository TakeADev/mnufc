import { FunctionComponent, MouseEventHandler } from 'react'
import LoadingSpinner from '../LoadingSpinner'

interface IProfilePicBubbleProps {
  addedClasses?: string
  onClick?: MouseEventHandler<HTMLElement>
  profilePicUsername: string
}

const ProfilePicBubble: FunctionComponent<IProfilePicBubbleProps> = ({
  addedClasses,
  onClick,
  profilePicUsername,
}) => {
  return profilePicUsername ? (
    <img
      src={`https://firebasestorage.googleapis.com/v0/b/mnufc-6f9e3.appspot.com/o/testy%2FprofilePic?alt=media&token=c492649a-90df-4731-953b-3ea441bd2558`}
      alt='pfp'
      className={`rounded-full ${addedClasses}`}
      onClick={onClick}
    />
  ) : (
    <LoadingSpinner />
  )
}

export default ProfilePicBubble
