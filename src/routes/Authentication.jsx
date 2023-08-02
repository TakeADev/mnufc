import React from 'react'

function Authentication() {
  return (
    <div className='w-3/4 mx-auto flex py-52 bg-slate-950'>
      <div className='w-1/2 text-center mx-auto border-r-2 border-r-slate-800'>
        <span className='text-3xl'>Log In</span>
        <form action='post' className='text-left mt-5 text-2xl'>
          <div className='mt-10 text-center'>
            <input
              type='text'
              name='Email'
              placeholder='Email'
              className='bg-slate-800 ml-3 rounded-lg w-1/2 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 focus:w-3/4 p-2'
            />
          </div>
          <div className='mx-auto mt-10 text-center'>
            <input
              type='text'
              name='password'
              placeholder='Password'
              className='bg-slate-800 ml-3 rounded-lg w-1/2 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 focus:w-3/4 p-2'
            />
          </div>
        </form>
      </div>
      <div className='w-1/2 text-center mx-auto'>
        <span className='text-3xl'>Sign Up</span>
        <form action='post' className='text-left mt-5 text-2xl'>
          <div className='mt-10 text-center'>
            <input
              type='text'
              name='email'
              placeholder='Email'
              className='bg-slate-800 ml-3 rounded-lg w-1/2 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 focus:w-3/4 p-2'
            />
          </div>
          <div className='mx-auto mt-10 text-center'>
            <input
              type='text'
              name='username'
              placeholder='Username'
              className='bg-slate-800 ml-3 rounded-lg w-1/2 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 focus:w-3/4 p-2'
            />
          </div>
          <div className='mx-auto mt-10 text-center'>
            <input
              type='text'
              name='password'
              placeholder='Password'
              className='bg-slate-800 ml-3 rounded-lg w-1/2 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 focus:w-3/4 p-2'
            />
          </div>
          <div className='mx-auto mt-10 text-center'>
            <input
              type='text'
              name='confirmPassowrd'
              placeholder='Confirm Password'
              className='bg-slate-800 ml-3 rounded-lg w-1/2 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 focus:w-3/4 p-2'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Authentication
