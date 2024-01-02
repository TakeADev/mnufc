import { useContext } from 'react'
import { Link } from 'react-router-dom'

import Button from './Button'
import Menu from './Menu/Menu'

import { UserContext } from '../contexts/User'

function NavBar() {
  const { currentAuthUser } = useContext(UserContext)

  return (
    <div className='dark:bg-slate-950 sticky top-0 flex border-b border-slate-700 mx-auto pb-5 z-10'>
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
            <Button
              type='button'
              addedClasses='py-1 px-2 text-lg my-5 w-4/5 mx-10 text-black bg-mn-blue hover:bg-sky-300 font-bold'
            >
              Log in
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default NavBar
