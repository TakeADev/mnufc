import { useContext } from 'react'

import { ModalContext } from '../../contexts/ModalContext'

import ProfilePicBubble from './ProfilePicBubble'
import Button from '../Button'
import ProfileBannerImage from './ProfileBannerImage'

function ProfileBanner({ currentAuthUser, profileUserDoc }) {
  const { setModalIsOpen } = useContext(ModalContext)
  return (
    <>
      <ProfileBannerImage />
      <div className='w-full flex-col -mt-20'>
        <div className='flex'>
          <div className='w-3/4'>
            <ProfilePicBubble addedClasses='w-32 h-32 ml-5' />
          </div>
          {currentAuthUser.uid === profileUserDoc.uid && (
            <div className='w-2-5'>
              <Button
                addedClasses='right-0 bg-slate-950 text-white border border-white px-5 h-10 mt-24 text-sm hover:bg-gray-900'
                onClick={() => {
                  setModalIsOpen(true)
                }}
              >
                <b>Edit Profile</b>
              </Button>
            </div>
          )}
        </div>
        <div className='ml-5 mt-5 flex-col'>
          <div>
            <span className='text-xl'>
              <b>{profileUserDoc.displayName}</b>
            </span>
          </div>
          <div>
            <span className='text-md'>@{profileUserDoc.username}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileBanner
