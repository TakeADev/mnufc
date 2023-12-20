import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'

interface IFlashMessageContext {
  flashType: string
  setFlashType: Dispatch<SetStateAction<string>>
  flashError: string
  setFlashError: Dispatch<SetStateAction<string>>
  triggerFlashError: (err: string) => void
}

export const FLASH_TYPES = {
  copy: 'copy',
  error: 'error',
}

export const FlashMessageContext = createContext<IFlashMessageContext>({
  flashType: '',
  setFlashType: () => {},
  flashError: '',
  setFlashError: () => {},
  triggerFlashError: () => {},
})

function FlashMessageProvider({ children }) {
  const [flashType, setFlashType] = useState('')
  const [flashError, setFlashError] = useState('')

  const triggerFlashError = (err) => {
    setFlashType(FLASH_TYPES.error)
    setFlashError(err)
    console.log('Triggered')
  }

  useEffect(() => {
    if (flashType !== '') {
      setTimeout(() => setFlashType(''), 2900)
      setTimeout(() => setFlashError(''), 2900)
    }
  }, [flashType])

  const value = {
    flashType,
    setFlashType,
    flashError,
    setFlashError,
    triggerFlashError,
  }

  return <FlashMessageContext.Provider value={value}>{children}</FlashMessageContext.Provider>
}

export default FlashMessageProvider
