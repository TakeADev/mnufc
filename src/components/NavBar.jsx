import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

import { UserContext } from '../contexts/User'

import { signOutUser } from '../utils/firebase/firebase-config'

function NavBar() {
  const { currentUser } = useContext(UserContext)
  return (
    <div className='dark:bg-gray-950 sticky top-0 flex'>
      <div className='w-20'>
        <Link to='/'>
          <img className='' src='https://gravectory.com/wp-content/uploads/2023/03/minnesota_united_24.png' alt='Loon' />
        </Link>
      </div>
      <div className='absolute right-20'>
        {currentUser ? (
          <Button addedClasses='py-1 px-2 text-xl my-5 w-full mx-10' onClick={signOutUser}>
            Sign Out
          </Button>
        ) : (
          <Link to='/auth'>
            <Button addedClasses='py-1 px-2 text-xl my-5 w-full mx-10'>Login</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default NavBar
