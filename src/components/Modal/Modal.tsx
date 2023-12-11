import { useContext } from 'react'
import EditProfileForm from '../Forms/EditProfileForm'

import { IUserPost, UserPostsContext } from '../../contexts/UserPosts'
import { ModalContext } from '../../contexts/ModalContext'
import { PostMenuContext } from '../../contexts/PostMenuContext'

import CreateReplyModal from './CreateReplyModal'
import LoginWarningModal from './LoginWarningModal'
import DeletePostWarningModal from './DeletePostWarningModal'
import PhotoCropModal from './PhotoCropModal'

import { MODAL_TYPES } from '../../contexts/ModalContext'
const { editProfile, createPostReply, loginWarning, deletePostWarning, photoCrop } = MODAL_TYPES

function Modal({ children }) {
  const { modalIsOpen, modalType, replyModalPostId, setModalIsOpen } = useContext(ModalContext)
  const { userPosts } = useContext(UserPostsContext)
  const { postMenuIsOpen } = useContext(PostMenuContext)

  const replyModalPost: IUserPost =
    userPosts && userPosts.find((post) => post.postId == replyModalPostId)

  const modalCloseHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    setModalIsOpen(false)
  }

  return (
    <div className={`${postMenuIsOpen && 'pointer-events-none'}`}>
      {modalIsOpen && (
        <div
          className={`flex fixed mx-auto w-full h-screen items-center z-10`}
          onClick={modalCloseHandler}
        >
          <div
            className='relative bg-slate-950 w-full lg:w-1/2 max-w-xl mx-auto rounded-xl'
            onClick={(e) => e.stopPropagation()}
          >
            {modalType == editProfile && <EditProfileForm />}
            {modalType == createPostReply && (
              <div className='py-10'>{userPosts && <CreateReplyModal post={replyModalPost} />}</div>
            )}
            {modalType == loginWarning && <LoginWarningModal />}
            {modalType == deletePostWarning && <DeletePostWarningModal />}
            {modalType == photoCrop && <PhotoCropModal />}
          </div>
        </div>
      )}

      <div className={`${modalIsOpen && 'opacity-40 bg-gray-500 '}w-full h-full`}>{children}</div>
    </div>
  )
}

export default Modal
