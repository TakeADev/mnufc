import { useContext, useState, useEffect } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { FeedContext } from '../../contexts/FeedContext'
import { UserPostsContext } from '../../contexts/UserPosts'

import PostContainer from './PostContainer'
import PostInfoContainer from './PostInfoContainer'
import PostInfo from './PostInfo'
import ProfilePicBubble from '../Profile/ProfilePicBubble'
import PostContent from './PostContent'
import PostInteractionBar from './PostInteractionBar'

function Post({ post, postPage }) {
  const [originalPost, setOriginalPost] = useState(null)
  const { isLoading } = useContext(FeedContext)
  const { userPosts } = useContext(UserPostsContext)

  const navigate = useNavigate()

  const paramId = useParams().postId

  useEffect(() => {
    setOriginalPost(null)
    if (post.replyTo) {
      setOriginalPost(
        userPosts.find((e) => {
          return e.postId == post.replyTo
        })
      )
    } else return
  }, [paramId, post, userPosts])

  const navigateToProfileOnClick = (e) => {
    e.preventDefault()
    navigate(`/${post.username}`)
  }

  const navigateToPostOnClick = (e) => {
    e.preventDefault()
    navigate(`/${originalPost.username}/status/${originalPost.postId}`)
  }

  if (post.replyTo && !postPage && originalPost) {
    return (
      <Link to={`/${post.username}/status/${post.postId}`}>
        <div className='border-b border-slate-700'>
          <PostContainer isLoading={isLoading}>
            <PostInfoContainer>
              <ProfilePicBubble
                onClick={navigateToProfileOnClick}
                profilePic={post.profilePic}
                addedClasses='mx-5 h-8 w-8 mt-5'
              />
              <PostInfo post={post} />
            </PostInfoContainer>
            <PostContent content={post.content} />
          </PostContainer>
          <div
            onClick={navigateToPostOnClick}
            className='ml-10 mr-5 my-5 border border-slate-700 rounded-lg'
          >
            <PostContainer isLoading={isLoading}>
              <PostInfoContainer>
                <ProfilePicBubble
                  onClick={navigateToProfileOnClick}
                  profilePic={originalPost.profilePic}
                  addedClasses='mx-5 h-8 w-8 mt-5'
                />
                <PostInfo post={originalPost} />
              </PostInfoContainer>
              <PostContent content={originalPost.content} />
            </PostContainer>
          </div>
          <PostInteractionBar post={post} />
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/${post.username}/status/${post.postId}`}>
      <PostContainer isLoading={isLoading} addedClasses='border-b border-slate-700'>
        <PostInfoContainer>
          <ProfilePicBubble
            onClick={navigateToProfileOnClick}
            profilePic={post.profilePic}
            addedClasses='mx-5 h-8 w-8 mt-5'
          />
          <PostInfo post={post} />
        </PostInfoContainer>
        <PostContent content={post.content} />
        <PostInteractionBar post={post} />
      </PostContainer>
    </Link>
  )
}

export default Post
