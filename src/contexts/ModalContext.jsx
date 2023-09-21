import { createContext, useState } from 'react'

export const ModalContext = createContext({
  modalIsOpen: false,
  setModalIsOpen: () => {},
  modalType: '',
  setModalType: () => {},
})

function ModalProvider({ children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalType, setModalType] = useState(false)

  const value = {
    modalIsOpen,
    setModalIsOpen,
    modalType,
    setModalType,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export default ModalProvider
