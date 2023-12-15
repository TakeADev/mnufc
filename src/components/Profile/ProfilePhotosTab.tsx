import { FunctionComponent } from 'react'

import { IUserDoc } from '../../contexts/User'

interface IProfilePhotosTabProps {
  profileUserDoc: IUserDoc
}

const ProfilePhotosTab: FunctionComponent<IProfilePhotosTabProps> = ({ profileUserDoc }) => {
  const photosReversed = [...profileUserDoc.photos].reverse()

  if (photosReversed && photosReversed.length > 0) {
    return (
      <div className='grid grid-cols-3 auto-rows-fr gap-2 max-h-[500px]'>
        {photosReversed.map((photo, index) => (
          <div className='hover:scale-[101%] hover:cursor-pointer' key={index}>
            <img src={photo} className='h-full w-full object-cover' />
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className='text-center text-3xl mt-10 text-gray-400'>
      <span>This user has not uploaded any photos yet.</span>
    </div>
  )
}

export default ProfilePhotosTab
