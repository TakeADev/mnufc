import React, { useState } from 'react'

import { signInUserWithEmailAndPassword } from '../../utils/firebase/firebase-config'

function LoginForm() {
  const defaultFormFields = {
    email: '',
    password: '',
  }

  const [formValue, setFormValue] = useState(defaultFormFields)

  const { email, password } = formValue

  const clearFormFields = () => {
    setFormValue(defaultFormFields)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    signInUserWithEmailAndPassword(email, password)
    clearFormFields()
  }

  const onChangeHandler = (e) => {
    const { name } = e.target

    e.preventDefault()
    setFormValue({ ...formValue, [name]: e.target.value })
  }

  return (
    <>
      <span className='text-3xl'>Log In</span>
      <form action='post' className='text-left mt-5 text-2xl' onSubmit={onSubmitHandler}>
        <div className='mt-10 text-center'>
          <input
            type='text'
            name='email'
            placeholder='Email'
            className='bg-slate-800 ml-3 rounded-lg w-1/2 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 focus:w-3/4 p-2'
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className='mx-auto mt-10 text-center'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            className='bg-slate-800 ml-3 rounded-lg w-1/2 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 focus:w-3/4 p-2'
            onChange={onChangeHandler}
            required
          />
        </div>
        <input type='submit' value='' />
      </form>
    </>
  )
}

export default LoginForm
