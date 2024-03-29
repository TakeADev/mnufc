import { useContext } from 'react'

import { Link } from 'react-router-dom'

import { MdLocationOn } from 'react-icons/md'
import { MdArrowBack } from 'react-icons/md'

import { ModalContext } from '../../contexts/ModalContext'

import Button from '../Button'
import ProfilePicBubble from './ProfilePicBubble'
import ProfileBannerImage from './ProfileBannerImage'

import { MODAL_TYPES } from '../../contexts/ModalContext'
const { editProfile } = MODAL_TYPES

function ProfileBanner({ currentAuthUser, profileUserDoc }) {
  const { setModalIsOpen, setModalType } = useContext(ModalContext)

  return (
    <>
      <Link to='/'>
        <div className='absolute bg-gray-900 rounded-full opacity-50'></div>
        <MdArrowBack className='absolute text-4xl bg-gray-900 rounded-full mt-3 ml-3 ' />
      </Link>
      <ProfileBannerImage user={profileUserDoc} />
      <div className='w-full flex-col -mt-20 border-l border-r border-slate-700'>
        <div className='flex'>
          <div className='w-3/4'>
            <ProfilePicBubble
              addedClasses='w-32 h-32 ml-5'
              profilePic={profileUserDoc.profilePic}
            />
          </div>
          {currentAuthUser && currentAuthUser.uid === profileUserDoc.uid && (
            <div className='w-2-5'>
              <Button
                addedClasses='right-0 bg-slate-950 text-mn-blue border border-mn-blue px-5 h-10 mt-24 text-sm hover:bg-gray-900'
                onClick={() => {
                  setModalIsOpen(true), setModalType(editProfile)
                }}
                type='button'
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
            <span className='text-md text-gray-500'>@{profileUserDoc.username}</span>
          </div>
          {profileUserDoc.bio && (
            <div className='mt-5'>
              <span className='text-lg'>{profileUserDoc.bio}</span>
            </div>
          )}
          {profileUserDoc.location && (
            <div className='mt-5 flex-row'>
              <span className='text-lg'>
                <MdLocationOn className='inline mr-2 -mt-1' />
                {profileUserDoc.location}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProfileBanner
