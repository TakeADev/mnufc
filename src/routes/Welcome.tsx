import { Link } from 'react-router-dom'

import LoonLogo from '../assets/loonltr.png'

import Button from '../components/Button'

function Welcome() {
  return (
    <>
      <div className='flex h-screen md:items-center'>
        <div className='w-16 md:w-1/2 mt-3 ml-5 mr-20 absolute md:relative'>
          <Link to='/'>
            <img src={LoonLogo} alt='Loon' className='lg:w-3/4 xl:w-1/2 mx-auto' />
          </Link>
        </div>
        <div
          id='hero'
          className='h-screen md:items-center flex mt-52 md:mt-0  dark:bg-gray-950 lg:w-1/2'
        >
          <div className='mx-auto w-full ml-10 md:ml-0'>
            <span className='text-5xl font-bold'>
              Minnesota United <br /> Fan Club
            </span>
            <h2 className='text-2xl mt-10 mb-5 font-bold'>Swim with the Loons.</h2>
            <div className=''>
              <Link to={'/signup'}>
                <div className=''>
                  <Button
                    type='button'
                    addedClasses='text-2xl text-black bg-mn-blue w-1/2 py-1 px-2 '
                  >
                    Sign up
                  </Button>
                </div>
              </Link>
              <div className='mt-20 font-bold'>
                <span>Already have an account?</span>
              </div>
              <Link to='/login'>
                <div className='mt-5'>
                  <Button
                    type='button'
                    addedClasses='text-2xl w-1/2 py-1 px-2 text-mn-blue border border-mn-blue bg-slate-950'
                  >
                    Log in
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Welcome
