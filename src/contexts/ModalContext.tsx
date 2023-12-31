import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { IUserPost } from './UserPosts'

interface IModalContext {
  modalIsOpen: Boolean
  setModalIsOpen: Dispatch<SetStateAction<Boolean>>
  modalType: string
  setModalType: Dispatch<SetStateAction<String>>
  replyModalPostId: String | null
  setReplyModalPostId: Dispatch<SetStateAction<IUserPost>>
  loginWarningType: string
  setLoginWarningType: Dispatch<SetStateAction<String>>
}

export const ModalContext = createContext<IModalContext>({
  modalIsOpen: false,
  setModalIsOpen: () => {},
  modalType: '',
  setModalType: () => {},
  replyModalPostId: '',
  setReplyModalPostId: () => {},
  loginWarningType: '',
  setLoginWarningType: () => {},
})

export const MODAL_TYPES = {
  editProfile: 'editProfile',
  deletePostWarning: 'deletePostWarning',
  photoCrop: 'photoCrop',
  loginWarning: 'loginWarning',
  createPostReply: 'createPostReply',
}

export const LOGIN_WARNING_TYPES = {
  comment: 'comment',
  like: 'like',
  repost: 'repost',
}

function ModalProvider({ children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [replyModalPostId, setReplyModalPostId] = useState(null)
  const [loginWarningType, setLoginWarningType] = useState('')

  const value = {
    modalIsOpen,
    setModalIsOpen,
    modalType,
    setModalType,
    replyModalPostId,
    setReplyModalPostId,
    loginWarningType,
    setLoginWarningType,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export default ModalProvider
