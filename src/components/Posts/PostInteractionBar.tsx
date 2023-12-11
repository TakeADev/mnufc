import { MouseEventHandler, useContext } from 'react'

import { MdChat, MdFavoriteBorder, MdFavorite, MdRepeat } from 'react-icons/md'

import { togglePostLike, toggleRepost } from '../../utils/firebase/firebase-config'

import { UserContext } from '../../contexts/User'
import { ModalContext } from '../../contexts/ModalContext'

import { LOGIN_WARNING_TYPES, MODAL_TYPES } from '../../contexts/ModalContext'
const { comment, like, repost } = LOGIN_WARNING_TYPES
const { loginWarning, createPostReply } = MODAL_TYPES

const PostInteractionBar = ({ post }) => {
  const { currentUserDoc, currentAuthUser } = useContext(UserContext)
  const { setModalIsOpen, setModalType, setReplyModalPostId, setLoginWarningType } =
    useContext(ModalContext)

  const postCommentClickHandler: MouseEventHandler = (e) => {
    e.preventDefault()
    if (!currentAuthUser) {
      setLoginWarningType(comment)
      setModalType(loginWarning)
      setModalIsOpen(true)
      return
    }
    setModalType(createPostReply)
    setReplyModalPostId(post.postId)
    setModalIsOpen(true)
  }

  const postLikeClickHandler: MouseEventHandler = (e) => {
    e.preventDefault()
    if (!currentAuthUser) {
      setLoginWarningType(like)
      setModalType(loginWarning)
      setModalIsOpen(true)
      return
    }
    togglePostLike(post)
  }

  const postRepostClickHandler: MouseEventHandler = (e) => {
    e.preventDefault()
    if (!currentAuthUser) {
      setLoginWarningType(repost)
      setModalType(loginWarning)
      setModalIsOpen(true)
      return
    }
    toggleRepost(post)
  }

  //Post interaction bar if user is logged in
  if (currentUserDoc) {
    return (
      <div className='flex w-full text-center mb-3'>
        <div className='w-1/3'>
          <div
            onClick={postCommentClickHandler}
            className='hover:bg-slate-900 hover:text-cyan-400 w-14 mx-auto p-1 rounded-full'
          >
            <MdChat className='text-xl inline mr-2' />
            <span className=''>{post.replies.length}</span>
          </div>
        </div>
        <div className='w-1/3'>
          <div
            onClick={postLikeClickHandler}
            className='hover:bg-slate-900 hover:text-red-400 w-14 mx-auto p-1 rounded-full'
          >
            {
              //Checks if user likes the post
              currentUserDoc.likedPosts.find((likedPost) => likedPost == post.postId) ? (
                <div className='inline text-red-400'>
                  <MdFavorite className='text-xl mx-auto inline' />
                  <span className='ml-2'>{post.likes.length}</span>
                </div>
              ) : (
                <div className='inline'>
                  <MdFavoriteBorder className='text-xl mx-auto inline' />
                  <span className='ml-2'>{post.likes.length}</span>
                </div>
              )
            }
          </div>
        </div>
        <div className='w-1/3'>
          <div
            className='hover:bg-slate-900 hover:text-green-400 w-14 mx-auto p-1 rounded-full'
            onClick={postRepostClickHandler}
          >
            <MdRepeat className='text-xl mx-auto inline' />
            <span className='ml-2'>{post.reposts.length || 0}</span>
          </div>
        </div>
      </div>
    )
  }

  //Post interaction bar if not logged in
  return (
    <div className='flex w-full text-center mb-3'>
      <div className='w-1/3'>
        <div
          onClick={postCommentClickHandler}
          className='hover:bg-slate-900 hover:text-cyan-400 w-14 mx-auto p-1 rounded-full'
        >
          <MdChat className='text-xl inline mr-2' />
          <span className=''>{post.replies.length}</span>
        </div>
      </div>
      <div className='w-1/3'>
        <div
          onClick={postLikeClickHandler}
          className='hover:bg-slate-900 hover:text-red-400 w-14 mx-auto p-1 rounded-full'
        >
          <MdFavoriteBorder className='text-xl mx-auto inline' />
          <span className='ml-2'>{post.likes.length}</span>
        </div>
      </div>
      <div className='w-1/3'>
        <div
          className='hover:bg-slate-900 hover:text-green-400 w-14 mx-auto p-1 rounded-full'
          onClick={postRepostClickHandler}
        >
          <MdRepeat className='text-xl mx-auto inline' />
          <span className='ml-2'>{post.reposts.length || 0}</span>
        </div>
      </div>
    </div>
  )
}

export default PostInteractionBar
