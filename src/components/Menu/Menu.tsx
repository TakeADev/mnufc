import { useContext } from 'react'

import { signOutUser } from '../../utils/firebase/firebase-config'

import { MenuContext } from '../../contexts/MenuContext'
import { UserContext } from '../../contexts/User'

import Button from '../Button'
import MenuItem from './MenuItem'
import MenuHeader from './MenuHeader'
import ProfilePicBubble from '../Profile/ProfilePicBubble'
import LoadingSpinner from '../LoadingSpinner'

import '../../styles/animations.scss'

function Menu() {
  const { isOpen, setIsOpen } = useContext(MenuContext)
  const { currentUserDoc, setCurrentUserDoc } = useContext(UserContext)

  const menuClickHandler = () => {
    setIsOpen(!isOpen)
  }

  const logOutHandler = () => {
    setCurrentUserDoc(null)
    signOutUser()
  }

  if (currentUserDoc) {
    if (isOpen) {
      return (
        <>
          <div
            className='bg-gray-800 h-screen absolute w-full opacity-50'
            onClick={menuClickHandler}
          ></div>
          <div className='absolute right-0 flex-col bg-slate-950 rounded-xl w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4 h-screen slide-from-right'>
            <MenuHeader onClick={menuClickHandler} />
            <MenuItem linkPath='/' title='Feed' />
            <MenuItem linkPath={`/${currentUserDoc.username}`} title='Profile' />
            <Button
              addedClasses='py-1 px-1 text-lg my-5 w-4/5 mx-10 bg-slate-950 text-white border border-white hover:bg-gray-800'
              onClick={logOutHandler}
              type='button'
            >
              Sign Out
            </Button>
          </div>
        </>
      )
    } else {
      return (
        <div className='absolute right-5'>
          <ProfilePicBubble
            addedClasses='w-14 h-14 cursor-pointer mt-3'
            onClick={menuClickHandler}
            profilePic={currentUserDoc.profilePic}
          />
        </div>
      )
    }
  } else return <LoadingSpinner addedClasses='absolute right-10 mt-8' />
}

export default Menu
