import { FunctionComponent } from 'react'

import { IUserDoc } from '../../contexts/User'

interface IProfilePhotosTabProps {
  profileUserDoc: IUserDoc
}

const ProfilePhotosTab: FunctionComponent<IProfilePhotosTabProps> = ({ profileUserDoc }) => {
  return (
    <div className='flex'>
      {profileUserDoc.photos &&
        profileUserDoc.photos.map((photo, index) => {
          return (
            <div className='w-1/3' key={index}>
              <img src={photo} className='h-full object-cover' />
            </div>
          )
        })}
    </div>
  )
}

export default ProfilePhotosTab
