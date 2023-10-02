import { useContext } from 'react'

import { signOutUser } from '../../utils/firebase/firebase-config'

import { MenuContext } from '../../contexts/MenuContext'
import { UserContext } from '../../contexts/User'

import Button from '../Button'
import MenuItem from './MenuItem'
import MenuHeader from './MenuHeader'
import ProfilePicBubble from '../Profile/ProfilePicBubble'

import '../../styles/animations.scss'

function Menu() {
  const { isOpen, setIsOpen } = useContext(MenuContext)
  const { currentUserDoc } = useContext(UserContext)

  const menuClickHandler = () => {
    setIsOpen(!isOpen)
  }

  if (isOpen) {
    return (
      <>
        <div
          className='bg-gray-500 h-screen absolute w-full opacity-50'
          onClick={menuClickHandler}
        ></div>
        <div className='absolute right-0 flex-col bg-slate-900 rounded-xl w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4 h-screen slide-from-right'>
          <MenuHeader onClick={menuClickHandler} />
          <MenuItem linkPath='/' title='Feed' />
          <MenuItem linkPath={`/${currentUserDoc.username}`} title='Profile' />
          <Button
            addedClasses='py-1 px-1 text-lg my-5 w-4/5 mx-10 bg-slate-900 text-white border border-white hover:bg-gray-800'
            onClick={signOutUser}
          >
            Sign Out
          </Button>
        </div>
      </>
    )
  } else {
    return (
      <div className='absolute right-5'>
        <ProfilePicBubble addedClasses='w-10 h-10 cursor-pointer mt-5' onClick={menuClickHandler} />
      </div>
    )
  }
}

export default Menu
