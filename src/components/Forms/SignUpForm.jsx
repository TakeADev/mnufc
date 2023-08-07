import React, { useState } from 'react'

import { createNewUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase-config'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return alert('Passwords do not match.')
    }
    try {
      const user = await createNewUserWithEmailAndPassword(email, password)

      await createUserDocumentFromAuth(user, displayName)
      resetFormFields()
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('Cannot create user. Email already in use.')
      } else {
        console.error('user creation encountered an error', err)
      }
    }
  }

  const onChangeHandler = (e) => {
    const { name } = e.target

    e.preventDefault()
    setFormFields({ ...formFields, [name]: e.target.value })
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
            value={formFields.email || ''}
            onChange={onChangeHandler}
          />
        </div>
        <div className='mx-auto mt-10 text-center'>
          <input
            required
            type='text'
            name='displayName'
            placeholder='Username'
            className='bg-slate-800 ml-3 rounded-lg w-3/4 focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 p-2'
            value={formFields.displayName || ''}
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
            value={formFields.password || ''}
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
            value={formFields.confirmPassword || ''}
            onChange={onChangeHandler}
          />
          <button type='submit'>Sign Up</button>
        </div>
      </form>
    </>
  )
}

export default SignUpForm
