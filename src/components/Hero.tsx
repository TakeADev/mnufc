import { Link } from 'react-router-dom'

import Button from './Button'

function Hero() {
  return (
    <div className='flex h-screen md:items-center'>
      <div className='w-16 md:w-1/2 xl:w-1/4 mt-3 ml-5 mr-20 absolute md:relative'>
        <Link to='/'>
          <img
            src='https://gravectory.com/wp-content/uploads/2023/03/minnesota_united_24.png'
            alt='Loon'
          />
        </Link>
      </div>
      <div id='hero' className=' h-screen md:items-center flex mt-32  dark:bg-gray-950'>
        <div className='mx-auto w-full max-w-xl ml-5'>
          <span className='text-5xl font-bold'>
            Minnesota United <br /> Fan Club
          </span>
          <h2 className='text-2xl mt-10 mb-5 font-bold'>Swim with the Loons.</h2>
          <div>
            <Link to={'/signup'}>
              <div className=''>
                <Button type='button' addedClasses='text-2xl w-1/2 py-1 px-2 '>
                  Sign Up
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
                  addedClasses='text-2xl w-1/2 py-1 px-2 bg-slate-950 text-cyan-500 border border-cyan-500'
                >
                  Login
                </Button>
              </div>
            </Link>
          </div>
        </div>
        <div className='text-left pl-10 max-w-3xl hidden md:block h-screen mr-0'>
          <img
            className='rounded-3xl float-left invisible md:visable h-5/6'
            src='https://images.unsplash.com/photo-1627955353583-5ed9f3ff1dc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80'
            alt='Loon-In-Water'
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
