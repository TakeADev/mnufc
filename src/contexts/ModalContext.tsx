import { Dispatch, SetStateAction, createContext, useState } from 'react'

interface IModalContext {
  modalIsOpen: Boolean
  setModalIsOpen: Dispatch<SetStateAction<Boolean>>
  modalType: string
  setModalType: Dispatch<SetStateAction<String>>
}

export const ModalContext = createContext<IModalContext>({
  modalIsOpen: false,
  setModalIsOpen: () => {},
  modalType: '',
  setModalType: () => {},
})

function ModalProvider({ children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalType, setModalType] = useState('')

  const value = {
    modalIsOpen,
    setModalIsOpen,
    modalType,
    setModalType,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export default ModalProvider
