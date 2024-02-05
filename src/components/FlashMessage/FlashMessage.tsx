import { useContext } from 'react'

import { FlashMessageContext } from '../../contexts/FlashMessageContext'

import { FLASH_TYPES } from '../../contexts/FlashMessageContext'
const { copy, error } = FLASH_TYPES

import '../../styles/animations.scss'

const FlashMessage = () => {
  const { flashType, flashError } = useContext(FlashMessageContext)

  switch (flashType) {
    case copy:
      return (
        <div className='absolute z-50 w-full min-h-screen flex justify-center pointer-events-none'>
          <div className='fixed top-36 bg-orange-300 text-center px-10 text-xl text-orange-700 fade-in-and-out rounded-lg py-2'>
            <span className=''>Link has been coppied to your clipboard</span>
          </div>
        </div>
      )
    case error:
      return (
        <div className='absolute z-50 w-full min-h-screen flex justify-center pointer-events-none'>
          <div className='fixed top-36 bg-red-300 text-center px-10 text-xl text-red-700 fade-in-and-out rounded-lg py-2'>
            <span className=''>
              {flashError === 'auth/wrong-password' ||
                (flashError === 'auth/user-not-found' && 'Wrong email or password.')}
              {flashError === 'auth/email-already-in-use' && 'Email is already in use'}
              {flashError === 'auth/username-already-in-use' && 'Username is not available.'}
              {flashError === 'auth/invalid-email' && 'Invalid email.'}
              {flashError === 'auth/weak-password' && 'Password is too weak.'}
              {flashError === 'auth/passwords-dont-match' && 'Passwords do not match'}
            </span>
          </div>
        </div>
      )
  }
}

export default FlashMessage
