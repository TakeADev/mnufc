import { useState, createContext, Dispatch, SetStateAction } from 'react'

interface IMenuContext {
  isOpen: Boolean
  setIsOpen: Dispatch<SetStateAction<Boolean>>
}

export const MenuContext = createContext<IMenuContext>({ isOpen: false, setIsOpen: () => {} })

function MenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const value = {
    isOpen,
    setIsOpen,
  }

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export default MenuProvider
