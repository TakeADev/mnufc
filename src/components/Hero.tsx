import { Link } from 'react-router-dom'

import Button from './Button'

function Hero() {
  return (
    <div id='hero' className='w-screen h-screen flex items-center dark:bg-gray-950'>
      <div className='mx-auto w-full max-w-xl text-center'>
        <span className='text-5xl'>Minnesota United Fan Club</span>
        <h2 className='text-3xl my-10 '>Swim with the Loons!</h2>
        <Link to='/login'>
          <Button type='button' addedClasses='text-3xl w-1/2 py-2 px-3'>
            Login
          </Button>
        </Link>
      </div>
      <div className='text-left pl-10 max-w-3xl hidden md:block h-screen mr-0'>
        <img
          className='rounded-3xl float-left invisible md:visable h-5/6'
          src='https://images.unsplash.com/photo-1627955353583-5ed9f3ff1dc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80'
          alt='Loon-In-Water'
        />
      </div>
    </div>
  )
}

export default Hero
