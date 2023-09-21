import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import Button from './Button'
import Menu from './Menu/Menu'

import { UserContext } from '../contexts/User'

function NavBar() {
  const { currentAuthUser } = useContext(UserContext)

  return (
    <div className='dark:bg-slate-900 sticky top-0 flex border-b border-slate-200 mx-auto pb-5'>
      <div className='w-14 mt-3 ml-5'>
        <Link to='/'>
          <img
            src='https://gravectory.com/wp-content/uploads/2023/03/minnesota_united_24.png'
            alt='Loon'
          />
        </Link>
      </div>

      {currentAuthUser ? (
        <Menu />
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
