import React from 'react'
import LoginForm from '../components/Forms/LoginForm'
import SignUpForm from '../components/Forms/SignUpForm'

function Login() {
  return (
    <>
      <div className='w-xl mx-auto flex pt-52 pb-40 bg-slate-950'>
        <div className='text-center mx-auto'>
          <LoginForm />
        </div>
      </div>
    </>
  )
}

export default Login
