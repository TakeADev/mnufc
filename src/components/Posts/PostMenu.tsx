import { useEffect, useState, useContext } from 'react'

import { MdMoreHoriz } from 'react-icons/md'
import { FaRegTrashAlt } from 'react-icons/fa'
import { MdOutlineShare } from 'react-icons/md'

import { IUserPost } from '../../contexts/UserPosts'

import { UserContext } from '../../contexts/User'
import { PostMenuContext } from '../../contexts/PostMenuContext'
import { ModalContext } from '../../contexts/ModalContext'

interface PostMenuProps {
  post: IUserPost
}

const PostMenu = ({ post }: PostMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const { setPostMenuIsOpen, setPostMenuPost, postMenuPost } = useContext(PostMenuContext)
  const { setModalType, setModalIsOpen } = useContext(ModalContext)
  const { currentAuthUser } = useContext(UserContext)

  const menuIconClickHandler = (e) => {
    e.preventDefault()

    setIsOpen(true)
    setPostMenuIsOpen(true)
    setPostMenuPost(post)
  }
  const menuClickHandler = (e) => {
    e.preventDefault()
  }

  const menuCloseHandler = () => {
    if (isOpen) {
      setIsOpen(false)
      setPostMenuIsOpen(false)
    }
  }

  const deleteButtonHandler = (e) => {
    e.preventDefault()
    setModalType('deletePostWarning')
    setModalIsOpen(true)
  }

  useEffect(() => {
    document.addEventListener('mouseup', menuCloseHandler)
  })

  return (
    <div className='pointer-events-auto' onClick={menuClickHandler}>
      <MdMoreHoriz
        className='absolute right-5 mt-4 text-3xl text-slate-500 hover:bg-slate-800 rounded-full p-0.5 hover:cursor-pointer'
        onClick={menuIconClickHandler}
      />
      <div
        className={`
        absolute w-2/5 right-0 mt-2 mr-2 border border-slate-700 rounded-lg bg-slate-950 
        outline outline-1 outline-cyan-500  ${!isOpen && 'hidden '}`}
      >
        {post.uid === currentAuthUser.uid && (
          <div
            className='pl-6 text-red-500 py-2 hover:bg-slate-900 z-20'
            onClick={deleteButtonHandler}
          >
            <FaRegTrashAlt className='inline mb-1 text-md mr-3' />
            <span className='font-bold'>Delete</span>
          </div>
        )}
        <div className='pl-6 text-slate-300 py-2 hover:bg-slate-900 '>
          <MdOutlineShare className='inline mb-1 text-md mr-3' />
          <span className='font-bold'>Share Post</span>
        </div>
      </div>
    </div>
  )
}

export default PostMenu