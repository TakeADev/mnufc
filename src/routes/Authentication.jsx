import React from 'react'
import LoginForm from '../components/Forms/LoginForm'
import SignUpForm from '../components/Forms/SignUpForm'

function Authentication() {
  return (
    <div className='w-3/4 mx-auto flex pt-52 pb-40 bg-slate-950'>
      <div className='w-1/2 text-center mx-auto border-r-2 border-r-slate-800'>
        <LoginForm />
      </div>
      <div className='w-1/2 text-center mx-auto'>
        <SignUpForm />
      </div>
    </div>
  )
}

export default Authentication
