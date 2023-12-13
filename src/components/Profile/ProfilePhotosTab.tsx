import { FunctionComponent } from 'react'

import { IUserDoc } from '../../contexts/User'

interface IProfilePhotosTabProps {
  profileUserDoc: IUserDoc
}

const ProfilePhotosTab: FunctionComponent<IProfilePhotosTabProps> = ({ profileUserDoc }) => {
  return (
    <div className='grid grid-cols-3 auto-rows-fr gap-2 '>
      {profileUserDoc.photos &&
        profileUserDoc.photos.map((photo, index) => {
          return (
            <>
              <div className='hover:scale-[101%] hover:cursor-pointer' key={index}>
                <img src={photo} className='h-full w-full object-cover' />
              </div>
            </>
          )
        })}
    </div>
  )
}

export default ProfilePhotosTab
