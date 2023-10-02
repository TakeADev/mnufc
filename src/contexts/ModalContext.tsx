import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { IUserPost } from './UserPosts'

interface IModalContext {
  modalIsOpen: Boolean
  setModalIsOpen: Dispatch<SetStateAction<Boolean>>
  modalType: string
  setModalType: Dispatch<SetStateAction<String>>
  replyModalPostId: String | null
  setReplyModalPostId: Dispatch<SetStateAction<IUserPost>>
}

export const ModalContext = createContext<IModalContext>({
  modalIsOpen: false,
  setModalIsOpen: () => {},
  modalType: '',
  setModalType: () => {},
  replyModalPostId: '',
  setReplyModalPostId: () => {},
})

function ModalProvider({ children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [replyModalPostId, setReplyModalPostId] = useState(null)

  const value = {
    modalIsOpen,
    setModalIsOpen,
    modalType,
    setModalType,
    replyModalPostId,
    setReplyModalPostId,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export default ModalProvider
