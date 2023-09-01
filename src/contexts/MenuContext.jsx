import React, { useState, createContext } from 'react'

export const MenuContext = createContext({ isOpen: false, setIsOpen: () => {} })

function MenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const value = {
    isOpen,
    setIsOpen,
  }

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export default MenuProvider
