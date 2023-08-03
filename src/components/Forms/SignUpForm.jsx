import React, { useState, useContext } from 'react'

function SignUpForm() {
  const [user, setUser] = useState({})

  const onSubmitHandler = (e) => {
    console.log('Submitted')
  }

  return (
    <>
      <span className='text-3xl'>Sign Up</span>
      <form action='post' className='text-left mt-5 text-2xl' onSubmit={onSubmitHandler}>
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
            type='password'
            name='password'
            placeholder='Password'
            className='bg-slate-800 ml-3 rounded-lg w-1/2 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 focus:w-3/4 p-2'
          />
        </div>
        <div className='mx-auto mt-10 text-center'>
          <input
            type='password'
            name='confirmPassowrd'
            placeholder='Confirm Password'
            className='bg-slate-800 ml-3 rounded-lg w-1/2 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 focus:w-3/4 p-2'
          />
        </div>
      </form>
    </>
  )
}

export default SignUpForm
