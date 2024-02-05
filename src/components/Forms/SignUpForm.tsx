import { useState, useContext } from 'react'

import { Link } from 'react-router-dom'

import {
  createNewUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase-config'

import { FlashMessageContext } from '../../contexts/FlashMessageContext'

import Button from '../Button'

const defaultFormFields = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { username, email, password, confirmPassword } = formFields

  const { triggerFlashError } = useContext(FlashMessageContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return triggerFlashError('auth/passwords-dont-match')
    }
    try {
      await createNewUserWithEmailAndPassword(email, password, username).then((res) => {
        if (res.err) {
          return triggerFlashError(res.err)
        }
        createUserDocumentFromAuth(res, { username: username })
      })
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('Cannot create user. Email already in use.')
      } else {
        console.error('user creation encountered an error', err)
      }
    }
    resetFormFields()
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target

    e.preventDefault()
    setFormFields({ ...formFields, [name]: e.target.value })
  }

  return (
    <>
      <div className='text-left ml-3'>
        <span className='text-3xl font-bold'>Sign up</span>
      </div>
      <form action='post' className='text-left mt-5 text-2xl' onSubmit={onSubmitHandler}>
        <div className='mt-10 text-center'>
          <input
            required
            type='text'
            name='email'
            placeholder='Email'
            className='bg-slate-950 ml-3 rounded-lg border border-gray-700 focus:border-mn-blue focus:outline-none focus:ring-0 p-2'
            value={email}
            onChange={onChangeHandler}
          />
        </div>
        <div className='mx-auto mt-10 text-center'>
          <input
            required
            type='text'
            name='username'
            placeholder='Username'
            className='bg-slate-950 ml-3 rounded-lg border border-gray-700 focus:border-mn-blue focus:outline-none focus:ring-0 p-2'
            value={username}
            onChange={onChangeHandler}
          />
        </div>
        <div className='mx-auto mt-10 text-center'>
          <input
            required
            type='password'
            name='password'
            placeholder='Password'
            className='bg-slate-950 ml-3 rounded-lg border border-gray-700 focus:border-mn-blue focus:outline-none focus:ring-0 p-2'
            value={password}
            onChange={onChangeHandler}
          />
          {password.length > 0 && password.length < 8 && (
            <span className='text-red-500 text-base block absolute ml-3'>
              Password must contain 8 characters
            </span>
          )}
        </div>
        <div className='mx-auto mt-10 text-center'>
          <input
            required
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            className='bg-slate-950 ml-3 rounded-lg border border-gray-700 focus:border-mn-blue focus:outline-none focus:ring-0 p-2'
            value={confirmPassword}
            onChange={onChangeHandler}
          />
        </div>
        <Button
          type='submit'
          addedClasses='mt-10 pb-1 border border-mn-blue text-mn-blue ml-3 w-[95%]'
        >
          Sign up
        </Button>
      </form>
      <div className='text-center mt-5'>
        <span>
          Already have an account?{' '}
          <Link to='/login'>
            <span className=' text-mn-blue'>Log in</span>
          </Link>
        </span>
      </div>
    </>
  )
}

export default SignUpForm
