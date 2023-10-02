import { useContext } from 'react'
import EditProfileForm from '../Forms/EditProfileForm'

import { ModalContext } from '../../contexts/ModalContext'
import CreateReplyModal from './CreateReplyModal'
import { IUserPost, UserPostsContext } from '../../contexts/UserPosts'

function Modal({ children }) {
  const { modalIsOpen, modalType, replyModalPostId } = useContext(ModalContext)
  const { userPosts } = useContext(UserPostsContext)

  const replyModalPost: IUserPost =
    userPosts && userPosts.find((post) => post.postId == replyModalPostId)

  return (
    <div>
      {modalIsOpen && (
        <div className={`mt-28 fixed mx-auto w-full z-50 h-screen `}>
          <div className='bg-slate-950 w-3/5 lg:w-1/2 max-w-xl z-0 mx-auto rounded-xl'>
            {modalType == 'editProfile' && <EditProfileForm />}
            {modalType == 'createPostReply' && (
              <div className='py-10'>{userPosts && <CreateReplyModal post={replyModalPost} />}</div>
            )}
          </div>
        </div>
      )}

      <div className={`${modalIsOpen && 'opacity-40 bg-gray-500 '}w-full h-full -z-10`}>
        {children}
      </div>
    </div>
  )
}

export default Modal
