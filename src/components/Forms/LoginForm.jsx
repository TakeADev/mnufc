import React, { useState } from 'react'

import { signInUserWithEmailAndPassword } from '../../utils/firebase/firebase-config'
import Button from '../Button'

function LoginForm() {
  const defaultFormFields = {
    email: '',
    password: '',
  }

  const [formValue, setFormValue] = useState(defaultFormFields)

  const { email, password } = formValue

  const resetFormFields = () => {
    setFormValue(defaultFormFields)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    await signInUserWithEmailAndPassword(email, password)
    resetFormFields()
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
            className='bg-slate-800 ml-3 rounded-lg w-3/4 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 p-2'
            onChange={onChangeHandler}
            value={email}
            required
          />
        </div>
        <div className='mx-auto mt-10 text-center'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            className='bg-slate-800 ml-3 rounded-lg w-3/4 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 p-2'
            onChange={onChangeHandler}
            value={password}
            required
          />
        </div>
        <Button type='submit' addedClasses='w-1/3 ml-20 mt-5'>
          Sign In
        </Button>
      </form>
    </>
  )
}

export default LoginForm
