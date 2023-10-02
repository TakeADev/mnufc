import { useState } from 'react'

import { Link } from 'react-router-dom'

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
      <span className='text-3xl'>Login</span>
      <form action='post' className='text-left mt-5 text-2xl' onSubmit={onSubmitHandler}>
        <div className='mt-10 text-center'>
          <input
            type='text'
            name='email'
            placeholder='Email'
            className='bg-slate-800 ml-3 rounded-lg focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 p-2'
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
            className='bg-slate-800 ml-3 rounded-lg focus:border focus:border-cyan-300 focus:outline-none focus:ring-0 p-2'
            onChange={onChangeHandler}
            value={password}
            required
          />
        </div>
        <Button type='submit' addedClasses='w-1/2 ml-20 mt-5'>
          Login
        </Button>
      </form>
      <div className='text-center mt-5'>
        <span>
          Don't have an account?{' '}
          <Link to='/signup'>
            <span className=' text-cyan-500'>Sign Up!</span>
          </Link>
        </span>
      </div>
    </>
  )
}

export default LoginForm
