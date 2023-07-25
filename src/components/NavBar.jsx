import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

function NavBar() {
  return (
    <div className='dark:bg-gray-950 sticky top-0 flex'>
      <div className='w-20'>
        <Link>
          <img
            className=''
            src='https://gravectory.com/wp-content/uploads/2023/03/minnesota_united_24.png'
            alt='Loon'
          />
        </Link>
      </div>
      <div className='absolute right-20'>
        <Button addedClasses='py-1 px-2 text-xl my-5 w-full mx-10'>
          Login
        </Button>
      </div>
    </div>
  )
}

export default NavBar
