import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

import { UserContext } from '../contexts/User'
import { MenuContext } from '../contexts/MenuContext'

import { signOutUser } from '../utils/firebase/firebase-config'

import ProfilePicBubble from './Profile/ProfilePicBubble'

function NavBar() {
  const { currentUser } = useContext(UserContext)
  const { isOpen, setIsOpen } = useContext(MenuContext)

  const menuClickHandler = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <div className='dark:bg-gray-950 sticky top-0 flex mb-5 mx-auto pb-5'>
      <div className='w-14 mt-3 ml-5'>
        <Link to='/'>
          <img className='' src='https://gravectory.com/wp-content/uploads/2023/03/minnesota_united_24.png' alt='Loon' />
        </Link>
      </div>
      {currentUser ? (
        <div className='absolute right-0 flex-col bg-slate-900 rounded-xl w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4 h-screen'>
          <div className='flex ml-5 pl-0'>
            <ProfilePicBubble className='w-1/4' />
            <span className='w-3/4 mt-7 ml-3'>User</span>
          </div>
          <div className='w-5/6 ml-5 px-0 my-3 py-3 border-b border-gray-800'>
            <Link to='/'>
              <span className='py-1 text-lg hover:text-gray-500'>Feed</span>
            </Link>
          </div>
          <div className='w-5/6 ml-5 pl-0 my-3 py-3 border-b border-gray-800'>
            <Link to='/profile/test'>
              <span className='py-1 text-lg w-full hover:text-gray-500'>Profile</span>
            </Link>
          </div>
          <div className='bottom-0'>
            <Button
              addedClasses='py-1 px-1 text-lg my-5 w-4/5 mx-10 bg-slate-950 text-white border border-white'
              onClick={signOutUser}
            >
              Sign Out
            </Button>
          </div>
        </div>
      ) : (
        <div className='absolute right-12'>
          <Link to='/login'>
            <Button addedClasses='py-1 px-2 text-lg my-5 w-full mx-10'>Login</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default NavBar
