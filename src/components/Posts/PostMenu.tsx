import React, { useEffect, useState, useContext } from 'react'

import { MdMoreHoriz } from 'react-icons/md'
import { FaRegTrashAlt } from 'react-icons/fa'
import { MdOutlineShare } from 'react-icons/md'

import { IUserPost } from '../../contexts/UserPosts'

import { UserContext } from '../../contexts/User'
import { PostMenuContext } from '../../contexts/PostMenuContext'
import { ModalContext } from '../../contexts/ModalContext'
import { FlashMessageContext } from '../../contexts/FlashMessageContext'

import { MODAL_TYPES } from '../../contexts/ModalContext'
const { deletePostWarning } = MODAL_TYPES

import { FLASH_TYPES } from '../../contexts/FlashMessageContext'
const { copy } = FLASH_TYPES

interface PostMenuProps {
  post: IUserPost
}

const PostMenu = ({ post }: PostMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const { setPostMenuIsOpen, setPostMenuPost } = useContext(PostMenuContext)
  const { setModalType, setModalIsOpen } = useContext(ModalContext)
  const { currentAuthUser } = useContext(UserContext)
  const { setFlashType } = useContext(FlashMessageContext)

  const menuIconClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()

    setIsOpen(true)
    setPostMenuIsOpen(true)
    setPostMenuPost(post)
  }
  const menuClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  const menuCloseHandler = () => {
    if (isOpen) {
      setIsOpen(false)
      setPostMenuIsOpen(false)
    }
  }

  const deleteButtonHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    setModalType(deletePostWarning)
    setModalIsOpen(true)
  }

  const shareButtonHandler = () => {
    setFlashType(copy)
    navigator.clipboard.writeText(`http://localhost:5173/${post.username}/status/${post.postId}`)
  }

  useEffect(() => {
    document.addEventListener('mouseup', menuCloseHandler)
  })

  return (
    <div className='pointer-events-auto' onClick={menuClickHandler}>
      <MdMoreHoriz
        className='absolute right-5 text-3xl text-slate-500 hover:bg-slate-800 rounded-full p-0.5 hover:cursor-pointer mt-2'
        onClick={menuIconClickHandler}
      />
      <div
        className={`
        absolute w-2/5 right-0 mt-2 mr-2 border border-slate-700 rounded-lg bg-slate-950 
        outline outline-1 outline-mn-blue  ${!isOpen && 'hidden '}`}
      >
        {currentAuthUser && post.uid === currentAuthUser.uid && (
          <div
            className='pl-6 text-red-500 py-2 hover:bg-slate-900 z-20'
            onClick={deleteButtonHandler}
          >
            <FaRegTrashAlt className='inline mb-1 text-md mr-3' />
            <span className='font-bold'>Delete</span>
          </div>
        )}
        <div className='pl-6 text-slate-300 py-2 hover:bg-slate-900' onClick={shareButtonHandler}>
          <MdOutlineShare className='inline mb-1 text-md mr-3' />
          <span className='font-bold'>Share Post</span>
        </div>
      </div>
    </div>
  )
}

export default PostMenu
