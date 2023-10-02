import { useContext } from 'react'

import { MdChat, MdFavoriteBorder, MdFavorite, MdRepeat } from 'react-icons/md'

import { togglePostLike } from '../../utils/firebase/firebase-config'

import { UserContext } from '../../contexts/User'

const PostInteractionBar = ({ post }) => {
  const { currentUserDoc } = useContext(UserContext)

  const postLikeClickHandler = (e) => {
    e.preventDefault()
    togglePostLike(post)
  }

  if (currentUserDoc) {
    return (
      <div className='flex w-full text-center mb-3'>
        <div className='w-1/3'>
          <MdChat className='text-xl mx-auto inline' />
          <span className='ml-2'>{post.replies.length}</span>
        </div>
        <div className='w-1/3'>
          {currentUserDoc.likedPosts.find((likedPost) => likedPost == post.postId) ? (
            <MdFavorite onClick={postLikeClickHandler} className='text-xl mx-auto inline' />
          ) : (
            <MdFavoriteBorder onClick={postLikeClickHandler} className='text-xl mx-auto inline' />
          )}
          <span className='ml-2'>{post.likes}</span>
        </div>
        <div className='w-1/3'>
          <MdRepeat className='text-xl mx-auto inline' />
          <span className='ml-2'>0</span>
        </div>
      </div>
    )
  }
}

export default PostInteractionBar
