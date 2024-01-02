import { useState, useContext } from 'react'

import { Link } from 'react-router-dom'

import { signInUserWithEmailAndPassword } from '../../utils/firebase/firebase-config'

import { FlashMessageContext } from '../../contexts/FlashMessageContext'

import Button from '../Button'

const defaultFormFields = {
  email: '',
  password: '',
}

function LoginForm() {
  const [formValue, setFormValue] = useState(defaultFormFields)

  const { triggerFlashError } = useContext(FlashMessageContext)

  const { email, password } = formValue

  const resetFormFields = () => {
    setFormValue(defaultFormFields)
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signInUserWithEmailAndPassword(email, password).then((res) => {
      res.err && triggerFlashError(res.err)
      resetFormFields()
    })
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target

    e.preventDefault()
    setFormValue({ ...formValue, [name]: e.target.value })
  }

  return (
    <>
      <div className='text-left ml-3 font-bold'>
        <span className='text-3xl'>Login</span>
      </div>
      <form action='post' className='text-left mt-5 text-2xl' onSubmit={onSubmitHandler}>
        <div className='mt-10 '>
          <input
            type='text'
            name='email'
            placeholder='Email'
            className='bg-slate-950 ml-3 rounded-lg border border-gray-700 focus:border-mn-blue focus:outline-none focus:ring-0 p-2'
            onChange={onChangeHandler}
            value={email}
            required
          />
        </div>
        <div className='mx-auto mt-10 '>
          <input
            type='password'
            name='password'
            placeholder='Password'
            className='bg-slate-950 ml-3 rounded-lg border border-gray-700 focus:border-mn-blue focus:outline-none focus:ring-0 p-2'
            onChange={onChangeHandler}
            value={password}
            required
          />
        </div>
        <Button
          type='submit'
          addedClasses='mt-10 pb-1 border border-mn-blue text-mn-blue ml-3 w-[95%]'
        >
          Login
        </Button>
      </form>
      <div className='text-left mt-16 ml-3'>
        <span>
          Don't have an account?{' '}
          <Link to='/signup'>
            <span className=' text-mn-blue hover:text-sky-600'>Sign Up!</span>
          </Link>
        </span>
      </div>
    </>
  )
}

export default LoginForm
