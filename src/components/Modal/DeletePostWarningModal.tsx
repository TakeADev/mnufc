import { useContext } from 'react'
import { useParams, useNavigate } from 'react-router'

import { deleteUserPost } from '../../utils/firebase/firebase-config'

import { ModalContext } from '../../contexts/ModalContext'
import { PostMenuContext } from '../../contexts/PostMenuContext'

import Button from '../Button'

const DeletePostWarningModal = () => {
  const { setModalIsOpen, setModalType } = useContext(ModalContext)
  const { postMenuPost, setPostMenuPost } = useContext(PostMenuContext)

  const params = useParams()
  const navigate = useNavigate()

  const deletePostHandler = () => {
    deleteUserPost(postMenuPost)
    params.postId && navigate(-1)
    setModalIsOpen(false)
    setPostMenuPost(null)
  }

  const cancelDeleteHandler = () => {
    setModalIsOpen(false)
    setModalType(null)
  }

  return (
    <div className='w-full'>
      <div className='mt-10 mb-8 w-3/4 mx-auto'>
        <span className='text-3xl font-bold'>Delete Post?</span>
      </div>
      <div className='w-3/4 mx-auto'>
        <span className='text-lg text-slate-400'>
          This post will be removed from existance. This can not be undone.
        </span>
      </div>
      <div className='mt-10 w-1/2 mx-auto'>
        <Button
          type='button'
          addedClasses='py-2 px-5 bg-red-500 text-white font-bold text-xl mr-20 w-full '
          onClick={deletePostHandler}
        >
          Delete
        </Button>
      </div>
      <div className='mt-4 w-1/2 mx-auto'>
        <Button
          type='button'
          addedClasses='py-2 px-5 bg-slate-950 text-white border border-white font-bold text-xl w-full mb-10 hover:bg-slate-900'
          onClick={cancelDeleteHandler}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default DeletePostWarningModal
