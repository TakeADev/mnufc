import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'

interface IFlashMessageContext {
  flashType: string
  setFlashType: Dispatch<SetStateAction<string>>
}

export const FLASH_TYPES = {
  copy: 'copy',
}

export const FlashMessageContext = createContext<IFlashMessageContext>({
  flashType: '',
  setFlashType: () => {},
})

function FlashMessageProvider({ children }) {
  const [flashType, setFlashType] = useState('')

  useEffect(() => {
    if (flashType !== '') {
      setTimeout(() => setFlashType(''), 2900)
    }
  }, [flashType])

  const value = {
    flashType,
    setFlashType,
  }

  return <FlashMessageContext.Provider value={value}>{children}</FlashMessageContext.Provider>
}

export default FlashMessageProvider
