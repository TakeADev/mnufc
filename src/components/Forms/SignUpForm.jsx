import React, { useState, useContext } from 'react'

import { createNewUserWithEmailAndPassword } from '../../utils/firebase/firebase-config'

const defaultFormFields = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function SignUpForm() {
  const [formValue, setFormValue] = useState(defaultFormFields)

  const { username, email, password, confirmPassword } = formValue

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return alert('Passwords do not match.')
    }
    createNewUserWithEmailAndPassword(email, password, username)
    setFormValue(defaultFormFields)
  }

  const onChangeHandler = (e) => {
    const { name } = e.target

    e.preventDefault()
    setFormValue({ ...formValue, [name]: e.target.value })
  }

  return (
    <>
      <span className='text-3xl'>Sign Up</span>
      <form action='post' className='text-left mt-5 text-2xl' onSubmit={onSubmitHandler}>
        <div className='mt-10 text-center'>
          <input
            required
            type='text'
            name='email'
            placeholder='Email'
            className='bg-slate-800 ml-3 rounded-lg w-3/4 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 p-2'
            value={formValue.email}
            onChange={onChangeHandler}
          />
        </div>
        <div className='mx-auto mt-10 text-center'>
          <input
            required
            type='text'
            name='username'
            placeholder='Username'
            className='bg-slate-800 ml-3 rounded-lg w-3/4 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 p-2'
            value={formValue.username || ''}
            onChange={onChangeHandler}
          />
        </div>
        <div className='mx-auto mt-10 text-center'>
          <input
            required
            type='password'
            name='password'
            placeholder='Password'
            className='bg-slate-800 ml-3 rounded-lg w-3/4 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 p-2'
            value={formValue.password || ''}
            onChange={onChangeHandler}
          />
        </div>
        <div className='mx-auto mt-10 text-center'>
          <input
            required
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            className='bg-slate-800 ml-3 rounded-lg w-3/4 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 p-2'
            value={formValue.confirmPassword || ''}
            onChange={onChangeHandler}
          />
          <input type='submit' value='' />
        </div>
      </form>
    </>
  )
}

export default SignUpForm
