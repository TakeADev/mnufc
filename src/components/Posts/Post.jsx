import { useContext, useState, useEffect } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { FeedContext } from '../../contexts/FeedContext'

import PostContainer from './PostContainer'
import PostInfoContainer from './PostInfoContainer'
import PostInfo from './PostInfo'
import ProfilePicBubble from '../Profile/ProfilePicBubble'
import PostContent from './PostContent'
import PostInteractionBar from './PostInteractionBar'
import { getPostByPostId } from '../../utils/firebase/firebase-config'

function Post({ post, replyTo }) {
  const [replyPost, setReplyPost] = useState(null)
  const { isLoading } = useContext(FeedContext)

  const navigate = useNavigate()

  const paramId = useParams().postId
  const navigateToProfileOnClick = (e) => {
    e.preventDefault()
    navigate(`/${post.username}`)
  }

  useEffect(() => {
    if (replyTo) {
      getPostByPostId(replyTo).then((res) => setReplyPost(res))
      console.log(replyTo)
    }
  }, [])

  if (replyPost) {
    return (
      <div className='border-b border-slate-700'>
        <Link to={`/${post.username}/status/${post.postId}`}>
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
        </Link>
        <div className='ml-10 mr-5 my-5 border border-slate-700 rounded-lg'>
          <Link to={`/${replyPost.username}/status/${replyPost.postId}`}>
            <PostContainer isLoading={isLoading}>
              <PostInfoContainer>
                <ProfilePicBubble
                  onClick={navigateToProfileOnClick}
                  profilePic={replyPost.profilePic}
                  addedClasses='mx-5 h-8 w-8 mt-5'
                />
                <PostInfo post={replyPost} />
              </PostInfoContainer>
              <PostContent content={replyPost.content} />
            </PostContainer>
          </Link>
        </div>
        <PostInteractionBar />
      </div>
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
        <PostInteractionBar />
      </PostContainer>
    </Link>
  )
}

export default Post
