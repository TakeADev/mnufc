import { createContext, useState } from 'react'

export const ModalContext = createContext({
  modalIsOpen: false,
  setModalIsOpen: () => {},
})

function ModalProvider({ children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const value = {
    modalIsOpen,
    setModalIsOpen,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export default ModalProvider
